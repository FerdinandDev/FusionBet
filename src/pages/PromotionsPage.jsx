import React, { useState } from "react";
import { motion } from "framer-motion";
import { useApp } from "../context/AppContext";
import { useFetch } from "../hooks/useFetch";
import { sportsApi } from "../services/sportsApi";
import Glass from "../components/ui/Glass";
import Badge from "../components/ui/Badge";
import Button from "../components/ui/Button";
import Modal from "../components/ui/Modal";
import LoadingSkeleton from "../components/ui/LoadingSkeleton";
import PageHead from "../components/PageHead";

export default function PromotionsPage() {
  const { c } = useApp();
  const { data: promos, loading } = useFetch(() => sportsApi.getPromotions(), []);
  const [open, setOpen] = useState(null);

  return (
    <div className="space-y-6">
      <PageHead title="Promotions" subtitle="Layout studies. Every one of these does nothing." />

      <div className="grid gap-4 md:grid-cols-3">
        {loading
          ? [0, 1, 2].map((i) => <LoadingSkeleton key={i} h={240} />)
          : (promos || []).map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07, duration: 0.35 }}
              >
                <Glass hover className="h-full overflow-hidden p-0">
                  <div className="h-1.5" style={{ background: p.hue }} />
                  <div className="p-6">
                    <Badge hue={c.accent} subtle>{p.tag}</Badge>
                    <h2 className="mt-3 text-lg font-black" style={{ fontFamily: "Poppins, sans-serif" }}>
                      {p.title}
                    </h2>
                    <p className="mt-2 text-sm leading-relaxed" style={{ color: c.muted }}>
                      {p.body}
                    </p>
                    <Button variant="ghost" size="sm" className="mt-5 w-full" onClick={() => setOpen(p)}>
                      Read the terms
                    </Button>
                  </div>
                </Glass>
              </motion.div>
            ))}
      </div>

      <Modal open={Boolean(open)} onClose={() => setOpen(null)} title={open?.title || ""}>
        There are no terms, because there is no offer. This card exists to demonstrate a modal, a
        badge, and a gradient border in a portfolio project. No bonus, no deposit, no funds of any
        kind change hands here.
      </Modal>
    </div>
  );
}
