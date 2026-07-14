import React from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { useApp } from "../context/AppContext";

export default function Section({ title, actionLabel, actionTo, children }) {
  const { c } = useApp();

  return (
    <section>
      <div className="mb-5 flex items-end justify-between">
        <h2 className="text-xl font-black md:text-2xl" style={{ fontFamily: "Poppins, sans-serif" }}>
          {title}
        </h2>
        {actionLabel && actionTo && (
          <Link
            to={actionTo}
            className="flex items-center gap-1 text-sm font-semibold transition hover:gap-2"
            style={{ color: c.primary }}
          >
            {actionLabel} <ChevronRight size={14} />
          </Link>
        )}
      </div>
      {children}
    </section>
  );
}
