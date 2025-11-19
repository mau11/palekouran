// referenced: https://github.com/CarlosZiegler/hono-supabase
// https://supabase.com/docs/reference/javascript/auth-api
import { Hono } from "hono";
import { createDeck } from "@db/queries/insert";
import { getDecks } from "@db/queries/select";
import { SelectDeck } from "@db/schema";
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

// get deck by id
deck.get("/:id", async (c) => {});

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

// edit deck
deck.put("/:id", async (c) => {});

// delete deck
deck.delete("/:id", async (c) => {});

export default deck;
