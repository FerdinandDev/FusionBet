import React from "react";
import { motion } from "framer-motion";
import { useFetch } from "../hooks/useFetch";
import { sportsApi } from "../services/sportsApi";
import LoadingSkeleton from "../components/ui/LoadingSkeleton";
import SportCard from "../components/SportCard";
import PageHead from "../components/PageHead";

export default function SportsPage() {
  const { data: sports, loading } = useFetch(() => sportsApi.getSports(), []);
  const total = (sports || []).reduce((sum, s) => sum + s.count, 0);

  return (
    <div className="space-y-6">
      <PageHead title="Sports" subtitle={`Ten categories, ${total} markets across them`} />

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
        {loading
          ? Array.from({ length: 10 }, (_, i) => <LoadingSkeleton key={i} h={170} />)
          : (sports || []).map((s, i) => (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04, duration: 0.35 }}
              >
                <SportCard sport={s} />
              </motion.div>
            ))}
      </div>
    </div>
  );
}
