import React from "react";
import { useApp } from "../../context/AppContext";

export default function LoadingSkeleton({ h = 100, className = "" }) {
  const { c } = useApp();
  return (
    <div
      className={`animate-pulse rounded-2xl ${className}`}
      style={{ height: h, background: c.surfaceAlt, border: `1px solid ${c.border}` }}
      aria-hidden="true"
    />
  );
}
