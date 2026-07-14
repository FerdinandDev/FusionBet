import React from "react";
import { useApp } from "../../context/AppContext";

export default function Pagination({ page, pages, onChange }) {
  const { c } = useApp();
  if (pages <= 1) return null;

  return (
    <nav className="flex items-center justify-center gap-2 pt-2" aria-label="Pagination">
      {Array.from({ length: pages }, (_, i) => i + 1).map((p) => (
        <button
          key={p}
          onClick={() => onChange(p)}
          aria-current={page === p ? "page" : undefined}
          className="h-9 w-9 rounded-xl text-sm font-bold transition hover:-translate-y-0.5"
          style={{
            background: page === p ? c.primary : c.surfaceAlt,
            color: page === p ? "#fff" : c.muted,
            border: `1px solid ${page === p ? c.primary : c.border}`,
          }}
        >
          {p}
        </button>
      ))}
    </nav>
  );
}
