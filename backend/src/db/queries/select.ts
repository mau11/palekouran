// https://orm.drizzle.team/docs/tutorials/drizzle-with-supabase#query-examples

import { db } from "@db/client";
import { cardsTable, decksTable, ttsAudioTable } from "@db/schema";
import { eq, and } from "drizzle-orm";

// TODO - refactor routes/auth.ts to use drizzle to get user data from db

// get decks
export async function getDecks(userId: string) {
  return await db
    .select()
    .from(decksTable)
    .where(eq(decksTable.userId, userId));
}

// get one deck
export async function getDeck(userId: string, deckId: string) {
  return await db
    .select()
    .from(decksTable)
    .where(
      and(eq(decksTable.id, Number(deckId)), eq(decksTable.userId, userId))
    );
}

// get a deck of cards
export async function getDeckOfCards(userId: string, deckId: string) {
  return await db
    .select()
    .from(cardsTable)
    .where(
      and(eq(cardsTable.deckId, Number(deckId)), eq(cardsTable.userId, userId))
    );
}

// get one card
export async function getCard(userId: string, deckId: string, cardId: string) {
  return await db
    .select()
    .from(cardsTable)
    .where(
      and(
        eq(cardsTable.id, Number(cardId)),
        eq(cardsTable.deckId, Number(deckId)),
        eq(cardsTable.userId, userId)
      )
    );
}

// get tts audio
export async function getTts(text: string, language: string) {
  return await db
    .select()
    .from(ttsAudioTable)
    .where(
      and(eq(ttsAudioTable.text, text), eq(ttsAudioTable.language, language))
    )
    .limit(1);
}
