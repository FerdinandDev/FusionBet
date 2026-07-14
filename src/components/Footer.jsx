import React from "react";
import { useApp } from "../context/AppContext";

const COLUMNS = [
  { h: "Product",    l: ["Live Matches", "Sports", "Results", "Promotions"] },
  { h: "Built with", l: ["React", "Vite", "Tailwind CSS", "Framer Motion"] },
  { h: "Notes",      l: ["Mock data only", "No real wagering", "Demo interface", "Open source"] },
];

export default function Footer() {
  const { c } = useApp();

  return (
    <footer className="mt-24" style={{ borderTop: `1px solid ${c.border}`, background: c.surface }}>
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 md:grid-cols-4">
        <div>
          <p className="text-lg font-extrabold" style={{ fontFamily: "Poppins, sans-serif" }}>
            Fusion<span style={{ color: c.primary }}>Bet</span>
          </p>
          <p className="mt-2 text-xs leading-relaxed" style={{ color: c.muted }}>
            A frontend portfolio project. Not a gambling operator. No accounts, no deposits, no
            wagers — the entire application is mock data behind a real interface.
          </p>
        </div>

        {COLUMNS.map((col) => (
          <div key={col.h}>
            <p className="mb-3 text-xs font-bold uppercase tracking-wider" style={{ color: c.text }}>
              {col.h}
            </p>
            {col.l.map((x) => (
              <p key={x} className="mb-2 text-xs" style={{ color: c.muted }}>
                {x}
              </p>
            ))}
          </div>
        ))}
      </div>

      <div
        className="px-4 py-5 text-center text-xs"
        style={{ borderTop: `1px solid ${c.border}`, color: c.muted }}
      >
        Demo build · If you gamble and it stops being fun, support is available in your region.
      </div>
    </footer>
  );
}
