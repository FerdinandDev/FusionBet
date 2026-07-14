import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useApp } from "../../context/AppContext";

export default function Toasts() {
  const { toasts, c } = useApp();

  return (
    <div
      className="pointer-events-none fixed bottom-6 left-1/2 z-50 flex w-full max-w-sm -translate-x-1/2 flex-col gap-2 px-4"
      role="status"
      aria-live="polite"
    >
      <AnimatePresence>
        {toasts.map((t) => (
          <motion.div
            key={t.id}
            layout
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            className="flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-medium shadow-xl"
            style={{ background: c.surface, border: `1px solid ${t.hue}66`, color: c.text }}
          >
            <span style={{ color: t.hue }}>&bull;</span>
            {t.msg}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
