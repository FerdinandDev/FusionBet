import React, { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { useApp } from "../context/AppContext";
import { useFetch } from "../hooks/useFetch";
import { sportsApi } from "../services/sportsApi";
import Glass from "../components/ui/Glass";
import Button from "../components/ui/Button";
import LoadingSkeleton from "../components/ui/LoadingSkeleton";
import Pagination from "../components/ui/Pagination";
import MatchCard from "../components/MatchCard";
import FilterPanel from "../components/FilterPanel";
import PageHead from "../components/PageHead";

const PER_PAGE = 6;

export default function LiveMatchesPage() {
  const { c } = useApp();
  const [params] = useSearchParams();
  const { data: matches, loading, error, refetch } = useFetch(() => sportsApi.getMatches(), []);

  const [query, setQuery] = useState("");
  const [sport, setSport] = useState(params.get("sport") || "all");
  const [status, setStatus] = useState("all");
  const [page, setPage] = useState(1);

  const all = matches || [];

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return all.filter((m) => {
      if (sport !== "all" && m.sport !== sport) return false;
      if (status !== "all" && m.status !== status) return false;
      if (!q) return true;
      return [m.home, m.away, m.league, m.country].some((v) => v.toLowerCase().includes(q));
    });
  }, [all, query, sport, status]);

  useEffect(() => setPage(1), [query, sport, status]);

  const pages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const shown = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const clearAll = () => {
    setQuery("");
    setSport("all");
    setStatus("all");
  };

  return (
    <div className="space-y-6">
      <PageHead
        title="Live Matches"
        subtitle={`${all.filter((m) => m.status === "live").length} in play · ${all.length} total markets`}
      />

      <FilterPanel
        query={query} setQuery={setQuery}
        sport={sport} setSport={setSport}
        status={status} setStatus={setStatus}
      />

      {error ? (
        <Glass className="p-16 text-center">
          <p className="text-lg font-bold">Couldn't load matches</p>
          <p className="mt-1 text-sm" style={{ color: c.muted }}>{error}</p>
          <Button className="mt-5" onClick={refetch}>Try again</Button>
        </Glass>
      ) : loading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }, (_, i) => <LoadingSkeleton key={i} h={230} />)}
        </div>
      ) : shown.length === 0 ? (
        <Glass className="p-16 text-center">
          <p className="text-lg font-bold">No matches fit that</p>
          <p className="mt-1 text-sm" style={{ color: c.muted }}>
            Try a broader filter — or clear the search.
          </p>
          <Button className="mt-5" variant="ghost" onClick={clearAll}>Clear filters</Button>
        </Glass>
      ) : (
        <>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {shown.map((m, i) => (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05, duration: 0.35, ease: [0.2, 0.8, 0.2, 1] }}
              >
                <MatchCard match={m} />
              </motion.div>
            ))}
          </div>

          <Pagination page={page} pages={pages} onChange={setPage} />
        </>
      )}
    </div>
  );
}
