// referenced: https://github.com/CarlosZiegler/hono-supabase
// https://supabase.com/docs/reference/javascript/auth-api
import { Hono } from "hono";
import { eq } from "drizzle-orm";
import { db } from "@db/client";
import { createReview } from "@db/queries/insert";
import { cardsTable, SelectCardReview } from "@db/schema";
import { omitUserId } from "../index";
import { requireAuth } from "../middleware/requireAuth";

const reviews = new Hono();

// add review
reviews.post("/", requireAuth, async (c) => {
  try {
    const userId = c.get("userId");
    const { rating, cardId } = await c.req.json();

    if (!rating) {
      return c.json({ error: "Rating is required" }, 400);
    }

    // intervals in days
    const intervals: Record<string, number> = {
      easy: 3,
      okay: 2,
      hard: 1,
    };

    const nextReviewAt = new Date();
    nextReviewAt.setDate(nextReviewAt.getDate() + intervals[rating]);

    let review: SelectCardReview;
    // https://orm.drizzle.team/docs/transactions
    await db.transaction(async (tx) => {
      [review] = await createReview({
        userId,
        cardId,
        rating,
      });
      await tx
        .update(cardsTable)
        .set({ nextReviewAt })
        .where(eq(cardsTable.id, Number(cardId)));
    });

    return c.json(
      {
        message: "Review created successfully",
        // remove userId before sending back
        review: omitUserId(review),
      },
      201
    );
  } catch (err) {
    console.error("Review creation error:", err);
    return c.json({ error: "Server error" }, 500);
  }
});

export default reviews;
