# palekouran

![Static Badge](https://img.shields.io/badge/WORK%20IN%20PROGRESS-darkgreen)

> Palekouran is a language learning assistant that helps users practice vocabulary through interactive flashcards that talk back. Users can record their own pronunciations, get AI-powered translations and definitions, and track their learning progress over time. Built with React, Node, and PostgreSQL, Palekouran bridges traditional flashcards with modern language immersion tools.

## Table of Contents

1. [Tech Stack](#tech-stack)
1. [Requirements](#requirements)
1. [Development](#development)
   1. [Installing Dependencies](#installing-dependencies)
   1. [Running the Server](#running-the-server)
1. [View Application](#view-application)
1. [Deployment](#Deployment)
1. [Additional Resources + Notes](#additional-resources--notes)
   1. [Documentation](#documentation)
   1. [Data](#data)

## Tech Stack

#### Frontend:

- **React**
- **Vite**
- **TypeScript**
- **styled-components**

#### Backend / Infrastructure:

- **Node.js**
- **Hono (Express alternative, typescript-first framework)**
- **Supabase PostgreSQL (with built in auth)**
- **Drizzle ORM**
- **Render**

## Requirements

- Node v24.11.0
- pnpm v11.6.0

## Development

#### Notes

- used $ pnpm create vite@latest to build frontend
- frontend local dev on http://localhost:5173
- deploying frontend + backend separately on render

#### Setting up Database

Create a [Supabase](https://supabase.com/). After logging in, navigate to you dashboard to create a new project called: `palekouran`. You can find more details in the offical Supabase docs: https://supabase.com/docs/guides/getting-started/quickstarts/reactjs.

If you need to apply changes to the database, you can generate migrations using drizzle's generate command then apply the changes with the migrate command:

```sh
$ npx drizzle-kit generate --name=add_some_column_to_some_table
$ npx drizzle-kit migrate
```

#### Environment Variables

Run the command below in both the base of your frontend + backend directories, to copy environment variables from the example, then add your values and save.

```sh
$ cp .env.example .env
```

<br>

**Frontend:**
| Environment Variable | Notes |
| -------------------- | ---------------------------------------------------- |
| VITE_API_URL | URL for backend/api (default: http://localhost:3000) |
<br>

**Backend:**
| Environment Variable | Notes |
| ------------------------ | -------------------------------------------------------------------------------------------------- |
| PORT | port number (default: 3000) |
| DATABASE_URL | PostgreSQL database URL (format: postgresql://postgres:[password]@db.[project].supabase.co:5432/) |
| SUPABASE_URL | Supabase project URL, found in Supabase dashboard |
| SUPABASE_PUBLISHABLE_KEY | Supabase public api key found here: https://supabase.com/dashboard/project/*/settings/api-keys/ |
| SUPABASE_SECRET_KEY | Supabase secret api key found here: https://supabase.com/dashboard/project/*/settings/api-keys/ |
| FRONTEND_URL | URL for frontend (default:http://localhost:5173 ) |

#### Installing Dependencies

```sh
$ nvm use
$ pnpm install
```

#### Running the Server

Once dependencies have been installed, run the following command twice: the root of the frontend directory to start the frontend/vite server and the root of the backend directory to start the hono server:

```sh
$ pnpm dev
```

## View Application

You can view the app in your browser at http://localhost:3000.

## Deployment

View the latest deploy on Render at: https://palekouran.onrender.com. To try Palekouran out, sign up for a new account or use the credentials below.

_Please note that both the frontend and backend are running on Render’s free tier. The backend may sleep when inactive, so it can take a couple of minutes to wake up. The frontend loads instantly, but the app functionality may take a moment to fully initialize. This temporary slowdown will improve as development continues._

**email**: test@example.com

**password**: password

## Additional Resources + Notes

#### Documentation

- Setup Drizzle + Supabase db + auth

  - https://orm.drizzle.team/docs/tutorials/drizzle-with-supabase
  - https://supabase.com/docs/guides/database/drizzle

- React
  - Contexts: https://react.dev/reference/react/createContext
- React-Router: https://github.com/remix-run/react-router

#### Data

By default, Supabase enables sharing telemetry data. From the Supabase site:

> By opting in to sharing telemetry data, Supabase can analyze usage patterns to enhance user experience and use it for marketing and advertising purposes.

You can disable this in your account settings, under **Analytics and Marketing** here: https://supabase.com/dashboard/account/me
