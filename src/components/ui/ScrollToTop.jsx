import React from "react";
import { ArrowUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useApp } from "../../context/AppContext";
import { useScrollTop } from "../../hooks/useScrollTop";

export default function ScrollToTop() {
  const { c } = useApp();
  const visible = useScrollTop(400);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 z-40 grid h-11 w-11 place-items-center rounded-xl transition hover:-translate-y-1"
          style={{ background: c.primary, color: "#fff", boxShadow: `0 10px 30px -10px ${c.primary}` }}
          aria-label="Scroll to top"
        >
          <ArrowUp size={18} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
