# FusionBet

A sports dashboard frontend, built as a portfolio project.

**This is a UI demo. It is not a gambling product.** There are no accounts, no deposits, no
withdrawals, and no wagering. Every odd, score and statistic is mock data, and the "place bet"
control is permanently disabled by design. The disclaimer is pinned above the navigation on every
page rather than buried in a footer, because in a regulated vertical the disclosure *is* part of
the design.

---

## Why it looks like this

Three decisions worth knowing about before reading the code:

**The bet slip is the centrepiece.** It's the only part of a sportsbook with real state complexity:
selections accumulate, odds multiply into a combined price, returns recalculate against a stake,
and one match can only ever hold one selection (you can't back both sides of the same fixture). All
of that lives in `context/AppContext.jsx` and is derived, never duplicated.

**The API layer is a seam, not a stub.** `services/sportsApi.js` resolves from the mock dataset
after a short delay, which is what drives the loading skeletons. Point `VITE_API_URL` at a real
sports API and swap each `mock()` for the `client` call already written in the comments — no
component changes required.

**Theme is runtime, not a class toggle.** `styles/theme.js` exports two palettes and `AppContext`
picks between them, so dark/light switching costs one state change rather than a cascade of
conditional classes. Tailwind's config carries the same colours for static utilities.

---

## Stack

React · Vite · React Router · Tailwind CSS · Framer Motion · Recharts · Axios · Context API · localStorage

## Running it

```bash
npm install
npm run dev
```

Then open the URL Vite prints (usually `http://localhost:5173`).

```bash
npm run build     # production build to /dist
npm run preview   # serve the built output locally
```

## Structure

```
src/
  components/       Navbar, Footer, MatchCard, OddsButton, FilterPanel, SearchBar…
    ui/             Button, Badge, Glass, Modal, Toasts, Pagination, LoadingSkeleton
  pages/            Home, Live, Sports, MatchDetails, BetSlip, Results,
                    Promotions, Dashboard, Profile, 404
  layouts/          MainLayout — nav, footer, toasts, scroll-to-top
  context/          AppContext — theme, bet slip, favourites, toasts
  hooks/            useLocalStorage, useFetch, useScrollTop
  services/         sportsApi — the swappable data layer
  data/             mockData — matches, sports, promos, timeline
  styles/           index.css, theme.js
```

## Features

Ten sports · sixteen fixtures · live / upcoming / finished states · accumulator bet slip with
combined-odds maths · favourites and recently-viewed (persisted) · search with autocomplete across
team, league, sport and country · filtering and pagination · dashboard charts · dark and light
themes · loading skeletons · toast notifications · route-level code splitting · animated page
transitions · 404 · keyboard navigation and ARIA labels throughout · `prefers-reduced-motion`
respected.

## Deploying to GitHub Pages

1. In `vite.config.js`, set `base: "/fusionbet/"` (your repo name).
2. In `src/main.jsx`, set `<BrowserRouter basename="/fusionbet">`.
3. Build and publish `dist/` — either with the `gh-pages` package or a GitHub Actions workflow.

Because this is a single-page app, a project page also needs a `404.html` that mirrors
`index.html`, otherwise deep links like `/match/3` will 404 on refresh.

## Licence

MIT. Team names, leagues and player names are used illustratively in fictional fixtures; no
affiliation is implied.
