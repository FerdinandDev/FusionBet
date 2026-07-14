import React from "react";
import { Sun, Moon } from "lucide-react";
import { useApp } from "../context/AppContext";

export default function ThemeToggle() {
  const { c, theme, setTheme } = useApp();
  const dark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(dark ? "light" : "dark")}
      className="rounded-lg p-2 transition hover:brightness-125"
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {dark ? <Sun size={18} style={{ color: c.accent }} /> : <Moon size={18} style={{ color: c.secondary }} />}
    </button>
  );
}
