import axios from "axios";
import { MATCHES, SPORTS, PROMOS, TIMELINE } from "../data/mockData";

/**
 * Reusable API service.
 *
 * Right now every method resolves from the mock dataset after a short delay,
 * which is what drives the loading skeletons. To go live, set VITE_API_URL and
 * VITE_API_KEY in .env, then replace each `mock()` call with the `client` call
 * shown beneath it. No component changes required.
 */

const LATENCY = 600;

export const client = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "",
  headers: import.meta.env.VITE_API_KEY
    ? { "x-apisports-key": import.meta.env.VITE_API_KEY }
    : {},
  timeout: 10000,
});

const mock = (payload, fail = false) =>
  new Promise((resolve, reject) =>
    setTimeout(
      () => (fail ? reject(new Error("Request failed")) : resolve(payload)),
      LATENCY
    )
  );

export const sportsApi = {
  // return client.get("/fixtures?live=all").then(r => r.data.response)
  getMatches: () => mock(MATCHES),

  getMatchById: (id) => mock(MATCHES.find((m) => m.id === Number(id)) || null),

  getLive: () => mock(MATCHES.filter((m) => m.status === "live")),

  getUpcoming: () => mock(MATCHES.filter((m) => m.status === "upcoming")),

  getResults: () => mock(MATCHES.filter((m) => m.status === "finished")),

  getSports: () => mock(SPORTS),

  getPromotions: () => mock(PROMOS),

  getTimeline: (_id) => mock(TIMELINE),

  search: (q) => {
    const s = String(q || "").trim().toLowerCase();
    if (!s) return mock([]);
    return mock(
      MATCHES.filter((m) =>
        [m.home, m.away, m.league, m.country, m.sport].some((v) =>
          v.toLowerCase().includes(s)
        )
      )
    );
  },
};

export default sportsApi;
