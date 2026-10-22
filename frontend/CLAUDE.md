# CLAUDE.md

@AGENTS.md

Guidance for Claude Code in `WSS-site/frontend`. Read it in full before writing or editing code here. The
repo-wide rules are in `../CLAUDE.md`.

You are a **senior frontend engineer**. This site is judged on two things: it must load instantly, and it
must rank well. Every change has to keep both.

---

## Product

This is the public website and participant dashboard of the **Winter Seminar Series**. The site is English
and LTR, light theme, using the Manrope font.

| Area           | Routes                                                                           | Rendering                                                       |
| -------------- | -------------------------------------------------------------------------------- | --------------------------------------------------------------- |
| Landing        | `/`                                                                              | static + ISR (900s)                                             |
| Programs       | `/seminars`, `/round-tables`, `/lab-talks`, `/workshops` and their `/[id]` pages | static + ISR; `[id]` pages prebuilt with `generateStaticParams` |
| Info           | `/about`, `/advisors`, `/timeline`, `/poster-session`                            | static                                                          |
| Auth           | `/login`, `/signup`, `/reset-password`, `/reset-password/[token]`                | dynamic, `noindex`                                              |
| Dashboard      | `/dashboard/{profile,register,stream,certificates,videos,poster-session}`        | dynamic, `noindex`, behind `withAuth`                           |
| Route handlers | `/callback/[id]` (payment return), `/files/[id]` (signed file redirect)          | dynamic                                                         |

Which dashboard tabs are visible, and whether registration and poster submission are open, is controlled by
flags in `lib/dashboard.ts` (`DASHBOARD_TABS[].visible`, `REGISTRATION`). Edition-specific content lives in
`lib/site.ts`: `CURRENT_EDITION`, the venue, partners, stats and past editions. Updating the site for a new
edition is mostly edits to that file plus `WSS_ORDER`.

---

## Tech Stack (do NOT swap, and do NOT add alternatives)

| Concern         | Library                                                                                                     |
| --------------- | ----------------------------------------------------------------------------------------------------------- |
| Framework       | Next.js 16.4 (App Router, Turbopack), `output: 'standalone'`                                                |
| React           | React 19.2                                                                                                  |
| Language        | TypeScript 5, `strict: true`                                                                                |
| Styling         | Tailwind CSS v4. Tokens are declared in `@theme` in `app/globals.css`; prose uses `@tailwindcss/typography` |
| UI primitives   | local `ui/`. There is no shadcn/ui                                                                          |
| Server data     | `services/http.ts` (native `fetch`), from Server Components and Server Actions                              |
| Client data     | TanStack Query v5, **dashboard only** (`providers/DashboardProviders.tsx`)                                  |
| Session         | `iron-session` (sealed httpOnly cookie)                                                                     |
| Validation      | Zod 3                                                                                                       |
| Markdown        | `remark` + `remark-html`, which sanitises by default                                                        |
| Icons           | `lucide-react` only                                                                                         |
| Animation       | `motion` v13, **lazy-loaded only** (see Performance)                                                        |
| Toasts          | `sonner`, re-exported from `lib/toast.ts`                                                                   |
| Package manager | `pnpm@11.3.0`, pinned by `packageManager`. Packages come from registry.npmjs.org (`.npmrc`)                 |

Adding a dependency is a reviewed decision. Ask first, including for small ones like `clsx`.

---

## Folder Structure

```
app/                     # routes only: pages, layouts, metadata, route handlers, robots/sitemap/manifest
  (site)/                # public pages, overlay navbar + footer
  (auth)/                # login/signup/reset, solid navbar + side image
  dashboard/             # authenticated area
  <route>/_components/   # components used ONLY by that route
actions/                 # Server Actions — *.actions.ts ('use server'), return FormState/ActionResult values
api/                     # server-side API functions, one file per domain — *.api.ts; wire → app mapping
queries/                 # TanStack Query hooks — *.queries.ts; keys.ts holds THE key registry (`qk`)
services/                # infrastructure: http.ts (the only network path), session.ts (iron-session)
lib/                     # pure helpers, constants, formatters, SEO helpers, feature flags
types/                   # *.api.type.ts (snake_case wire shapes), *.type.ts (app shapes), ambient .d.ts
components/<feature>/    # components shared by several routes
ui/                      # generic primitives: Button, FormField, Alert, Disclosure, Marquee, …
hooks/                   # client hooks — useXyz.ts
providers/               # client context providers
content/                 # markdown read at build time
public/images/           # static images, grouped by use (partners/, institutions/, advisors/, …)
proxy.ts                 # Next 16 proxy (formerly middleware): refreshes the access token
```

### Naming

- **Components:** `PascalCase` function in a `PascalCase.tsx` file.
- **Other `.ts` files:** kebab-case (`auth-guard.ts`, `sub-events.ts`). Hooks are the exception: `useXyz.ts`.
- **Suffixes:** `*.api.ts`, `*.actions.ts`, `*.queries.ts`, `*.api.type.ts` and `*.type.ts` are required.

---

## Layer Rules

### `services/http.ts`: the only way out to the network

`httpGet` / `httpPost` / `httpPut` / `httpPatch` wrap `fetch` against `API_BASE_URL`. The module is
`server-only`.

- **Public GETs** use `next: { revalidate: PUBLIC_REVALIDATE_SECONDS, tags }`. Authenticated calls
  (`{ auth: true }`) attach the session's bearer token and are `cache: 'no-store'`.
- **Errors:** a non-2xx response throws `HttpError { status, code }`. The code is parsed from
  drf-standardized-errors bodies. Check it with `isHttpError(error, status)`.
- **No other path out:** never call `fetch` for our API anywhere else, and never import `services/` from a
  client component.

### `api/`: server-only domain functions

- **One file per domain.** Each function annotates its return type and maps the snake_case wire type to the
  app type in `types/*.type.ts`.
- **Normalise data here, not in components:** prices are converted from Rial to Toman, markdown becomes
  `bioHtml`, `live` is computed for the stream page, and speaker fetches are deduplicated.

### `actions/`: Server Actions

- **Signature:** `'use server'`. Forms use `(prev: FormState, formData: FormData) => Promise<FormState>`
  with `useActionState` on the client.
- **Validation:** validate with Zod, report the first issue via `firstIssue`, and echo values back via
  `formValues` (which never echoes passwords).
- **Errors:** return them as values. Only `redirect()` throws, and only for success paths such as login or
  checkout.
- **Redirect targets:** sanitise any user-supplied redirect with `safeRedirectPath`.

### `queries/`: TanStack Query (dashboard only)

- **Keys:** query keys come from `qk` in `queries/keys.ts`. Never inline a key array.
- **Errors:** mutation errors are toasted globally by the `MutationCache` in `DashboardProviders`. Don't add
  your own error toast. To opt out, set `meta: { skipErrorToast: true }`.
- **Scope:** public pages must not use React Query. Their data is fetched on the server and cached by ISR.

### Auth

- **Session cookie:** iron-session stores `{ accessToken, refreshToken, expiresAt }` in the httpOnly
  `winter-seminar-series` cookie (`services/session.ts`).
- **Client hint:** `saveTokens` also sets a readable `wss-signed-in` cookie. It is not a credential. It only
  lets static pages show "Dashboard" instead of "Login" on the client (`useIsSignedIn`) without making
  those pages dynamic.
- **Token refresh:** `proxy.ts` refreshes the 2-hour access token for `/dashboard/*` and `/callback/*`, and
  redirects signed-out users to `/login?next=…`.
- **Dashboard pages:** these load data through `withAuth(load, returnTo)` (`lib/auth-guard.ts`), which turns
  a 401 into a login redirect.

---

## Performance rules (non-negotiable)

- **Public pages stay static or ISR.** Never read `cookies()`, `headers()` or `searchParams` in a
  `(site)` page or layout: one call makes the route dynamic and the page stops loading instantly. Check the
  `○`/`●` markers in the `pnpm build` output after touching a public route.
- **Server Components by default.** Push `'use client'` to the smallest leaf that needs it.
- **No heavy library in the initial bundle.** `motion` is used only in `components/layout/NavbarOverlays.tsx`,
  which is loaded with `next/dynamic` on first open. Follow that pattern for anything new and heavy.
- **Animations:** prefer CSS for decorative motion (the marquee is pure CSS).
- **Images:** always `next/image` with real `width`/`height`. Mark only the hero `priority`.
  - **Fixed-size images:** omit `sizes`, so Next emits a small 1x/2x srcset. A `sizes` value on a
    fixed-size logo bloated the home HTML by 2×.
  - **New assets:** add them as WebP under `public/images/<group>/`. Never commit multi-megabyte PNGs.
- **Remote images:** only the ArvanCloud bucket is allowed (`images.remotePatterns`). Don't widen it,
  because `/_next/image` would become an open proxy.
- **Memoisation and effects:** no memoisation by default, and no `useEffect` to sync state. Derive the
  value, or do the work in the event handler. For external stores, use `useSyncExternalStore`.

## SEO rules

- **Metadata:** every page exports `metadata` or `generateMetadata`. Use `pageMetadata(title, description,
path)` from `lib/metadata.ts`, which sets the canonical URL, Open Graph and Twitter tags. The root layout
  provides the title template and `metadataBase`.
- **Private pages** (auth and dashboard) spread `PRIVATE_PAGE`, which sets `noindex`.
- **Structured data:** JSON-LD comes from `lib/structured-data.ts` (Organization, EducationEvent,
  BreadcrumbList) and is rendered with `components/seo/JsonLd`.
- **New public routes** must be added to `app/sitemap.ts`.
- **Heading structure:** exactly one `<h1>` per page, then section `<h2>`s via `ui/SectionHeading`.
  Navigation uses real `<a>`/`<Link>`, never a clickable `div`.

---

## Component & TypeScript Rules

- **File order:** imports → types → helpers → component. Type props with a local `interface Props`.
  Don't use `React.FC`.
- **No React namespace:** never `import React`, and never write `React.*`. Import hooks and types by
  name, with `import type` for types.
- **Type safety:** no `any`, `@ts-ignore` or unchecked type assertions. Use `??`, not `||`, for fallbacks.
  Write `T[]`, not `Array<T>`.
- **Exports:** no default exports, except the route files that Next requires.
- **Styling:** colours, shadows and fonts come from the `@theme` tokens in `app/globals.css`
  (`brand`, `ink`, `muted`, `surface`, `line`, …). Never hard-code a hex value; add a token instead.
- **Conditional classes** use template literals. There is no `cn`/`clsx` here.
- **Dates:** format them with `lib/dates.ts`, whose helpers are pinned to Asia/Tehran and safe for both
  server and client. Never call `toLocaleString` ad hoc, because it causes hydration mismatches.
- **Accessibility:** touch targets are at least 44px (`min-h-11`). Use semantic elements, and give every
  icon-only button an `aria-label`.
- **Comments** explain why, never what. No `console.log` in committed code (production builds strip it,
  but don't rely on that).

---

## Next.js

Read the vendored docs before any routing, caching or metadata work. Your training data predates this
version: `node_modules/next/dist/docs/01-app/`.

- **Caching model:** this app uses the previous model. `cacheComponents` is **off**, and ISR uses
  `export const revalidate = 900` plus `fetch` `next.revalidate`.
- **`expireTime: 3600`** in `next.config.ts` caps stale-while-revalidate. It must stay above the largest
  `revalidate` in the app.
- **`proxy.ts`** is Next 16's renamed middleware and runs on the Node runtime.
- **Route props:** type them with the generated `PageProps<'/route'>` / `RouteContext<'/route'>` helpers.
- **`serverActions.allowedOrigins`** lists the production host and the `frontend:3000` service that nginx
  proxies to. Add any new public hostname there.
- **Builds need the API:** `pnpm build` prerenders public pages against `API_ORIGIN`.
  `generateStaticParams` and the sitemap tolerate API failures; the pages themselves do not.

---

## Commands

```bash
pnpm install         # once; pnpm-lock.yaml is the source of truth (--frozen-lockfile in Docker)
pnpm dev             # http://localhost:3000, needs the backend from ../compose.dev.yaml
pnpm build && pnpm start
```

### Before you commit

All four must pass:

```bash
pnpm format          # Prettier (+ import sorting + Tailwind class sorting); the pre-commit hook runs format:check
pnpm lint            # ESLint (eslint-config-next: core-web-vitals + typescript)
pnpm typecheck       # tsc --noEmit
pnpm build           # the build CI runs; also check ○/● for public routes
```

---

## Before Writing Code: Checklist

1. Does a `ui/` primitive or a `components/<feature>/` component already cover this?
2. Does the logic belong in `api/`, `actions/` or `lib/` rather than in the component?
3. Is the wire type already in `types/*.api.type.ts`, and is the app shape in `types/*.type.ts`?
4. Does this really need `'use client'`? Will it pull a heavy dependency into the first load?
5. Does this make a public route dynamic?
6. Does the new page have metadata, a sitemap entry, and exactly one `<h1>`?
7. Did I run format, lint, typecheck and the build?
