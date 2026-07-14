import React from "react";
import { motion } from "framer-motion";
import { Heart, Star, TrendingUp, Bell } from "lucide-react";
import {
  BarChart, Bar, PieChart, Pie, Cell,
  ResponsiveContainer, XAxis, YAxis, Tooltip,
} from "recharts";
import { useApp } from "../context/AppContext";
import { SPORTS, MATCHES, WEEKLY_VIEWS } from "../data/mockData";
import Glass from "../components/ui/Glass";
import StatsCard from "../components/StatsCard";
import PageHead from "../components/PageHead";

export default function DashboardPage() {
  const { c, favs, recent } = useApp();

  const followed = SPORTS.slice(0, 5).map((s) => ({ name: s.name, value: s.count, hue: s.hue }));
  const upcoming = MATCHES.filter((m) => m.status === "upcoming").slice(0, 4);

  const cards = [
    { label: "Favourite teams", value: favs.length,   icon: Heart,      hue: c.danger },
    { label: "Saved matches",   value: favs.length,   icon: Star,       hue: c.accent },
    { label: "Recently viewed", value: recent.length, icon: TrendingUp, hue: c.primary },
    { label: "Notifications",   value: 3,             icon: Bell,       hue: c.secondary },
  ];

  const tooltipStyle = {
    background: c.surface,
    border: `1px solid ${c.border}`,
    borderRadius: 12,
    color: c.text,
  };

  return (
    <div className="space-y-6">
      <PageHead
        title="Dashboard"
        subtitle="Mock analytics — the charts are wired, the numbers are invented"
      />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {cards.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05, duration: 0.35 }}
          >
            <StatsCard icon={s.icon} label={s.label} value={s.value} hue={s.hue} />
          </motion.div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Glass className="p-6">
          <h2 className="mb-5 text-sm font-bold uppercase tracking-wider" style={{ color: c.muted }}>
            Matches viewed this week
          </h2>
          <div style={{ height: 220 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={WEEKLY_VIEWS}>
                <XAxis dataKey="name" stroke={c.muted} fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke={c.muted} fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={tooltipStyle} cursor={{ fill: `${c.primary}11` }} />
                <Bar dataKey="v" name="Matches" fill={c.primary} radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Glass>

        <Glass className="p-6">
          <h2 className="mb-5 text-sm font-bold uppercase tracking-wider" style={{ color: c.muted }}>
            Sports followed
          </h2>
          <div style={{ height: 220 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={followed} dataKey="value" nameKey="name" innerRadius={50} outerRadius={80} paddingAngle={3}>
                  {followed.map((f) => <Cell key={f.name} fill={f.hue} stroke="none" />)}
                </Pie>
                <Tooltip contentStyle={tooltipStyle} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {followed.map((f) => (
              <span key={f.name} className="flex items-center gap-1.5 text-xs" style={{ color: c.muted }}>
                <span className="h-2 w-2 rounded-full" style={{ background: f.hue }} />
                {f.name}
              </span>
            ))}
          </div>
        </Glass>
      </div>

      <Glass className="p-6">
        <h2 className="mb-4 text-sm font-bold uppercase tracking-wider" style={{ color: c.muted }}>
          Upcoming fixtures
        </h2>
        <ul className="space-y-2">
          {upcoming.map((m) => (
            <li
              key={m.id}
              className="flex items-center justify-between rounded-xl px-4 py-3"
              style={{ background: c.surfaceAlt }}
            >
              <span className="text-sm font-medium">{m.home} v {m.away}</span>
              <span className="text-xs" style={{ color: c.muted }}>{m.kickoff}</span>
            </li>
          ))}
        </ul>
      </Glass>
    </div>
  );
}
