import React from "react";

export default function Badge({ children, hue, subtle }) {
  return (
    <span
      className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold"
      style={{
        background: subtle ? `${hue}1F` : hue,
        color: subtle ? hue : "#fff",
        border: subtle ? `1px solid ${hue}55` : "none",
      }}
    >
      {children}
    </span>
  );
}
