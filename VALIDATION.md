# Validation

Passed:
- `npm run build`: TypeScript and production Vite build.
- `npm run lint`: ESLint.
- Availability assertions: all stays for two guests; only Lake House for six guests; no Lake House during its blocked dates; overlap rejection; back-to-back checkout and check-in allowed.
- All four local image files decoded and are included in the archive.

Browser validation could not complete in this environment because headless Chromium terminated during page navigation. Desktop/mobile screenshots and Three.js rendering were therefore not verified. Please check in your browser after `npm run dev`.

Suggested manual checks:
1. At desktop and mobile widths, check hero/search placement and card layout.
2. Search for six guests: only Lake House appears.
3. Search 31 December 2026–2 January 2027 for six guests: no results.
4. Click View: the accommodation dialog opens and closes.
5. Choose an invalid date range: the form shows a validation message.
6. Enable reduced motion: entrance animations and Three.js particles stop.

Vite reports bundles over 500 kB. Three.js is in a lazy-loaded chunk; further optimisation can be added later.
