import React from "react";
import { useApp } from "../context/AppContext";

/**
 * A single odds cell. Selected state is derived from the slip, so the button
 * is the source of truth for nothing — the context is.
 */
export default function OddsButton({ match, market, label, odds, block }) {
  const { c, slip, addSel } = useApp();
  const picked = slip.some((s) => s.matchId === match.id && s.key === market);

  const styles = {
    background: picked ? c.primary : c.surfaceAlt,
    border: `1px solid ${picked ? c.primary : c.border}`,
    color: picked ? "#fff" : c.text,
  };

  if (block) {
    return (
      <button
        onClick={() => addSel(match, market, label, odds)}
        aria-pressed={picked}
        className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold transition hover:-translate-y-0.5"
        style={styles}
      >
        <span>{label}</span>
        <span style={{ color: picked ? "#fff" : c.accent }}>{odds.toFixed(2)}</span>
      </button>
    );
  }

  return (
    <button
      onClick={() => addSel(match, market, label, odds)}
      aria-pressed={picked}
      aria-label={`${label} at ${odds.toFixed(2)}`}
      className="flex flex-1 flex-col items-center rounded-xl py-2 transition hover:-translate-y-0.5"
      style={styles}
    >
      <span className="text-[10px] font-medium" style={{ color: picked ? "rgba(255,255,255,.8)" : c.muted }}>
        {label}
      </span>
      <span className="text-sm font-bold">{odds.toFixed(2)}</span>
    </button>
  );
}
