// https://hono.dev/docs/getting-started/nodejs

import "dotenv/config";
import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
// import { logger } from "hono/logger";
import auth from "@routes/auth";
import deck from "@routes/decks";
import uploads from "@routes/uploads";
import reviews from "@routes/reviews";

const port = Number(process.env.PORT) || 3000;
const app = new Hono();

export const omitUserId = (deck) => {
  const { userId, ...rest } = deck;
  return rest;
};

// middleware
// app.use(logger());

app.use(
  "/*",
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  })
);

// TODO add validation (zod?) + auth checks to each endpoint

// routes
app.route("/api/auth", auth);
app.route("/api/decks", deck);
app.route("/api/uploads", uploads);
app.route("/api/reviews", reviews);

// start server
console.log(`Backend server running on port: ${port}`);
serve({ fetch: app.fetch, port });
