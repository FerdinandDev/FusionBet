import React, { useState } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home, Radio, Trophy, ListChecks, Gift, LayoutDashboard,
  User, Menu, X, Bell, Ticket,
} from "lucide-react";
import { useApp } from "../context/AppContext";
import SearchBar from "./SearchBar";
import ThemeToggle from "./ThemeToggle";

export const NAV = [
  { to: "/",           label: "Home",         icon: Home },
  { to: "/live",       label: "Live Matches", icon: Radio },
  { to: "/sports",     label: "Sports",       icon: Trophy },
  { to: "/results",    label: "Results",      icon: ListChecks },
  { to: "/promotions", label: "Promotions",   icon: Gift },
  { to: "/dashboard",  label: "Dashboard",    icon: LayoutDashboard },
  { to: "/profile",    label: "Profile",      icon: User },
];

export default function Navbar() {
  const { c, slip, notifs } = useApp();
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  return (
    <header
      className="sticky top-0 z-40"
      style={{
        background: c.glass,
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderBottom: `1px solid ${c.border}`,
      }}
    >
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3">
        <Link to="/" className="flex shrink-0 items-center gap-2" aria-label="FusionBet home">
          <span
            className="grid h-9 w-9 place-items-center rounded-xl text-sm font-black text-white"
            style={{
              background: `linear-gradient(135deg, ${c.primary}, ${c.secondary})`,
              boxShadow: `0 0 20px -4px ${c.primary}`,
            }}
          >
            FB
          </span>
          <span className="text-lg font-extrabold tracking-tight" style={{ fontFamily: "Poppins, sans-serif" }}>
            Fusion<span style={{ color: c.primary }}>Bet</span>
          </span>
        </Link>

        <nav className="ml-4 hidden items-center gap-1 lg:flex">
          {NAV.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              end={n.to === "/"}
              className="rounded-lg px-3 py-2 text-sm font-medium transition"
              style={({ isActive }) => ({
                color: isActive ? c.text : c.muted,
                background: isActive ? `${c.primary}22` : "transparent",
              })}
            >
              {n.label}
            </NavLink>
          ))}
        </nav>

        <div className="ml-auto hidden md:block">
          <SearchBar />
        </div>

        <Link to="/dashboard" className="relative ml-auto rounded-lg p-2 md:ml-0" aria-label="Notifications">
          <Bell size={18} style={{ color: c.muted }} />
          {notifs > 0 && (
            <span
              className="absolute right-1 top-1 grid h-4 w-4 place-items-center rounded-full text-[10px] font-bold text-white"
              style={{ background: c.danger }}
            >
              {notifs}
            </span>
          )}
        </Link>

        <ThemeToggle />

        <Link
          to="/bet-slip"
          className="relative rounded-xl px-3 py-2 transition hover:-translate-y-0.5"
          style={{ background: `${c.accent}22`, border: `1px solid ${c.accent}55` }}
          aria-label={`Open bet slip, ${slip.length} selections`}
        >
          <Ticket size={18} style={{ color: c.accent }} />
          {slip.length > 0 && (
            <span
              className="absolute -right-1 -top-1 grid h-5 w-5 place-items-center rounded-full text-[10px] font-bold text-white"
              style={{ background: c.accent }}
            >
              {slip.length}
            </span>
          )}
        </Link>

        <button
          onClick={() => setOpen((o) => !o)}
          className="rounded-lg p-2 lg:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="overflow-hidden lg:hidden"
            style={{ borderTop: `1px solid ${c.border}` }}
          >
            {NAV.map((n) => (
              <NavLink
                key={n.to}
                to={n.to}
                end={n.to === "/"}
                onClick={() => setOpen(false)}
                className="flex w-full items-center gap-3 px-6 py-3.5 text-left text-sm font-medium"
                style={{
                  color: pathname === n.to ? c.primary : c.text,
                  borderBottom: `1px solid ${c.border}`,
                }}
              >
                <n.icon size={16} /> {n.label}
              </NavLink>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
