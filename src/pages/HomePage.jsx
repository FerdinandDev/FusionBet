import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Flame, Star } from "lucide-react";
import { useApp } from "../context/AppContext";
import { useFetch } from "../hooks/useFetch";
import { sportsApi } from "../services/sportsApi";
import { MATCHES } from "../data/mockData";
import Glass from "../components/ui/Glass";
import Badge from "../components/ui/Badge";
import Button from "../components/ui/Button";
import LoadingSkeleton from "../components/ui/LoadingSkeleton";
import MatchCard from "../components/MatchCard";
import Section from "../components/Section";

const LEAGUES = ["Premier League", "La Liga", "NBA", "Serie A", "NHL", "LEC"];

const TESTIMONIALS = [
  { n: "Dara O.",  r: "Frontend Lead",    t: "The bet slip maths is a nice piece of state management. That's the bit I'd ask about in an interview." },
  { n: "Priya M.", r: "Product Designer", t: "Glassmorphism usually reads as decoration. Here the layering actually separates live from settled." },
  { n: "Tom W.",   r: "Recruiter",        t: "Clearly a demo, clearly says so, and still looks like a real product. Rare combination." },
];

export default function HomePage() {
  const { c, toast } = useApp();
  const { data: live, loading } = useFetch(() => sportsApi.getLive(), []);
  const { data: upcoming } = useFetch(() => sportsApi.getUpcoming(), []);
  const [email, setEmail] = useState("");

  return (
    <div className="space-y-16">
      {/* HERO */}
      <motion.section
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
        className="relative overflow-hidden rounded-3xl px-6 py-16 text-center md:px-12 md:py-24"
        style={{
          background: `radial-gradient(120% 100% at 50% 0%, ${c.primary}26, transparent 60%), radial-gradient(90% 90% at 100% 100%, ${c.secondary}26, transparent 60%), ${c.surface}`,
          border: `1px solid ${c.border}`,
        }}
      >
        <Badge hue={c.accent} subtle>
          <Flame size={12} /> 148 markets live right now
        </Badge>

        <h1
          className="mx-auto mt-6 max-w-3xl text-4xl font-black leading-tight tracking-tight md:text-6xl"
          style={{ fontFamily: "Poppins, sans-serif" }}
        >
          Experience the Ultimate <span style={{ color: c.primary }}>Sports Dashboard</span>
        </h1>

        <p className="mx-auto mt-5 max-w-xl text-base" style={{ color: c.muted }}>
          Live scores, ten sports, and every market on one screen. Built as a frontend showcase —
          the interface is real, the money is not.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link to="/live"><Button size="lg">Browse Matches</Button></Link>
          <Link to="/sports"><Button size="lg" variant="ghost">Explore Sports</Button></Link>
        </div>
      </motion.section>

      {/* FEATURED LIVE */}
      <Section title="Featured live events" actionLabel="See all live" actionTo="/live">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {loading
            ? [0, 1, 2].map((i) => <LoadingSkeleton key={i} h={230} />)
            : (live || []).slice(0, 3).map((m) => <MatchCard key={m.id} match={m} />)}
        </div>
      </Section>

      {/* POPULAR LEAGUES */}
      <Section title="Popular leagues">
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
          {LEAGUES.map((l) => (
            <Link key={l} to="/live">
              <Glass hover className="h-full cursor-pointer p-4 text-center">
                <p className="text-sm font-semibold">{l}</p>
                <p className="mt-1 text-xs" style={{ color: c.muted }}>
                  {MATCHES.filter((m) => m.league === l).length} matches
                </p>
              </Glass>
            </Link>
          ))}
        </div>
      </Section>

      {/* TRENDING */}
      <Section title="Trending matches" actionLabel="View results" actionTo="/results">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {(upcoming || []).slice(0, 3).map((m) => <MatchCard key={m.id} match={m} />)}
        </div>
      </Section>

      {/* PROMO BANNER */}
      <section
        className="overflow-hidden rounded-3xl p-8 md:p-12"
        style={{ background: `linear-gradient(120deg, ${c.secondary}, ${c.primary})` }}
      >
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <h2 className="text-2xl font-black text-white md:text-3xl" style={{ fontFamily: "Poppins, sans-serif" }}>
              Every market. One dashboard.
            </h2>
            <p className="mt-2 max-w-md text-sm text-white opacity-90">
              Ten sports, live timelines, and a bet slip that does the maths — without ever taking a stake.
            </p>
          </div>
          <Link to="/promotions" className="shrink-0">
            <Button size="lg" variant="ghost">
              <span style={{ color: "#fff" }}>See the demo offers</span>
            </Button>
          </Link>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <Section title="What people say">
        <div className="grid gap-4 md:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <Glass key={t.n} className="p-6">
              <div className="mb-3 flex gap-0.5" aria-label="Five stars">
                {[0, 1, 2, 3, 4].map((i) => (
                  <Star key={i} size={13} fill={c.accent} style={{ color: c.accent }} />
                ))}
              </div>
              <p className="text-sm leading-relaxed">{t.t}</p>
              <p className="mt-4 text-xs font-semibold">{t.n}</p>
              <p className="text-xs" style={{ color: c.muted }}>{t.r}</p>
            </Glass>
          ))}
        </div>
      </Section>

      {/* NEWSLETTER */}
      <Glass className="p-8 text-center md:p-12">
        <h2 className="text-2xl font-black" style={{ fontFamily: "Poppins, sans-serif" }}>
          Get the Monday rundown
        </h2>
        <p className="mx-auto mt-2 max-w-md text-sm" style={{ color: c.muted }}>
          Fixtures, form, and the week's biggest games. No email is actually sent — this form is a UI demo.
        </p>
        <div className="mx-auto mt-6 flex max-w-md flex-col gap-3 sm:flex-row">
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            aria-label="Email address"
            className="flex-1 rounded-xl px-4 py-3 text-sm outline-none"
            style={{ background: c.surfaceAlt, border: `1px solid ${c.border}`, color: c.text }}
          />
          <Button
            onClick={() => {
              const valid = email.includes("@");
              toast(
                valid ? "Subscribed (not really — demo)" : "That's not an email address",
                valid ? c.primary : c.danger
              );
              setEmail("");
            }}
          >
            Subscribe
          </Button>
        </div>
      </Glass>
    </div>
  );
}
