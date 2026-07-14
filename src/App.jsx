import React, { Suspense, lazy, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import MainLayout from "./layouts/MainLayout";
import LoadingSkeleton from "./components/ui/LoadingSkeleton";

// Code splitting — each route is its own chunk.
const HomePage         = lazy(() => import("./pages/HomePage"));
const LiveMatchesPage  = lazy(() => import("./pages/LiveMatchesPage"));
const SportsPage       = lazy(() => import("./pages/SportsPage"));
const MatchDetailsPage = lazy(() => import("./pages/MatchDetailsPage"));
const BetSlipPage      = lazy(() => import("./pages/BetSlipPage"));
const ResultsPage      = lazy(() => import("./pages/ResultsPage"));
const PromotionsPage   = lazy(() => import("./pages/PromotionsPage"));
const DashboardPage    = lazy(() => import("./pages/DashboardPage"));
const ProfilePage      = lazy(() => import("./pages/ProfilePage"));
const NotFoundPage     = lazy(() => import("./pages/NotFoundPage"));

/** Fades each route in and out on navigation. */
function Page({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.28, ease: [0.2, 0.8, 0.2, 1] }}
    >
      {children}
    </motion.div>
  );
}

function RouteFallback() {
  return (
    <div className="space-y-4">
      <LoadingSkeleton h={60} />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }, (_, i) => <LoadingSkeleton key={i} h={230} />)}
      </div>
    </div>
  );
}

export default function App() {
  const location = useLocation();

  // Scroll to the top on every navigation.
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);

  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route
          path="*"
          element={
            <Suspense fallback={<RouteFallback />}>
              <AnimatePresence mode="wait">
                <Routes location={location} key={location.pathname}>
                  <Route path="/"            element={<Page><HomePage /></Page>} />
                  <Route path="/live"        element={<Page><LiveMatchesPage /></Page>} />
                  <Route path="/sports"      element={<Page><SportsPage /></Page>} />
                  <Route path="/match/:id"   element={<Page><MatchDetailsPage /></Page>} />
                  <Route path="/bet-slip"    element={<Page><BetSlipPage /></Page>} />
                  <Route path="/results"     element={<Page><ResultsPage /></Page>} />
                  <Route path="/promotions"  element={<Page><PromotionsPage /></Page>} />
                  <Route path="/dashboard"   element={<Page><DashboardPage /></Page>} />
                  <Route path="/profile"     element={<Page><ProfilePage /></Page>} />
                  <Route path="*"            element={<Page><NotFoundPage /></Page>} />
                </Routes>
              </AnimatePresence>
            </Suspense>
          }
        />
      </Route>
    </Routes>
  );
}
