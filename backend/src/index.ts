// https://hono.dev/docs/getting-started/nodejs

import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import auth from "@routes/auth";
import "dotenv/config";

const port = Number(process.env.PORT) || 3000;
const app = new Hono();

app.use(
  "/*",
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  })
);

app.route("/api/auth", auth);

console.log(`Backend server running on http://localhost:${port}`);

serve({ fetch: app.fetch, port });
