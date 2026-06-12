# Animex

Animex is a responsive anime discovery application built with Next.js. It combines public anime data from the Jikan API with account authentication, profile and session management, a protected dashboard, and a browser-based watchlist.

## Features

- Search anime and browse detailed series information
- View scores, rankings, production metadata, trailers, and recommendations
- Save up to 20 titles in a guest watchlist stored in `localStorage`
- Register, sign in, verify email, and use Google or GitHub authentication
- Access a protected account dashboard
- Manage profile details, connected providers, sessions, notifications, security, and account deletion
- Responsive desktop and mobile navigation with authenticated user states
- Cached API queries through TanStack Query

## Tech Stack

- Next.js 15 App Router
- React 18 and TypeScript
- Tailwind CSS 4
- TanStack Query
- Axios
- Radix UI primitives
- Lucide React
- Motion
- Jikan API for anime data
- Separate Animex backend for authentication and account APIs

## Requirements

- Node.js 20 or newer
- npm
- A running Animex backend API

## Environment Variables

Create a local environment file from the example:

```bash
cp .env.example .env.local
```

On PowerShell:

```powershell
Copy-Item .env.example .env.local
```

Configure these values:

| Variable | Description |
| --- | --- |
| `NEXT_PUBLIC_BASE_URL` | Base URL for the anime data API. The application expects Jikan-compatible endpoints. |
| `NEXT_PUBLIC_BACKEND_URL` | Animex backend base URL, including its `/api` prefix. |

Variables prefixed with `NEXT_PUBLIC_` are included in the browser bundle. Do not store secrets in them.

## Local Development

Install dependencies and start the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Available scripts:

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the Next.js development server. |
| `npm run build` | Create an optimized production build. |
| `npm run start` | Run the completed production build. |

Do not run `npm run dev` and `npm run build` simultaneously in the same working tree. Both processes write to `.next` and can interfere with each other's generated files.

## Routes

| Route | Access | Description |
| --- | --- | --- |
| `/` | Public | Landing and anime discovery experience |
| `/search?q=...` | Public | Anime search results |
| `/anime/[slug]` | Public | Full anime details and watchlist action |
| `/watchlist` | Public | Watchlist saved in the current browser |
| `/signup` | Public | Account registration |
| `/signin` | Public | Account sign-in |
| `/verify-email` | Public | Email verification |
| `/dashboard` | Authenticated | User overview, recommendations, and account status |
| `/dashboard/settings` | Authenticated | Profile, providers, sessions, security, notifications, and account controls |

## Authentication

The frontend sends backend requests with credentials enabled. The Next.js middleware protects `/dashboard/:path*` by checking for a `refreshToken` cookie on requests to the frontend domain.

For production deployments where the frontend and API use sibling subdomains, the backend refresh-token cookie must be available to both. A typical configuration is:

```js
{
  httpOnly: true,
  secure: true,
  sameSite: "none",
  domain: ".example.com",
  path: "/"
}
```

Use the actual shared parent domain for the deployment. Logout must clear the cookie with the same `domain` and `path` used when it was created.

The middleware cookie check improves navigation behavior but does not replace backend authorization. Every protected backend endpoint must still validate the session.

The backend must also allow the exact frontend origin through CORS and enable credentialed requests. A wildcard origin cannot be used with credentials.

## Watchlist Storage

The current watchlist is stored in browser `localStorage` under `animex_watchlist`. It is device-specific, is limited to 20 entries, and is not currently synchronized to the authenticated account.

## Production

Set the production environment variables, then run:

```bash
npm run build
npm run start
```

After changing backend cookie options, remove old browser cookies and sign in again. Existing cookies retain the domain and path attributes with which they were originally created.

## Project Structure

```text
src/
  api/          Axios clients and backend API functions
  app/          Next.js routes and layouts
  components/   Navigation, forms, dashboard, and reusable UI
  hooks/        Search, discovery, keyboard, and responsive hooks
  lib/          Shared utilities
  types/        Application data types
  utils/        Validation and local watchlist storage
  middleware.ts Dashboard route guard
public/         Static images, manifest, and robots.txt
```

## Data Attribution

Anime information is retrieved from the public [Jikan API](https://jikan.moe/), an unofficial MyAnimeList API. Animex is not affiliated with MyAnimeList.
