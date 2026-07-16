// referenced: https://github.com/CarlosZiegler/hono-supabase
// https://supabase.com/docs/reference/javascript/auth-api
import { Hono } from "hono";
import { eq } from "drizzle-orm";
import { db } from "@db/client";
import { cardReviewsTable, cardsTable, SelectCardReview } from "@db/schema";
import { omitUserId } from "../index";
import { requireAuth } from "../middleware/requireAuth";
import { getReviews } from "@db/queries/select";

const reviews = new Hono();

// get reviews
reviews.get("/", requireAuth, async (c) => {
  const userId = c.get("userId");
  try {
    const reviews: SelectCardReview[] = await getReviews(userId);

    if (!reviews) {
      return c.json({ error: "Reviews not found" }, 404);
    }

    return c.json(
      {
        message: "Deck retrieved successfully",
        data: reviews,
      },
      200,
    );
  } catch (err) {
    console.error("Error retrieving reviews", err);
    return c.json({ error: "Server error" }, 500);
  }
});

// add review
reviews.post("/", requireAuth, async (c) => {
  try {
    const userId = c.get("userId");
    const { rating, cardId } = await c.req.json();

    // intervals in days
    const intervals: Record<string, number> = {
      easy: 3,
      okay: 2,
      hard: 1,
    };

    if (!rating || !(rating in intervals)) {
      return c.json({ error: "Invalid rating" }, 400);
    }

    const nextReviewAt = new Date();
    nextReviewAt.setDate(nextReviewAt.getDate() + intervals[rating]);

    let review: SelectCardReview;

    // https://orm.drizzle.team/docs/transactions
    await db.transaction(async (tx) => {
      [review] = await tx
        .insert(cardReviewsTable)
        .values({
          userId,
          cardId,
          rating,
        })
        .returning();

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
      201,
    );
  } catch (err) {
    console.error("Review creation error:", err);
    return c.json({ error: "Server error" }, 500);
  }
});

export default reviews;
