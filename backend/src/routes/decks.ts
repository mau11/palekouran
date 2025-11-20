// referenced: https://github.com/CarlosZiegler/hono-supabase
// https://supabase.com/docs/reference/javascript/auth-api
import { Hono } from "hono";
import { eq, sql } from "drizzle-orm";
import { db } from "@db/client";
import { createCard, createDeck } from "@db/queries/insert";
import { getCard, getDeck, getDeckOfCards, getDecks } from "@db/queries/select";
import { decksTable, SelectCard, SelectDeck } from "@db/schema";
import { omitUserId } from "../index";
import { requireAuth } from "../middleware/requireAuth";

const deck = new Hono();

// get all decks
deck.get("/", requireAuth, async (c) => {
  try {
    const userId = c.get("userId");
    const decks: SelectDeck[] = await getDecks(userId);

    return c.json(
      {
        message: "Decks retrieved successfully",
        decks,
      },
      201
    );
  } catch (err) {
    console.error("Error retrieving decks", err);
    return c.json({ error: "Server error" }, 500);
  }
});

// get deck of cards by deck id
deck.get("/:id", requireAuth, async (c) => {
  try {
    const userId = c.get("userId");
    const deckId = c.req.param("id");

    const [info]: SelectDeck[] = await getDeck(userId, deckId);

    if (!info) {
      return c.json({ error: "Deck not found" }, 404);
    }

    const cards: SelectCard[] = await getDeckOfCards(userId, deckId);

    const data = {
      info,
      cards,
    };

    return c.json(
      {
        message: "Deck retrieved successfully",
        data,
      },
      201
    );
  } catch (err) {
    console.error("Error retrieving deck", err);
    return c.json({ error: "Server error" }, 500);
  }
});

// get card
deck.get("/:deckId/:cardId", requireAuth, async (c) => {
  try {
    const userId = c.get("userId");
    const deckId = c.req.param("deckId");
    const cardId = c.req.param("cardId");

    const cards: SelectCard[] = await getCard(userId, deckId, cardId);

    // select * always returns an array of values even if there is just one result
    const card = cards[0];

    if (!card) {
      return c.json({ error: "Card not found" }, 404);
    }

    return c.json(
      {
        message: "Card retrieved successfully",
        data: { card },
      },
      201
    );
  } catch (err) {
    console.error("Error retrieving card", err);
    return c.json({ error: "Server error" }, 500);
  }
});

// create deck
deck.post("/", requireAuth, async (c) => {
  try {
    const { userId, title, notes, sourceLanguage, targetLanguage, isPublic } =
      await c.req.json();

    if (!userId || !title || !sourceLanguage || !targetLanguage) {
      return c.json({ error: "User, title and languages are required" }, 400);
    }

    const [deck] = await createDeck({
      userId,
      title,
      notes,
      sourceLanguage,
      targetLanguage,
      isPublic: isPublic ?? false,
      totalCards: 0,
    });

    return c.json(
      {
        message: "Deck created successfully",
        // remove userId before sending back
        deck: omitUserId(deck),
      },
      201
    );
  } catch (err) {
    console.error("Deck creation error:", err);
    return c.json({ error: "Server error" }, 500);
  }
});

// create card
deck.post("/:id/new", requireAuth, async (c) => {
  try {
    const {
      userId,
      deckId,
      word,
      translation,
      definition,
      notes,
      audioUrl,
      category,
    } = await c.req.json();

    if (!userId || !deckId || !word || !translation) {
      return c.json(
        { error: "User, deck, original word and translation are required" },
        400
      );
    }

    let card: SelectCard;

    // https://orm.drizzle.team/docs/transactions
    await db.transaction(async (tx) => {
      [card] = await createCard({
        userId,
        deckId,
        word,
        translation,
        definition,
        notes,
        audioUrl,
        category,
      });
      await tx
        .update(decksTable)
        .set({ totalCards: sql`${decksTable.totalCards} + 1` })
        .where(eq(decksTable.id, Number(deckId)));
    });

    return c.json(
      {
        message: "Card created successfully",
        // remove userId before sending back
        card: omitUserId(card),
      },
      201
    );
  } catch (err) {
    console.error("Card creation error:", err);
    return c.json({ error: "Server error" }, 500);
  }
});

// edit deck
deck.put("/:id", async (c) => {});

// delete deck
deck.delete("/:id", async (c) => {});

export default deck;
