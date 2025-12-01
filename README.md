# palekouran

![Static Badge](https://img.shields.io/badge/WORK%20IN%20PROGRESS-darkgreen)
![License](https://img.shields.io/badge/license-PolyForm%20Noncommercial-blue)

> **Palekouran** is a modern language learning tool that combines traditional flashcards with interactive audio features. Record your pronunciation, get AI-powered translations, and track your progress, all in one place.

<img src="./frontend/public/images/screenshot.png" alt="Screenshot of Palekouran" height="300">

## Table of Contents

1. [Features](#features)
1. [Demo](#demo)
1. [Tech Stack](#tech-stack)
1. [Requirements](#requirements)
1. [Getting Started](#getting-started)
   1. [Setting up the Database](#setting-up-the-database)
   1. [Environment Variables](#environment-variables)
   1. [Installing Dependencies](#installing-dependencies)
   1. [Running the Application](#running-the-application)
1. [Deployment](#deployment)
1. [License](#license)
1. [Additional Resources](#additional-resources)
   1. [Documentation](#documentation)
   1. [Privacy Note](#privacy-note)

## Features

- **Audio Recording** - Record and save pronunciations for each flashcard
- **Multi-Language Support** - Practice vocabulary across multiple language pairs
- **Custom Decks** - Organize vocabulary by topic or category
- **Interactive Study Mode** - Flip cards to test your knowledge
- **Progress Tracking** - Monitor your learning journey over time

## Demo

**Live Demo**: [palekouran.mauworks.com](https://palekouran.mauworks.com)

**Test Account:**

- Email: `test@example.com`
- Password: `password`

## Tech Stack

### Frontend:

- **React** - UI library
- **React Router** - Client-side routing
- **Vite** - Build tool and dev server
- **TypeScript** - Type safety
- **Styled Components** - CSS-in-JS styling
- **Font Awesome** - all icons

<div>
  <a href="https://reactjs.org/" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/react-colored.svg" alt="React" title="React" width="36" height="36"/></a>
  <a href="https://reactrouter.com/" target="_blank" rel="noreferrer"><img src="https://reactrouter.com/_brand/React%20Router%20Brand%20Assets/React%20Router%20Logo/Light.svg" alt="React Router" title="React Router" width="36" height="36"/></a>
  <a href="https://vitejs.dev/" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/vite-colored.svg" alt="Vite" title="Vite" width="36" height="36"/></a>
  <a href="https://www.typescriptlang.org/" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/typescript-colored.svg" alt="TypeScript" title="TypeScript" width="36" height="36"/></a>
  <a href="https://styled-components.com/" target="_blank" rel="noreferrer"><img src="https://avatars.githubusercontent.com/u/20658825?s=200&v=4" alt="styled-components" title="styled-components" width="36" height="36"/></a>
  <a href="https://fontawesome.com/" target="_blank" rel="noreferrer"><img src="https://avatars.githubusercontent.com/u/1505683?s=200&v=4" alt="Font Awesome" title="Font Awesome" width="36" height="36"/></a>
</div>

### Backend / Infrastructure:

- **Node.js** - Runtime environment
- **Hono** - Lightweight, TypeScript-first web framework
- **Supabase** - Postgres database, authentication, and storage
- **Drizzle ORM** - Type-safe database queries
- **Railway** - Hosting platform

<div>
  <a href="https://nodejs.org/en/" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/nodejs-colored.svg" alt="NodeJS" title="NodeJS" width="36" height="36"/></a>
  <a href="https://hono.dev/" target="_blank" rel="noreferrer"><img src="https://avatars.githubusercontent.com/u/98495527?s=200&v=4" alt="Hono" title="Hono" width="36" height="36"/></a>
  <a href="https://supabase.io/" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/supabase-colored.svg" alt="Supabase" title="Supabase" width="36" height="36"/></a>
  <a href="https://orm.drizzle.team/" target="_blank" rel="noreferrer"><img src="https://avatars.githubusercontent.com/u/108468352?s=48&v=4" alt="Drizzle ORM" title="Drizzle ORM" width="36" height="36"/></a>
  <a href="https://railway.com/" target="_blank" rel="noreferrer"><img src="https://avatars.githubusercontent.com/u/66716858?s=200&v=4" alt="Railway" title="Railway" width="36" height="36"/></a>
</div>

## Requirements

- Node v24.11.0
- pnpm v11.6.0

## Getting Started

### Setting up the Database

1. Create an account on [Supabase](https://supabase.com/)
2. Navigate to your dashboard and create a new project called `palekouran`
3. For more details, see the [Supabase quickstart guide](https://supabase.com/docs/guides/getting-started/quickstarts/reactjs)

**Database Migrations:**

If you need to apply changes to the database, generate and run migrations using Drizzle:

```sh
# Generate a migration
npx drizzle-kit generate --name=add_some_column_to_some_table

# Apply migrations
npx drizzle-kit migrate
```

### Environment Variables

Copy the example environment files in both frontend and backend directories:

```sh
cp .env.example .env
```

Then add your values to each `.env` file.

**Frontend Variables:**

| Variable     | Description                                      |
| ------------ | ------------------------------------------------ |
| VITE_API_URL | Backend API URL (default: http://localhost:3000) |

**Backend Variables:**
| Variable | Description |
| ------------------------ | ------------------------------------------------------------------------------------------------------ |
| PORT | Port number (default: 3000) |
| DATABASE_URL | PostgreSQL connection string (format: postgresql://postgres:[password]@db.[project].supabase.co:5432/) |
| SUPABASE_URL | Your Supabase project URL |
| SUPABASE_PUBLISHABLE_KEY | Supabase public API key ([find here](https://supabase.com/dashboard/project/*/settings/api-keys)) |
| SUPABASE_SECRET_KEY | Supabase secret API key ([find here](https://supabase.com/dashboard/project/*/settings/api-keys)) |
| FRONTEND_URL | Frontend URL (default: http://localhost:5173) |

### Installing Dependencies

```sh
nvm use
pnpm install
```

### Running the Application

Start both the frontend and backend development servers:

**Frontend:**

```sh
cd frontend
pnpm dev
```

**Backend:**

```sh
cd backend
pnpm dev
```

The application will be available at http://localhost:5173

## Deployment

The application is deployed on [Railway](https://railway.com/).

**Live Demo**: [palekouran.mauworks.com](https://palekouran.mauworks.com)

**Test Account:**

- Email: `test@example.com`
- Password: `password`

## License

This project is licensed under the PolyForm Noncommercial License - see the [LICENSE](LICENSE) file for details.

## Additional Resources

### Documentation

**Drizzle + Supabase:**

- [Drizzle with Supabase Tutorial](https://orm.drizzle.team/docs/tutorials/drizzle-with-supabase)
- [Supabase Database Guide](https://supabase.com/docs/guides/database/drizzle)
- [Row Level Security (RLS)](https://supabase.com/docs/guides/database/postgres/row-level-security)
- [Indexes and Constraints](https://orm.drizzle.team/docs/indexes-constraints#indexes)
- [Database Transactions](https://orm.drizzle.team/docs/transactions)

**Supabase Storage:**

- [Storage Quickstart](https://supabase.com/docs/guides/storage/quickstart)

**React:**

- [Context API](https://react.dev/reference/react/createContext)
- [React Router](https://github.com/remix-run/react-router)

### Privacy Note

By default, Supabase enables telemetry data sharing. From Supabase:

> By opting in to sharing telemetry data, Supabase can analyze usage patterns to enhance user experience and use it for marketing and advertising purposes.

You can disable this in your [account settings](https://supabase.com/dashboard/account/me) under **Analytics and Marketing**.

---

Created by [@mau11](https://github.com/mau11)
