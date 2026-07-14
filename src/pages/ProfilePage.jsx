import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { useApp } from "../context/AppContext";
import { SPORTS, MATCHES } from "../data/mockData";
import Glass from "../components/ui/Glass";
import Badge from "../components/ui/Badge";
import PageHead from "../components/PageHead";

export default function ProfilePage() {
  const { c, theme, setTheme, favs, toast } = useApp();
  const [prefs, setPrefs] = useState({ goals: true, kickoff: true, results: false });

  const saved = MATCHES.filter((m) => favs.includes(m.id));

  return (
    <div className="space-y-6">
      <PageHead
        title="Profile"
        subtitle="Preferences persist to localStorage — no account, no server"
      />

      <Glass className="flex flex-col items-center gap-5 p-8 sm:flex-row sm:items-start">
        <div
          className="grid h-20 w-20 shrink-0 place-items-center rounded-2xl text-2xl font-black text-white"
          style={{ background: `linear-gradient(135deg, ${c.primary}, ${c.secondary})` }}
          aria-hidden="true"
        >
          JD
        </div>
        <div className="flex-1 text-center sm:text-left">
          <h2 className="text-xl font-black" style={{ fontFamily: "Poppins, sans-serif" }}>demo_user</h2>
          <p className="text-sm" style={{ color: c.muted }}>
            Following 4 sports · {favs.length} saved matches
          </p>
          <div className="mt-3 flex flex-wrap justify-center gap-2 sm:justify-start">
            {SPORTS.slice(0, 4).map((s) => (
              <Badge key={s.id} hue={s.hue} subtle>{s.emoji} {s.name}</Badge>
            ))}
          </div>
        </div>
      </Glass>

      <div className="grid gap-6 md:grid-cols-2">
        <Glass className="p-6">
          <h2 className="mb-4 text-sm font-bold uppercase tracking-wider" style={{ color: c.muted }}>
            Theme
          </h2>
          <div className="flex gap-3">
            {["dark", "light"].map((t) => (
              <button
                key={t}
                onClick={() => setTheme(t)}
                aria-pressed={theme === t}
                className="flex-1 rounded-xl py-3 text-sm font-semibold capitalize transition"
                style={{
                  background: theme === t ? c.primary : c.surfaceAlt,
                  color: theme === t ? "#fff" : c.muted,
                  border: `1px solid ${theme === t ? c.primary : c.border}`,
                }}
              >
                {t}
              </button>
            ))}
          </div>

          <h2 className="mb-4 mt-8 text-sm font-bold uppercase tracking-wider" style={{ color: c.muted }}>
            Notifications
          </h2>
          <div className="space-y-2">
            {Object.entries(prefs).map(([key, on]) => (
              <button
                key={key}
                role="switch"
                aria-checked={on}
                onClick={() => {
                  setPrefs({ ...prefs, [key]: !on });
                  toast(`${key} alerts ${!on ? "on" : "off"}`, c.secondary);
                }}
                className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-sm"
                style={{ background: c.surfaceAlt, border: `1px solid ${c.border}` }}
              >
                <span className="capitalize">{key}</span>
                <span
                  className="relative h-5 w-9 rounded-full transition"
                  style={{ background: on ? c.primary : c.border }}
                >
                  <span
                    className="absolute top-0.5 h-4 w-4 rounded-full bg-white transition-all"
                    style={{ left: on ? 18 : 2 }}
                  />
                </span>
              </button>
            ))}
          </div>
        </Glass>

        <Glass className="p-6">
          <h2 className="mb-4 text-sm font-bold uppercase tracking-wider" style={{ color: c.muted }}>
            Saved matches
          </h2>

          {saved.length === 0 ? (
            <p className="py-12 text-center text-sm" style={{ color: c.muted }}>
              Nothing saved. Tap the heart on any match card.
            </p>
          ) : (
            <ul className="space-y-2">
              {saved.map((m) => (
                <li key={m.id}>
                  <Link
                    to={`/match/${m.id}`}
                    className="flex items-center justify-between rounded-xl px-4 py-3 transition hover:brightness-125"
                    style={{ background: c.surfaceAlt }}
                  >
                    <span className="text-sm font-medium">{m.home} v {m.away}</span>
                    <Heart size={14} fill={c.danger} style={{ color: c.danger }} />
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </Glass>
      </div>
    </div>
  );
}
