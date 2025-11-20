// referenced: https://github.com/CarlosZiegler/hono-supabase
// https://supabase.com/docs/reference/javascript/auth-api
import { Hono } from "hono";
import { createCard, createDeck } from "@db/queries/insert";
import { getDeckOfCards, getDecks } from "@db/queries/select";
import { SelectCard, SelectDeck } from "@db/schema";
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

    const cards: SelectCard[] = await getDeckOfCards(userId, deckId);

    return c.json(
      {
        message: "Cards retrieved successfully",
        deck: cards,
      },
      201
    );
  } catch (err) {
    console.error("Error retrieving cards", err);
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

    const [card] = await createCard({
      userId,
      deckId,
      word,
      translation,
      definition,
      notes,
      audioUrl,
      category,
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
