import React from "react";
import { Clock } from "lucide-react";
import { useApp } from "../context/AppContext";
import Badge from "./ui/Badge";

export default function StatusPill({ match }) {
  const { c } = useApp();

  if (match.status === "live") {
    return (
      <span
        className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold"
        style={{ background: `${c.danger}22`, color: c.danger, border: `1px solid ${c.danger}55` }}
      >
        <span className="h-1.5 w-1.5 animate-ping rounded-full" style={{ background: c.danger }} />
        LIVE {match.minute ? `${match.minute}'` : match.quarter}
      </span>
    );
  }

  if (match.status === "finished") {
    return <Badge hue={c.muted} subtle>Full time</Badge>;
  }

  return (
    <Badge hue={c.secondary} subtle>
      <Clock size={11} /> {match.kickoff}
    </Badge>
  );
}
