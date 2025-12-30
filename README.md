````md
# BlackRabbitHere Blog App (NextPro)

![Next.js](https://img.shields.io/badge/Next.js-16-black)
![React](https://img.shields.io/badge/React-19-149eca)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Convex](https://img.shields.io/badge/Backend-Convex-orange)

A modern **blog platform** built with **Next.js App Router** + **Convex** for backend/data, featuring **email/password auth (Better Auth)**, **image uploads**, **comments**, **search**, and **real-time presence** on blog posts.

---

## What this project does

- Browse blog posts and read full articles
- Create new posts with an uploaded cover image (stored in **Convex Storage**)
- Comment on posts (requires authentication)
- Search posts by title/body (powered by **Convex search indexes**)
- Show “viewing now” presence in a post (via `@convex-dev/presence`)
- Polished UI with **Tailwind v4** + **shadcn/ui** components and a **dark mode** toggle

---

## Why it’s useful

This repo is a clean example of:
- **Next.js server actions** driving authenticated writes to a backend (Convex mutations)
- A full-stack setup where **Convex** handles database + auth integration + storage
- Practical UX features like **search**, **toasts**, and **presence** with minimal complexity

---

## Tech stack

- **Frontend:** Next.js 16 (App Router), React 19, TypeScript
- **Backend/Data:** Convex (`convex/` functions + schema)
- **Auth:** Better Auth + Convex integration (`@convex-dev/better-auth`)
- **UI:** Tailwind CSS v4, shadcn/ui, Radix UI, lucide-react, next-themes
- **Forms/Validation:** react-hook-form + zod

---

## Project structure (high level)

- `app/` — Next.js routes (home, blog list, post detail, create, auth)
- `app/actions.ts` — server action that uploads images + creates posts
- `components/web/` — app components (Navbar, SearchInput, CommentSection, Presence)
- `components/ui/` — shadcn/ui components
- `convex/` — Convex backend (schema, queries, mutations, auth, presence)
- `lib/` — auth helpers and utilities

---

## Getting started

### Prerequisites
- Node.js (recommended: latest LTS)
- A Convex account/project (or local dev via Convex CLI)

### 1) Install dependencies

```bash
npm install
````

### 2) Set up environment variables

Create a `.env.local` in the project root:

```bash
# Convex
NEXT_PUBLIC_CONVEX_URL="https://<your-deployment>.convex.cloud"

# Used by @convex-dev/better-auth/nextjs
NEXT_PUBLIC_CONVEX_SITE_URL="http://localhost:3000"

# Used by Convex Better Auth configuration in convex/auth.ts
SITE_URL="http://localhost:3000"
```

> Notes:
>
> * `NEXT_PUBLIC_CONVEX_URL` comes from your Convex deployment dashboard.
> * `SITE_URL` should match where your Next.js app runs (local or production).

### 3) Run Convex (backend)

In one terminal:

```bash
npx convex dev
```

This will:

* start your Convex dev deployment
* watch/push functions in `convex/`
* generate types in `convex/_generated/`

### 4) Run Next.js (frontend)

In another terminal:

```bash
npm run dev
```

Open: [http://localhost:3000](http://localhost:3000)

---

## Usage

### Create an account

* Go to `/auth/sign-up`
* Create a user with email/password (email verification is disabled in current config)

### Log in

* Go to `/auth/login`

### Create a post

* Go to `/create`
* Provide title, content, and an image
* Submit → server action uploads the image to Convex Storage and creates a post

### Read and comment

* Open any post from `/blog`
* Comments require authentication (enforced in `convex/comments.ts`)

### Search posts

* Use the navbar search input
* Results are powered by Convex search indexes:

  * `posts.search_title`
  * `posts.search_body`

### Presence (viewers)

* On a post page, presence is shown via `@convex-dev/presence`
* See: `components/web/PostPresence.tsx` + `convex/presence.ts`

---

## Development notes

### Server action flow (create post + image)

`app/actions.ts` does the following:

1. Validates input with Zod (`app/schemas/blog.ts`)
2. Reads auth token (`lib/auth-server.ts`)
3. Requests an upload URL from Convex (`api.posts.generateImageUploadOrl`)
4. Uploads the file to Convex Storage
5. Creates the post (`api.posts.createPost`)
6. Revalidates the `blog` cache tag and redirects to `/blog`

### Auth integration

* Next.js routes for auth are handled via:

  * `app/api/auth/[...all]/route.ts`
  * `lib/auth-server.ts`
* Convex Better Auth configuration lives in:

  * `convex/auth.ts`
  * `convex/auth.config.ts`
  * `convex/http.ts`

### Caching

The blog list route uses Next’s caching primitives:

* `cacheLife("hours")`
* `cacheTag("blog")`
  And the create action calls:
* `updateTag("blog")`

---

## Scripts

```bash
npm run dev      # Start Next.js dev server
npm run build    # Build Next.js
npm run start    # Start production server
npm run lint     # ESLint
```

---

## Where to get help

* Next.js Docs: [https://nextjs.org/docs](https://nextjs.org/docs)
* Convex Docs: [https://docs.convex.dev](https://docs.convex.dev)
* Better Auth Docs: [https://www.better-auth.com](https://www.better-auth.com) (and package docs via npm)
* shadcn/ui: [https://ui.shadcn.com](https://ui.shadcn.com)

If something isn’t working locally, the first things to verify are:

* `.env.local` values are present and correct
* `npx convex dev` is running
* `NEXT_PUBLIC_CONVEX_URL` points to the same deployment your CLI is using

---

## Contributing

Contributions are welcome.

**Suggested workflow**

1. Fork the repo
2. Create a branch: `git checkout -b feat/<short-name>`
3. Make changes (and keep types/lint clean)
4. Run:

   ```bash
   npm run lint
   npm run build
   ```
5. Open a PR with a clear description and screenshots/notes if UI changes are involved

**Areas that are good candidates for improvement**

* Route protection for `/create` (currently auth is enforced at mutation/action level; you may also want UI-level redirects)
* Better error handling + user feedback on failed uploads
* Pagination for `/blog`
* Author profile pages

---

