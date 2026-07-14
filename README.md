# FusionBet

A sports betting frontend website, built as a portfolio project.

**This is a UI demo. It is not a gambling product.** There are no accounts, no deposits, no
withdrawals, and no wagering. Every odd, score and statistic is mock data, and the "place bet"
control is permanently disabled by design. The disclaimer is pinned above the navigation on every
page rather than buried in a footer, because in a regulated vertical the disclosure *is* part of
the design.

---
## 🚀 Live Demo
[View live site](https://ferdinanddev.github.io/FusionBet/)

## Stack

React · Vite · React Router · Tailwind CSS · Framer Motion · Recharts · Axios · Context API · localStorage


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


## Licence

MIT. Team names, leagues and player names are used illustratively in fictional fixtures; no
affiliation is implied.
