import React from "react";
import { Link } from "react-router-dom";
import { useApp } from "../context/AppContext";
import Glass from "./ui/Glass";

export default function SportCard({ sport }) {
  const { c } = useApp();

  return (
    <Link to={`/live?sport=${sport.id}`} className="block h-full">
      <Glass hover className="h-full overflow-hidden p-0">
        <div
          className="grid h-24 place-items-center text-4xl"
          style={{ background: `linear-gradient(135deg, ${sport.hue}33, transparent)` }}
          aria-hidden="true"
        >
          {sport.emoji}
        </div>
        <div className="p-4 text-left">
          <p className="text-sm font-bold">{sport.name}</p>
          <p className="text-xs" style={{ color: c.muted }}>{sport.count} markets</p>
        </div>
      </Glass>
    </Link>
  );
}
