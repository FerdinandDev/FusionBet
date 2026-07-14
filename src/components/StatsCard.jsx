import React from "react";
import { useApp } from "../context/AppContext";
import Glass from "./ui/Glass";

export default function StatsCard({ icon: Icon, label, value, hue }) {
  const { c } = useApp();

  return (
    <Glass hover className="p-5">
      <Icon size={18} style={{ color: hue }} />
      <p className="mt-3 text-3xl font-black" style={{ fontFamily: "Poppins, sans-serif" }}>
        {value}
      </p>
      <p className="text-xs" style={{ color: c.muted }}>{label}</p>
    </Glass>
  );
}
