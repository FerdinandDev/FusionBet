import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import { useApp } from "../context/AppContext";
import { MATCHES } from "../data/mockData";

/** Autocomplete across team, league, sport and country. */
export default function SearchBar() {
  const { c } = useApp();
  const navigate = useNavigate();
  const [q, setQ] = useState("");
  const [focused, setFocused] = useState(false);

  const suggestions = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return [];
    return MATCHES.filter((m) =>
      [m.home, m.away, m.league, m.country, m.sport].some((v) =>
        v.toLowerCase().includes(s)
      )
    ).slice(0, 5);
  }, [q]);

  return (
    <div className="relative">
      <Search
        size={15}
        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2"
        style={{ color: c.muted }}
      />
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setTimeout(() => setFocused(false), 150)}
        placeholder="Team, league, sport, country…"
        aria-label="Search matches"
        role="combobox"
        aria-expanded={focused && suggestions.length > 0}
        className="w-56 rounded-xl py-2 pl-9 pr-3 text-sm outline-none transition focus:w-72"
        style={{ background: c.surfaceAlt, border: `1px solid ${c.border}`, color: c.text }}
      />

      {focused && suggestions.length > 0 && (
        <ul
          className="absolute right-0 top-12 w-80 overflow-hidden rounded-xl"
          style={{
            background: c.surface,
            border: `1px solid ${c.border}`,
            boxShadow: "0 20px 50px -20px rgba(0,0,0,.8)",
          }}
        >
          {suggestions.map((m) => (
            <li key={m.id}>
              <button
                onMouseDown={() => {
                  navigate(`/match/${m.id}`);
                  setQ("");
                }}
                className="flex w-full items-center justify-between px-4 py-3 text-left text-sm transition hover:brightness-125"
                style={{ borderBottom: `1px solid ${c.border}` }}
              >
                <span>
                  {m.home} <span style={{ color: c.muted }}>v</span> {m.away}
                </span>
                <span className="text-xs" style={{ color: c.muted }}>
                  {m.league}
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
