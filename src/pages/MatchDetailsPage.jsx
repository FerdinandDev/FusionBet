import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { MapPin, Clock } from "lucide-react";
import { useApp } from "../context/AppContext";
import { useFetch } from "../hooks/useFetch";
import { sportsApi } from "../services/sportsApi";
import { MATCHES, TIMELINE } from "../data/mockData";
import Glass from "../components/ui/Glass";
import Badge from "../components/ui/Badge";
import Button from "../components/ui/Button";
import LoadingSkeleton from "../components/ui/LoadingSkeleton";
import StatusPill from "../components/StatusPill";
import OddsButton from "../components/OddsButton";
import MatchCard from "../components/MatchCard";
import Section from "../components/Section";
import NotFoundPage from "./NotFoundPage";

function StatBar({ label, a, b }) {
  const { c } = useApp();
  const total = a + b || 1;

  return (
    <div className="space-y-1.5">
      <div className="flex justify-between text-xs font-semibold">
        <span>{a}</span>
        <span style={{ color: c.muted }}>{label}</span>
        <span>{b}</span>
      </div>
      <div className="flex h-1.5 overflow-hidden rounded-full" style={{ background: c.surfaceAlt }}>
        <div style={{ width: `${(a / total) * 100}%`, background: c.primary }} />
        <div style={{ width: `${(b / total) * 100}%`, background: c.secondary }} />
      </div>
    </div>
  );
}

export default function MatchDetailsPage() {
  const { id } = useParams();
  const { c, slip, pushRecent } = useApp();
  const { data: m, loading } = useFetch(() => sportsApi.getMatchById(id), [id]);

  useEffect(() => {
    if (m) pushRecent(m.id);
  }, [m, pushRecent]);

  if (loading) {
    return (
      <div className="space-y-6">
        <LoadingSkeleton h={260} />
        <div className="grid gap-6 lg:grid-cols-3">
          <LoadingSkeleton h={320} className="lg:col-span-2" />
          <LoadingSkeleton h={320} />
        </div>
      </div>
    );
  }

  if (!m) return <NotFoundPage />;

  const related = MATCHES.filter((x) => x.sport === m.sport && x.id !== m.id).slice(0, 3);
  const st = m.stats;
  const showTimeline = m.sport === "football" && m.status !== "upcoming";

  return (
    <div className="space-y-6">
      <Link to="/live" className="text-sm font-semibold" style={{ color: c.muted }}>
        ← Back to matches
      </Link>

      <Glass className="overflow-hidden p-0">
        <div
          className="p-8 text-center"
          style={{ background: `radial-gradient(100% 100% at 50% 0%, ${c.primary}22, transparent)` }}
        >
          <Badge hue={c.secondary} subtle>{m.league} · {m.country}</Badge>

          <div className="mt-6 flex items-center justify-center gap-6 md:gap-12">
            <p className="flex-1 text-right text-lg font-black md:text-2xl" style={{ fontFamily: "Poppins, sans-serif" }}>
              {m.home}
            </p>

            <div className="shrink-0">
              {m.hs !== null && m.hs !== undefined ? (
                <p className="text-4xl font-black md:text-5xl" style={{ color: c.primary, fontFamily: "Poppins, sans-serif" }}>
                  {m.hs} – {m.as}
                </p>
              ) : (
                <p className="text-2xl font-black" style={{ color: c.muted }}>vs</p>
              )}
              <div className="mt-2 flex justify-center">
                <StatusPill match={m} />
              </div>
            </div>

            <p className="flex-1 text-left text-lg font-black md:text-2xl" style={{ fontFamily: "Poppins, sans-serif" }}>
              {m.away}
            </p>
          </div>

          <div className="mt-6 flex flex-wrap justify-center gap-4 text-xs" style={{ color: c.muted }}>
            <span className="flex items-center gap-1"><MapPin size={12} /> {m.venue}</span>
            <span className="flex items-center gap-1"><Clock size={12} /> Kick-off {m.kickoff}</span>
          </div>
        </div>
      </Glass>

      <div className="grid gap-6 lg:grid-cols-3">
        <Glass className="p-6 lg:col-span-2">
          <h2 className="mb-5 text-sm font-bold uppercase tracking-wider" style={{ color: c.muted }}>
            Match statistics
          </h2>
          <div className="space-y-4">
            <StatBar label="Possession %" a={st.possession[0]} b={st.possession[1]} />
            <StatBar label="Shots"        a={st.shots[0]}      b={st.shots[1]} />
            <StatBar label="Corners"      a={st.corners[0]}    b={st.corners[1]} />
            <StatBar label="Cards"        a={st.cards[0]}      b={st.cards[1]} />
          </div>

          {showTimeline && (
            <>
              <h2 className="mb-4 mt-8 text-sm font-bold uppercase tracking-wider" style={{ color: c.muted }}>
                Timeline
              </h2>
              <ol className="space-y-3">
                {TIMELINE.map((t, i) => (
                  <li key={i} className="flex gap-4">
                    <span className="w-9 shrink-0 text-xs font-bold" style={{ color: c.accent }}>{t.min}'</span>
                    <span className="shrink-0" aria-hidden="true">{t.type === "goal" ? "⚽" : "🟨"}</span>
                    <span className="text-sm">{t.text}</span>
                  </li>
                ))}
              </ol>
            </>
          )}
        </Glass>

        <Glass className="p-6">
          <h2 className="mb-1 text-sm font-bold uppercase tracking-wider" style={{ color: c.muted }}>
            Available odds
          </h2>
          <p className="mb-5 text-xs" style={{ color: c.accent }}>
            Display only — adding to the slip never places a wager.
          </p>

          <div className="space-y-2">
            {Object.entries(m.odds).map(([market, value]) => {
              const label = market === "home" ? m.home : market === "away" ? m.away : "Draw";
              return (
                <OddsButton key={market} match={m} market={market} label={label} odds={value} block />
              );
            })}
          </div>

          <Link to="/bet-slip" className="mt-5 block">
            <Button variant="ghost" className="w-full">
              Open bet slip ({slip.length})
            </Button>
          </Link>
        </Glass>
      </div>

      <Section title="Related matches">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((r) => <MatchCard key={r.id} match={r} />)}
        </div>
      </Section>
    </div>
  );
}
