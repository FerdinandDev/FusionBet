import React from "react";
import { useApp } from "../../context/AppContext";

const PADS = {
  sm: "px-3 py-1.5 text-xs",
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3.5 text-base",
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  disabled,
  ...rest
}) {
  const { c } = useApp();

  const variants = {
    primary:   { background: c.primary,   color: "#fff",  boxShadow: `0 8px 24px -8px ${c.primary}` },
    secondary: { background: c.secondary, color: "#fff",  boxShadow: `0 8px 24px -8px ${c.secondary}` },
    ghost:     { background: "transparent", color: c.text, border: `1px solid ${c.border}` },
    danger:    { background: "transparent", color: c.danger, border: `1px solid ${c.danger}` },
  };

  return (
    <button
      disabled={disabled}
      className={`inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
        disabled ? "" : "hover:-translate-y-0.5 hover:brightness-110 active:translate-y-0"
      } ${PADS[size]} ${className}`}
      style={{
        ...variants[variant],
        fontFamily: "Poppins, Inter, sans-serif",
        opacity: disabled ? 0.45 : 1,
        cursor: disabled ? "not-allowed" : "pointer",
        "--tw-ring-color": c.accent,
        "--tw-ring-offset-color": c.bg,
      }}
      {...rest}
    >
      {children}
    </button>
  );
}
