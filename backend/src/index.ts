// https://hono.dev/docs/getting-started/nodejs
import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";

const port = Number(process.env.PORT) || 3000;
const app = new Hono();

app.use(
  "/*",
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  })
);

app.get("/test", (c) => c.json({ status: "ok" }));

app.get("/", (c) => c.text("Hello Node.js!"));

console.log(`Backend server running on http://localhost:${port}`);

serve({ fetch: app.fetch, port });
