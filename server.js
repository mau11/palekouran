import dotenv from "dotenv";
import express from "express";
import session from "express-session";
import routes from "./routes.js";
// import { PrismaClient } from "@prisma/client";

dotenv.config();
// const prisma = new PrismaClient();
const app = express();
const PORT = process.env.PORT;
const COOKIE_IN_DAYS = 1;

// set up express application
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

// create a session
app.use(
  session({
    secret: process.env.SESSION_SECRET || "topsecret",
    // https://github.com/expressjs/session?tab=readme-ov-file#resave
    resave: false,
    // https://github.com/expressjs/session?tab=readme-ov-file#saveuninitialized
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * (COOKIE_IN_DAYS * 24),
      httpOnly: true,
    },
  })
);

// routes(app, prisma);
routes(app);

// start server
app.listen(PORT, () => {
  console.log(`Listening at localhost:${PORT}`);
});
