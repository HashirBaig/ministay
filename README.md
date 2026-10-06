# MiniStay

A responsive recreation-stay landing page based on the supplied UI reference.
Built in the uploaded React + Vite + TypeScript template, with its existing shadcn/Base UI components, Framer Motion and Three.js.

## Run

Requires Node.js 22.12+ (Node.js 24 recommended).

```bash
npm ci
npm run dev
```

Open http://localhost:3000.

```bash
npm run build
npm run lint
npm run preview
```

## Features

- Responsive navigation, nature hero, search panel and accommodation cards.
- Date and guest search using local demo data; cancelled bookings and actual bookings are not modelled yet.
- Half-open date overlap logic: check-in < blocked checkout AND checkout > blocked check-in. A stay ending when a blocked stay starts is allowed.
- Date validation and an empty-results state.
- shadcn buttons, inputs, cards, accessible accommodation dialogs and clear placeholders for Manage booking and Admin.
- Framer Motion entrances and hover effects, respecting reduced-motion preferences.
- Lazy-loaded Three.js pollen effect with a photo fallback when WebGL is unavailable; resources are disposed on unmount and rendering pauses offscreen or in hidden tabs.
- Local photography, fonts and favicon. No remote image requests at runtime.

## Main files

- `src/pages/LandingPage.tsx`: landing-page layout, form and detail dialogs.
- `src/components/landing/HeroAtmosphere.tsx`: decorative Three.js scene.
- `src/data/stays.ts`: demo stays and availability filtering.
- `src/App.css`: responsive styling.
- `src/config/environment.ts`: optional VITE_API_URL, default `/api`.

The uploaded template is Vite, not Next.js; it has been retained rather than migrated. This is a frontend demo, not a reservation backend. Search applies local data only; bookings, payments, authentication and admin management are not connected.

## Demo blocked dates

- Forest Cabin: 24–28 December 2026.
- Glamping Tent: 20 December 2026–4 January 2027.
- Lake House: 30 December 2026–3 January 2027.

Search for six guests to see only Lake House. Search for six guests over 31 December 2026–2 January 2027 to see an empty result.

## Photography

Photos downloaded from Unsplash, used as illustrative demo imagery. They do not depict actual bookable properties, and the tent photo is general camping imagery.

- Hero: https://images.unsplash.com/photo-1470770841072-f978cf4d019e
- Cabin: https://images.unsplash.com/photo-1510798831971-661eb04b3739
- Tent: https://images.unsplash.com/photo-1504280390367-361c6d9f38f4
- House: https://images.unsplash.com/photo-1449844908441-8829872d2607

## Verification

Production TypeScript/Vite build and ESLint checks pass. See `VALIDATION.md` for browser checks.
