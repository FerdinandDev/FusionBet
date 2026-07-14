import React from "react";
import { Link } from "react-router-dom";
import { Heart, ChevronRight } from "lucide-react";
import { useApp } from "../context/AppContext";
import { SPORTS } from "../data/mockData";
import Glass from "./ui/Glass";
import StatusPill from "./StatusPill";
import OddsButton from "./OddsButton";

export default function MatchCard({ match: m }) {
  const { c, favs, toggleFav } = useApp();
  const fav = favs.includes(m.id);
  const sport = SPORTS.find((s) => s.id === m.sport);
  const isLive = m.status === "live";

  return (
    <Glass hover className="flex h-full flex-col gap-3 p-4">
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2 text-xs" style={{ color: c.muted }}>
          <span aria-hidden="true">{sport?.emoji}</span>
          <span className="font-medium">{m.league}</span>
          <span aria-hidden="true">·</span>
          <span>{m.country}</span>
        </div>
        <button
          onClick={() => toggleFav(m.id)}
          aria-label={fav ? "Remove from favourites" : "Add to favourites"}
          aria-pressed={fav}
          className="shrink-0 transition hover:scale-110"
        >
          <Heart size={16} fill={fav ? c.danger : "none"} style={{ color: fav ? c.danger : c.muted }} />
        </button>
      </div>

      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0 flex-1 space-y-1">
          <p className="truncate text-sm font-semibold">{m.home}</p>
          <p className="truncate text-sm font-semibold">{m.away}</p>
        </div>
        <div className="shrink-0 text-right">
          {m.hs !== null && m.hs !== undefined ? (
            <>
              <p className="text-lg font-black leading-tight" style={{ color: isLive ? c.primary : c.text }}>{m.hs}</p>
              <p className="text-lg font-black leading-tight" style={{ color: isLive ? c.primary : c.text }}>{m.as}</p>
            </>
          ) : (
            <p className="text-xs font-medium" style={{ color: c.muted }}>vs</p>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <StatusPill match={m} />
        <Link
          to={`/match/${m.id}`}
          className="flex items-center gap-0.5 text-xs font-semibold transition hover:gap-1.5"
          style={{ color: c.secondary }}
        >
          Details <ChevronRight size={13} />
        </Link>
      </div>

      <div className="mt-auto flex gap-2 pt-1">
        <OddsButton match={m} market="home" label="1" odds={m.odds.home} />
        {m.odds.draw && <OddsButton match={m} market="draw" label="X" odds={m.odds.draw} />}
        <OddsButton match={m} market="away" label="2" odds={m.odds.away} />
      </div>
    </Glass>
  );
}
