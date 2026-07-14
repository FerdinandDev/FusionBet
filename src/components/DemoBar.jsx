import React from "react";
import { CircleAlert } from "lucide-react";
import { useApp } from "../context/AppContext";

/**
 * The disclaimer is a design element, not a footnote. It stays pinned above
 * the nav on every page so nobody can mistake this for a live sportsbook.
 */
export default function DemoBar() {
  const { c } = useApp();
  return (
    <div
      className="flex items-center justify-center gap-2 px-4 py-2 text-center text-xs font-semibold"
      style={{ background: `${c.accent}1A`, color: c.accent, borderBottom: `1px solid ${c.accent}33` }}
    >
      <CircleAlert size={14} className="shrink-0" />
      <span>Portfolio demo — no real money, no wagering, no accounts. All odds and scores are mock data.</span>
    </div>
  );
}
