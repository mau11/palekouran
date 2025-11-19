// https://orm.drizzle.team/docs/tutorials/drizzle-with-supabase#query-examples

import { db } from "@db/client";
import { decksTable } from "@db/schema";
import { eq } from "drizzle-orm";

// TODO - refactor routes/auth.ts to use drizzle to get user data from db

export async function getDecks(userId: string) {
  return await db
    .select()
    .from(decksTable)
    .where(eq(decksTable.userId, userId));
}
