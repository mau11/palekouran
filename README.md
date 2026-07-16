# palekouran

![Static Badge](https://img.shields.io/badge/WORK%20IN%20PROGRESS-darkgreen)
![License](https://img.shields.io/badge/License-PolyForm%20Noncommercial-green)
![TypeScript](https://img.shields.io/badge/TypeScript-6.0-blue)
![React](https://img.shields.io/badge/React-19-61dafb)

> **Palekouran** is a modern language learning tool that combines traditional flashcards with interactive audio features. Record your pronunciation, get AI-powered translations, and track your progress, all in one place.

<img src="./frontend/public/images/screenshot.png" alt="Screenshot of Palekouran" height="300">

## Table of Contents

1. [Features](#features)
1. [Demo & Deployment](#demo--deployment)
1. [Tech Stack](#tech-stack)
1. [Requirements](#requirements)
1. [Getting Started](#getting-started)
   1. [Setting up the Database](#setting-up-the-database)
   1. [Environment Variables](#environment-variables)
   1. [Installing Dependencies](#installing-dependencies)
   1. [Running the Application](#running-the-application)
1. [License](#license)
1. [Additional Resources](#additional-resources)
   1. [Documentation](#documentation)
   1. [Privacy Note](#privacy-note)

## Features

- **Audio Recording** - Record and save pronunciations for each flashcard
- **AI Pronunciation** - Generate reference audio with ElevenLabs TTS and listen side-by-side with your recording
- **AI Translations** - Fetch translations while creating cards (client-side via Google Translate)
- **Multi-Language Support** - Practice vocabulary across multiple language pairs
- **Custom Decks** - Organize vocabulary by topic or category
- **Spaced Repetition** - Rate each reviewed card (Easy, Okay, or Hard) to automatically adjust when you'll see it next
- **Interactive Study Mode** - Flip cards to test your knowledge
- **Progress Tracking** - Review history and study stats on your account page

## Demo & Deployment

**Live demo:** [palekouran.mauworks.com](https://palekouran.mauworks.com)

**Hosted on:** [Railway](https://railway.com/)

**Test account** (demo only):

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
- **Umami** - Lightweight, open-source analytics (privacy-focused)

<div>
  <a href="https://reactjs.org/" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/react-colored.svg" alt="React" title="React" width="36" height="36"/></a>
  <a href="https://reactrouter.com/" target="_blank" rel="noreferrer"><img src="https://reactrouter.com/_brand/react-router-brand-assets/logo/Light.svg" alt="React Router" title="React Router" width="36" height="36"/></a>
  <a href="https://vitejs.dev/" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/vite-colored.svg" alt="Vite" title="Vite" width="36" height="36"/></a>
  <a href="https://www.typescriptlang.org/" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/typescript-colored.svg" alt="TypeScript" title="TypeScript" width="36" height="36"/></a>
  <a href="https://styled-components.com/" target="_blank" rel="noreferrer"><img src="https://avatars.githubusercontent.com/u/20658825?s=200&v=4" alt="styled-components" title="styled-components" width="36" height="36"/></a>
  <a href="https://fontawesome.com/" target="_blank" rel="noreferrer"><img src="https://avatars.githubusercontent.com/u/1505683?s=200&v=4" alt="Font Awesome" title="Font Awesome" width="36" height="36"/></a>
  <a href="https://umami.is/" target="_blank" rel="noreferrer"><img src="https://avatars.githubusercontent.com/u/105618662?s=200&v=4" alt="Umami" title="Umami" width="36" height="36"/></a>
</div>

### Backend / Infrastructure:

- **Node.js** - Runtime environment
- **Hono** - Lightweight, TypeScript-first web framework
- **Supabase** - Postgres database, authentication, and storage
- **Drizzle ORM** - Type-safe database queries
- **Railway** - Hosting platform
- **ElevenLabs** - AI Text to Speech

<div>
  <a href="https://nodejs.org/en/" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/nodejs-colored.svg" alt="NodeJS" title="NodeJS" width="36" height="36"/></a>
  <a href="https://hono.dev/" target="_blank" rel="noreferrer"><img src="https://avatars.githubusercontent.com/u/98495527?s=200&v=4" alt="Hono" title="Hono" width="36" height="36"/></a>
  <a href="https://supabase.io/" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/supabase-colored.svg" alt="Supabase" title="Supabase" width="36" height="36"/></a>
  <a href="https://orm.drizzle.team/" target="_blank" rel="noreferrer"><img src="https://avatars.githubusercontent.com/u/108468352?s=48&v=4" alt="Drizzle ORM" title="Drizzle ORM" width="36" height="36"/></a>
  <a href="https://railway.com/" target="_blank" rel="noreferrer"><img src="https://avatars.githubusercontent.com/u/66716858?s=200&v=4" alt="Railway" title="Railway" width="36" height="36"/></a>
  <a href="https://elevenlabs.io/" target="_blank" rel="noreferrer"><img src="https://avatars.githubusercontent.com/u/94471909?s=48&v=4" alt="ElevenLabs" title="ElevenLabs" width="36" height="36"/></a>
</div>

## Requirements

- Node v24.18.0 (see [`.nvmrc`](.nvmrc))
- pnpm v10.28.2

## Getting Started

### Setting up the Database

1. Create an account on [Supabase](https://supabase.com/)
2. Navigate to your dashboard and create a new project called `palekouran`
3. For more details, see the [Supabase quickstart guide](https://supabase.com/docs/guides/getting-started/quickstarts/reactjs)

**Database Migrations:**

From the `backend/` directory, generate and apply migrations using Drizzle:

```sh
cd backend

# Generate a migration
pnpm db:generate --name=add_some_column_to_some_table

# Apply migrations
pnpm db:migrate
```

**Supabase Storage:**

Create two **private** storage buckets in your Supabase project. The app serves files via signed URLs.

| Bucket           | Purpose                            |
| ---------------- | ---------------------------------- |
| `pronunciations` | User-recorded audio (WebM)         |
| `tts`            | AI-generated reference audio (MP3) |

See the [Storage Quickstart](https://supabase.com/docs/guides/storage/quickstart) for setup details.

### Environment Variables

Copy the example environment files in both `frontend/` and `backend/`:

```sh
cp frontend/.env.example frontend/.env
cp backend/.env.example backend/.env
```

Then add your values to each `.env` file.

**Frontend Variables:**

| Variable     | Description                                      |
| ------------ | ------------------------------------------------ |
| VITE_API_URL | Backend API URL (default: http://localhost:3000) |

**Backend Variables:**

| Variable                 | Description                                                                                            |
| ------------------------ | ------------------------------------------------------------------------------------------------------ |
| PORT                     | Port number (default: 3000)                                                                            |
| DATABASE_URL             | PostgreSQL connection string (format: postgresql://postgres:[password]@db.[project].supabase.co:5432/) |
| SUPABASE_URL             | Your Supabase project URL                                                                              |
| SUPABASE_PUBLISHABLE_KEY | Supabase public API key ([find here](https://supabase.com/dashboard/project/*/settings/api-keys))      |
| SUPABASE_SECRET_KEY      | Supabase secret API key ([find here](https://supabase.com/dashboard/project/*/settings/api-keys))      |
| FRONTEND_URL             | Frontend URL (default: http://localhost:5173)                                                          |
| ELEVENLABS_API_KEY       | ElevenLabs API key ([find here](https://elevenlabs.io/app/developers/api-keys))                        |
| ELEVEN_LABS_VOICE_ID     | Optional ElevenLabs voice ID (defaults to a built-in voice if unset)                                   |

### Installing Dependencies

This repo has separate frontend and backend packages (no root workspace). Install both:

```sh
nvm use

cd frontend && pnpm install
cd ../backend && pnpm install
```

### Running the Application

Start both the frontend and backend development servers (each in its own terminal):

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

## License

This project is licensed under the PolyForm Noncommercial License - see the [LICENSE](LICENSE.md) file for details.

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

**Analytics:**

- [Umami Documentation](https://umami.is/docs)

### Privacy Note

This project uses Umami, an open-source, privacy-conscious analytics tool. Umami does not use cookies or collect personally identifiable information. You can see how data is tracked by reviewing the source code.

By default, Supabase enables telemetry data sharing. From Supabase:

> By opting in to sharing telemetry data, Supabase can analyze usage patterns to enhance user experience and use it for marketing and advertising purposes.

You can disable this in your [account settings](https://supabase.com/dashboard/account/me) under **Analytics and Marketing**.

---

Created by [@mau11](https://github.com/mau11)
