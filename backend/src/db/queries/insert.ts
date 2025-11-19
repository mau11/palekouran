// https://orm.drizzle.team/docs/tutorials/drizzle-with-supabase#query-examples

import { db } from "@db/client";
import { InsertUser, usersTable, InsertDeck, decksTable } from "@db/schema";

export async function createUser(data: InsertUser) {
  await db.insert(usersTable).values(data);
}

export async function createDeck(data: InsertDeck) {
  return await db.insert(decksTable).values(data).returning();
}
