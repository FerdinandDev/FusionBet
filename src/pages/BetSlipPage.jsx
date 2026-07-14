import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, Ticket, CircleAlert } from "lucide-react";
import { useApp } from "../context/AppContext";
import Glass from "../components/ui/Glass";
import Button from "../components/ui/Button";
import PageHead from "../components/PageHead";

export default function BetSlipPage() {
  const { c, slip, removeSel, clearSlip, combinedOdds } = useApp();
  const [stake, setStake] = useState(10);

  const estimatedReturn = slip.length ? stake * combinedOdds : 0;

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <PageHead title="Bet Slip" subtitle="A calculator, not a bookmaker" />

      {/* The single most important element on the page. */}
      <div
        className="flex items-start gap-3 rounded-2xl p-4"
        style={{ background: `${c.accent}14`, border: `1px solid ${c.accent}44` }}
      >
        <CircleAlert size={18} style={{ color: c.accent }} className="mt-0.5 shrink-0" />
        <p className="text-sm" style={{ color: c.text }}>
          <b style={{ color: c.accent }}>This slip cannot be placed.</b> There is no wallet, no
          operator, and no settlement behind it. The returns below are arithmetic on mock odds,
          shown to demonstrate the state management — nothing more.
        </p>
      </div>

      {slip.length === 0 ? (
        <Glass className="p-16 text-center">
          <Ticket size={32} style={{ color: c.muted }} className="mx-auto mb-4" />
          <p className="text-lg font-bold">Slip is empty</p>
          <p className="mt-1 text-sm" style={{ color: c.muted }}>
            Tap any odds on a match card to add a selection.
          </p>
          <Link to="/live" className="mt-5 inline-block">
            <Button>Browse matches</Button>
          </Link>
        </Glass>
      ) : (
        <>
          <Glass className="overflow-hidden p-0">
            <AnimatePresence initial={false}>
              {slip.map((s) => (
                <motion.div
                  key={`${s.matchId}-${s.key}`}
                  layout
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex items-center gap-3 p-4"
                  style={{ borderBottom: `1px solid ${c.border}` }}
                >
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-bold">{s.pick}</p>
                    <p className="truncate text-xs" style={{ color: c.muted }}>
                      {s.fixture} · {s.league}
                    </p>
                  </div>
                  <span className="shrink-0 text-sm font-black" style={{ color: c.accent }}>
                    {s.odds.toFixed(2)}
                  </span>
                  <button
                    onClick={() => removeSel(s.matchId, s.key)}
                    aria-label={`Remove ${s.pick}`}
                    className="shrink-0 transition hover:scale-110"
                  >
                    <Trash2 size={15} style={{ color: c.danger }} />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </Glass>

          <Glass className="space-y-4 p-6">
            <div className="flex items-center justify-between gap-4">
              <label htmlFor="stake" className="text-sm font-semibold">Notional stake</label>
              <input
                id="stake"
                type="number"
                min="0"
                value={stake}
                onChange={(e) => setStake(Math.max(0, Number(e.target.value)))}
                className="w-28 rounded-xl px-3 py-2 text-right text-sm font-bold outline-none"
                style={{ background: c.surfaceAlt, border: `1px solid ${c.border}`, color: c.text }}
              />
            </div>

            <div className="flex items-center justify-between text-sm" style={{ color: c.muted }}>
              <span>Selections</span>
              <span className="font-bold" style={{ color: c.text }}>{slip.length}</span>
            </div>

            <div className="flex items-center justify-between text-sm" style={{ color: c.muted }}>
              <span>Combined odds</span>
              <span className="font-bold" style={{ color: c.text }}>{combinedOdds.toFixed(2)}</span>
            </div>

            <div className="flex items-center justify-between border-t pt-4" style={{ borderColor: c.border }}>
              <span className="text-sm font-semibold">Estimated return</span>
              <span
                className="text-2xl font-black"
                style={{ color: c.primary, fontFamily: "Poppins, sans-serif" }}
              >
                {estimatedReturn.toFixed(2)}
              </span>
            </div>

            <div className="flex gap-3">
              <Button variant="danger" className="flex-1" onClick={clearSlip}>Clear all</Button>
              <Button className="flex-1" disabled title="Wagering is disabled by design">
                Placing is disabled
              </Button>
            </div>
          </Glass>
        </>
      )}
    </div>
  );
}
