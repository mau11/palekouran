// referenced: https://github.com/CarlosZiegler/hono-supabase
// https://supabase.com/docs/reference/javascript/auth-api
import { Hono } from "hono";
import { and, eq, sql } from "drizzle-orm";
import { db } from "@db/client";
import { createDeck } from "@db/queries/insert";
import { getCard, getDeck, getDeckOfCards, getDecks } from "@db/queries/select";
import { cardsTable, decksTable, SelectCard, SelectDeck } from "@db/schema";
import { omitUserId } from "../index";
import { requireAuth } from "../middleware/requireAuth";
import { deleteDeck, ownedCardFilter } from "@db/queries/delete";
import { editCard, editDeck } from "@db/queries/update";
import { supabaseAdmin } from "@lib/supabase";
import { AUDIO_BUCKET } from "./uploads";

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
      200
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

    const cards: (SelectCard & { signedUrl?: string })[] = await getDeckOfCards(
      userId,
      deckId
    );

    const updatedCards = await Promise.all(
      cards.map(async (card) => {
        if (card.audioUrl) {
          const { data } = await supabaseAdmin.storage
            .from(AUDIO_BUCKET)
            .createSignedUrl(card.audioUrl, 60 * 60 * 24 * 7); // expires in 7 days, but fetches new url each api call
          return { ...card, signedUrl: data.signedUrl };
        }
        return card;
      })
    );

    const data = {
      info: omitUserId(info),
      cards: updatedCards,
    };

    return c.json(
      {
        message: "Deck retrieved successfully",
        data,
      },
      200
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

    let signedUrl = "";
    if (card.audioUrl) {
      const { data } = await supabaseAdmin.storage
        .from(AUDIO_BUCKET)
        .createSignedUrl(card.audioUrl, 60 * 60 * 24 * 7); // expires in 7 days, but fetches new url each api call
      signedUrl = data.signedUrl;
    }

    return c.json(
      {
        message: "Card retrieved successfully",
        data: { card, signedUrl },
      },
      200
    );
  } catch (err) {
    console.error("Error retrieving card", err);
    return c.json({ error: "Server error" }, 500);
  }
});

// create deck
deck.post("/", requireAuth, async (c) => {
  try {
    const userId = c.get("userId");
    const { title, notes, sourceLanguage, targetLanguage, isPublic } =
      await c.req.json();

    if (!title || !sourceLanguage || !targetLanguage) {
      return c.json({ error: "Title and languages are required" }, 400);
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
    const userId = c.get("userId");
    const deckId = c.req.param("id");
    const {
      word,
      translation,
      definition,
      notes,
      audioUrl,
      category,
      ttsAudioId,
    } = await c.req.json();

    if (!word || !translation) {
      return c.json(
        { error: "Original word and translation are required" },
        400
      );
    }

    const [ownedDeck] = await getDeck(userId, deckId);
    if (!ownedDeck) {
      return c.json({ error: "Deck not found" }, 404);
    }

    let card: SelectCard;

    // https://orm.drizzle.team/docs/transactions
    await db.transaction(async (tx) => {
      [card] = await tx.insert(cardsTable).values({
        userId,
        deckId: Number(deckId),
        word,
        translation,
        definition,
        notes,
        audioUrl,
        category,
        ttsAudioId,
      }).returning();
      await tx
        .update(decksTable)
        .set({ totalCards: sql`${decksTable.totalCards} + 1` })
        .where(
          and(eq(decksTable.id, Number(deckId)), eq(decksTable.userId, userId))
        );
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
deck.patch("/:id", requireAuth, async (c) => {
  const userId = c.get("userId");
  const deckId = c.req.param("id");

  try {
    const { title, notes, sourceLanguage, targetLanguage, isPublic } =
      await c.req.json();

    const updated = await editDeck(userId, Number(deckId), {
      title,
      notes,
      sourceLanguage,
      targetLanguage,
      isPublic,
    });

    if (updated.length === 0) {
      return c.json({ error: "Deck not found" }, 404);
    }

    const [deck] = updated;

    return c.json(
      {
        message: "Deck updated successfully",
        // remove userId before sending back
        deck: omitUserId(deck),
      },
      201
    );
  } catch (err) {
    console.error("Deck update error:", err);
    return c.json({ error: "Server error" }, 500);
  }
});

// edit card
deck.patch("/:deckId/:cardId", requireAuth, async (c) => {
  const userId = c.get("userId");
  const deckId = c.req.param("deckId");
  const cardId = c.req.param("cardId");

  try {
    const { word, translation, definition, notes, audioUrl, category } =
      await c.req.json();

    const updated = await editCard(userId, {
      id: Number(cardId),
      deckId: Number(deckId),
      word,
      translation,
      definition,
      notes,
      audioUrl,
      category,
    });

    if (updated.length === 0) {
      return c.json({ error: "Card not found" }, 404);
    }

    const [card] = updated;

    return c.json(
      {
        message: "Card updated successfully",
        // remove userId before sending back
        card: omitUserId(card),
      },
      201
    );
  } catch (err) {
    console.error("Card update error:", err);
    return c.json({ error: "Server error" }, 500);
  }
});

// delete deck
deck.delete("/:id", requireAuth, async (c) => {
  try {
    const userId = c.get("userId");
    const deckId = c.req.param("id");

    if (!deckId) {
      return c.json({ error: "Deck id required" }, 400);
    }

    const [deck] = await getDeck(userId, deckId);
    if (!deck) {
      return c.json({ error: "Deck not found" }, 404);
    }

    const cards = await getDeckOfCards(userId, deckId);

    // delete audio from supabase storage, if exists
    const audioPaths = cards.map((card) => card.audioUrl).filter(Boolean);
    if (audioPaths.length > 0) {
      const { error: storageError } = await supabaseAdmin.storage
        .from(AUDIO_BUCKET)
        .remove(audioPaths);

      if (storageError) {
        console.error("Error deleting deck audio from storage:", storageError);
      }
    }

    const deleted = await deleteDeck(userId, Number(deckId));
    if (deleted.length === 0) {
      return c.json({ error: "Deck not found" }, 404);
    }

    return c.json(
      {
        message: "Deck deleted successfully",
      },
      200
    );
  } catch (err) {
    console.error("Deck deletion error:", err);
    return c.json({ error: "Server error" }, 500);
  }
});

// delete card
deck.delete("/:deckId/:cardId", requireAuth, async (c) => {
  try {
    const userId = c.get("userId");
    const deckId = c.req.param("deckId");
    const cardId = c.req.param("cardId");

    if (!deckId || !cardId) {
      return c.json({ error: "Deck and card id required" }, 400);
    }

    const [card] = await getCard(userId, deckId, cardId);
    if (!card) {
      return c.json({ error: "Card not found" }, 404);
    }

    // delete audio from supabase storage, if exists
    if (card.audioUrl) {
      const { error: storageError } = await supabaseAdmin.storage
        .from(AUDIO_BUCKET)
        .remove([card.audioUrl]);

      if (storageError) {
        console.error("Error deleting card audio from storage:", storageError);
      }
    }

    // https://orm.drizzle.team/docs/transactions
    const deleted = await db.transaction(async (tx) => {
      const rows = await tx
        .delete(cardsTable)
        .where(
          ownedCardFilter(userId, Number(deckId), Number(cardId))
        )
        .returning();
      await tx
        .update(decksTable)
        .set({ totalCards: sql`${decksTable.totalCards} - 1` })
        .where(
          and(eq(decksTable.id, Number(deckId)), eq(decksTable.userId, userId))
        );
      return rows;
    });

    if (deleted.length === 0) {
      return c.json({ error: "Card not found" }, 404);
    }

    return c.json(
      {
        message: "Card deleted successfully",
      },
      200
    );
  } catch (err) {
    console.error("Card deletion error:", err);
    return c.json({ error: "Server error" }, 500);
  }
});

export default deck;
