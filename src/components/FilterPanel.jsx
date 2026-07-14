import React from "react";
import { Search } from "lucide-react";
import { useApp } from "../context/AppContext";
import { SPORTS } from "../data/mockData";
import Glass from "./ui/Glass";

const STATUSES = ["all", "live", "upcoming", "finished"];

export default function FilterPanel({ query, setQuery, sport, setSport, status, setStatus }) {
  const { c } = useApp();

  return (
    <Glass className="flex flex-col gap-3 p-4 md:flex-row md:items-center">
      <div className="relative flex-1">
        <Search
          size={15}
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2"
          style={{ color: c.muted }}
        />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search team, league or country…"
          aria-label="Filter matches"
          className="w-full rounded-xl py-2.5 pl-9 pr-3 text-sm outline-none"
          style={{ background: c.surfaceAlt, border: `1px solid ${c.border}`, color: c.text }}
        />
      </div>

      <select
        value={sport}
        onChange={(e) => setSport(e.target.value)}
        aria-label="Filter by sport"
        className="rounded-xl px-3 py-2.5 text-sm outline-none"
        style={{ background: c.surfaceAlt, border: `1px solid ${c.border}`, color: c.text }}
      >
        <option value="all">All sports</option>
        {SPORTS.map((s) => (
          <option key={s.id} value={s.id}>{s.name}</option>
        ))}
      </select>

      <div className="flex flex-wrap gap-2">
        {STATUSES.map((s) => (
          <button
            key={s}
            onClick={() => setStatus(s)}
            aria-pressed={status === s}
            className="rounded-xl px-3 py-2 text-xs font-semibold capitalize transition"
            style={{
              background: status === s ? c.primary : c.surfaceAlt,
              color: status === s ? "#fff" : c.muted,
              border: `1px solid ${status === s ? c.primary : c.border}`,
            }}
          >
            {s}
          </button>
        ))}
      </div>
    </Glass>
  );
}
