import React from "react";
import { motion } from "framer-motion";
import { Trophy } from "lucide-react";
import { useApp } from "../context/AppContext";
import { useFetch } from "../hooks/useFetch";
import { sportsApi } from "../services/sportsApi";
import Glass from "../components/ui/Glass";
import Badge from "../components/ui/Badge";
import LoadingSkeleton from "../components/ui/LoadingSkeleton";
import PageHead from "../components/PageHead";

export default function ResultsPage() {
  const { c } = useApp();
  const { data: results, loading } = useFetch(() => sportsApi.getResults(), []);
  const done = results || [];

  return (
    <div className="space-y-6">
      <PageHead title="Results" subtitle={`${done.length} matches settled`} />

      <div className="space-y-3">
        {loading
          ? Array.from({ length: 4 }, (_, i) => <LoadingSkeleton key={i} h={110} />)
          : done.map((m, i) => {
              const winner = m.hs > m.as ? m.home : m.as > m.hs ? m.away : "Draw";
              return (
                <motion.div
                  key={m.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.35 }}
                >
                  <Glass hover className="p-5">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <div>
                        <p className="text-xs" style={{ color: c.muted }}>
                          {m.league} · {m.country}
                        </p>
                        <p className="mt-1 text-base font-bold">
                          {m.home} <span style={{ color: c.muted }}>v</span> {m.away}
                        </p>
                      </div>

                      <div className="text-center">
                        <p className="text-2xl font-black" style={{ fontFamily: "Poppins, sans-serif" }}>
                          {m.hs} – {m.as}
                        </p>
                        <p className="text-xs" style={{ color: c.muted }}>Full time</p>
                      </div>

                      <div className="text-right">
                        <Badge hue={c.primary} subtle>
                          <Trophy size={11} /> {winner}
                        </Badge>
                        <p className="mt-1.5 text-xs" style={{ color: c.muted }}>
                          {m.stats.shots[0]}–{m.stats.shots[1]} shots · {m.stats.possession[0]}% poss.
                        </p>
                      </div>
                    </div>
                  </Glass>
                </motion.div>
              );
            })}
      </div>
    </div>
  );
}
