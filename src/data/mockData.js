/**
 * Mock dataset. Shaped exactly like an API response so services/sportsApi.js
 * can be swapped for a real endpoint (api-football, TheSportsDB, etc.)
 * without touching a single component.
 */

export const SPORTS = [
  { id: "football",   name: "Football",   emoji: "\u26BD",    count: 148, hue: "#16A34A" },
  { id: "basketball", name: "Basketball", emoji: "\uD83C\uDFC0", count: 62,  hue: "#F59E0B" },
  { id: "tennis",     name: "Tennis",     emoji: "\uD83C\uDFBE", count: 44,  hue: "#84CC16" },
  { id: "baseball",   name: "Baseball",   emoji: "\u26BE",    count: 31,  hue: "#2563EB" },
  { id: "hockey",     name: "Hockey",     emoji: "\uD83C\uDFD2", count: 27,  hue: "#06B6D4" },
  { id: "cricket",    name: "Cricket",    emoji: "\uD83C\uDFCF", count: 19,  hue: "#EF4444" },
  { id: "f1",         name: "Formula 1",  emoji: "\uD83C\uDFCE\uFE0F", count: 4, hue: "#F43F5E" },
  { id: "volleyball", name: "Volleyball", emoji: "\uD83C\uDFD0", count: 12,  hue: "#A855F7" },
  { id: "esports",    name: "Esports",    emoji: "\uD83C\uDFAE", count: 58,  hue: "#8B5CF6" },
  { id: "mma",        name: "MMA",        emoji: "\uD83E\uDD4A", count: 9,   hue: "#F97316" },
];

export const MATCHES = [
  { id: 1,  sport: "football",   league: "Premier League", country: "England", home: "Arsenal",          away: "Liverpool",     status: "live",     minute: 67,  hs: 2,    as: 1,    venue: "Emirates Stadium",        kickoff: "20:00", odds: { home: 1.85, draw: 3.60, away: 4.20 }, stats: { possession: [58, 42], shots: [14, 9],  corners: [7, 3], cards: [2, 3] } },
  { id: 2,  sport: "football",   league: "La Liga",        country: "Spain",   home: "Real Madrid",      away: "Sevilla",       status: "live",     minute: 34,  hs: 1,    as: 0,    venue: "Santiago Bernab\u00E9u",  kickoff: "21:00", odds: { home: 1.42, draw: 4.50, away: 7.00 }, stats: { possession: [64, 36], shots: [11, 4],  corners: [5, 1], cards: [1, 2] } },
  { id: 3,  sport: "basketball", league: "NBA",            country: "USA",     home: "Celtics",          away: "Nuggets",       status: "live",     quarter: "Q3", hs: 78, as: 74,   venue: "TD Garden",               kickoff: "01:30", odds: { home: 1.70, away: 2.15 },            stats: { possession: [51, 49], shots: [62, 58], corners: [0, 0], cards: [0, 0] } },
  { id: 4,  sport: "football",   league: "Serie A",        country: "Italy",   home: "Inter",            away: "Napoli",        status: "upcoming", hs: null,    as: null, venue: "San Siro",                 kickoff: "19:45", odds: { home: 2.05, draw: 3.30, away: 3.55 }, stats: { possession: [50, 50], shots: [0, 0],   corners: [0, 0], cards: [0, 0] } },
  { id: 5,  sport: "tennis",     league: "ATP Masters",    country: "France",  home: "Alcaraz",          away: "Sinner",        status: "upcoming", hs: null,    as: null, venue: "Court Philippe-Chatrier",  kickoff: "14:00", odds: { home: 1.95, away: 1.90 },            stats: { possession: [50, 50], shots: [0, 0],   corners: [0, 0], cards: [0, 0] } },
  { id: 6,  sport: "cricket",    league: "The Hundred",    country: "England", home: "Oval Invincibles", away: "Trent Rockets", status: "upcoming", hs: null,    as: null, venue: "The Kia Oval",             kickoff: "18:30", odds: { home: 1.75, away: 2.10 },            stats: { possession: [50, 50], shots: [0, 0],   corners: [0, 0], cards: [0, 0] } },
  { id: 7,  sport: "esports",    league: "LEC",            country: "Germany", home: "G2 Esports",       away: "Fnatic",        status: "live",     minute: 28,  hs: 1,    as: 1,    venue: "Riot Arena Berlin",        kickoff: "17:00", odds: { home: 1.60, away: 2.35 },            stats: { possession: [53, 47], shots: [22, 19], corners: [0, 0], cards: [0, 0] } },
  { id: 8,  sport: "hockey",     league: "NHL",            country: "Canada",  home: "Maple Leafs",      away: "Bruins",        status: "upcoming", hs: null,    as: null, venue: "Scotiabank Arena",         kickoff: "23:00", odds: { home: 2.25, draw: 4.10, away: 2.60 }, stats: { possession: [50, 50], shots: [0, 0],   corners: [0, 0], cards: [0, 0] } },
  { id: 9,  sport: "football",   league: "Bundesliga",     country: "Germany", home: "Bayern",           away: "Dortmund",      status: "finished", hs: 3,       as: 2,    venue: "Allianz Arena",            kickoff: "17:30", odds: { home: 1.55, draw: 4.20, away: 5.00 }, stats: { possession: [61, 39], shots: [18, 11], corners: [9, 4], cards: [1, 4] } },
  { id: 10, sport: "basketball", league: "EuroLeague",     country: "Greece",  home: "Panathinaikos",    away: "Olympiacos",    status: "finished", hs: 88,      as: 91,   venue: "OAKA",                     kickoff: "20:15", odds: { home: 1.90, away: 1.95 },            stats: { possession: [48, 52], shots: [70, 74], corners: [0, 0], cards: [0, 0] } },
  { id: 11, sport: "mma",        league: "UFC 312",        country: "USA",     home: "Pereira",          away: "Ankalaev",      status: "finished", hs: 1,       as: 0,    venue: "T-Mobile Arena",           kickoff: "05:00", odds: { home: 1.80, away: 2.00 },            stats: { possession: [55, 45], shots: [92, 71], corners: [0, 0], cards: [0, 0] } },
  { id: 12, sport: "f1",         league: "Grand Prix",     country: "Monaco",  home: "Verstappen",       away: "Norris",        status: "upcoming", hs: null,    as: null, venue: "Circuit de Monaco",        kickoff: "15:00", odds: { home: 1.65, away: 2.40 },            stats: { possession: [50, 50], shots: [0, 0],   corners: [0, 0], cards: [0, 0] } },
  { id: 13, sport: "football",   league: "Ligue 1",        country: "France",  home: "PSG",              away: "Marseille",     status: "upcoming", hs: null,    as: null, venue: "Parc des Princes",         kickoff: "20:45", odds: { home: 1.48, draw: 4.60, away: 6.20 }, stats: { possession: [50, 50], shots: [0, 0],   corners: [0, 0], cards: [0, 0] } },
  { id: 14, sport: "tennis",     league: "WTA 1000",       country: "USA",     home: "\u015Awi\u0105tek", away: "Gauff",        status: "live",     quarter: "Set 2", hs: 1, as: 0, venue: "Indian Wells",        kickoff: "22:00", odds: { home: 1.55, away: 2.45 },            stats: { possession: [57, 43], shots: [41, 33], corners: [0, 0], cards: [0, 0] } },
  { id: 15, sport: "volleyball", league: "Serie A1",       country: "Italy",   home: "Perugia",          away: "Trentino",      status: "upcoming", hs: null,    as: null, venue: "PalaBarton",               kickoff: "18:00", odds: { home: 1.72, away: 2.12 },            stats: { possession: [50, 50], shots: [0, 0],   corners: [0, 0], cards: [0, 0] } },
  { id: 16, sport: "baseball",   league: "MLB",            country: "USA",     home: "Yankees",          away: "Dodgers",       status: "finished", hs: 4,       as: 7,    venue: "Yankee Stadium",           kickoff: "00:05", odds: { home: 2.10, away: 1.78 },            stats: { possession: [46, 54], shots: [8, 12],  corners: [0, 0], cards: [0, 0] } },
];

export const PROMOS = [
  { id: 1, title: "Acca Insurance",        tag: "Demo only", hue: "#16A34A", body: "Five-fold or more, one leg lets you down \u2014 this is where a real operator would refund the stake. Here it does nothing at all." },
  { id: 2, title: "Price Boost of the Day", tag: "Demo only", hue: "#F59E0B", body: "A hand-picked market with an inflated price. Purely a card layout exercise \u2014 the number is hard-coded." },
  { id: 3, title: "Free-to-Play Predictor", tag: "Demo only", hue: "#2563EB", body: "Pick six scorelines, win nothing, because there is no prize engine behind this button." },
];

export const TIMELINE = [
  { min: 12, type: "goal", team: "home", text: "Saka \u2014 right foot, near post" },
  { min: 23, type: "card", team: "away", text: "Van Dijk \u2014 yellow, tactical foul" },
  { min: 41, type: "goal", team: "away", text: "Salah \u2014 penalty, sent the keeper the wrong way" },
  { min: 58, type: "goal", team: "home", text: "\u00D8degaard \u2014 20 yards, top corner" },
  { min: 64, type: "card", team: "home", text: "Rice \u2014 yellow, dissent" },
];

export const WEEKLY_VIEWS = [
  { name: "Mon", v: 12 }, { name: "Tue", v: 19 }, { name: "Wed", v: 8 },
  { name: "Thu", v: 24 }, { name: "Fri", v: 31 }, { name: "Sat", v: 47 },
  { name: "Sun", v: 22 },
];
