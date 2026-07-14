import React, { createContext, useContext, useCallback, useMemo } from "react";
import { DARK, LIGHT } from "../styles/theme";
import { useLocalStorage } from "../hooks/useLocalStorage";

const AppContext = createContext(null);

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used inside <AppProvider>");
  return ctx;
};

export function AppProvider({ children }) {
  const [theme, setTheme] = useLocalStorage("fb:theme", "dark");
  const [slip, setSlip] = useLocalStorage("fb:slip", []);
  const [favs, setFavs] = useLocalStorage("fb:favs", []);
  const [recent, setRecent] = useLocalStorage("fb:recent", []);
  const [toasts, setToasts] = React.useState([]);

  const c = theme === "dark" ? DARK : LIGHT;

  const toast = useCallback((msg, hue = "#16A34A") => {
    const id = Date.now() + Math.random();
    setToasts((t) => [...t, { id, msg, hue }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 2600);
  }, []);

  /**
   * Add or toggle a selection.
   * Business rule: one selection per match — the same constraint a real
   * slip enforces, since you can't back both outcomes of one fixture.
   */
  const addSel = useCallback(
    (match, key, label, odds) => {
      setSlip((prev) => {
        const already = prev.some((s) => s.matchId === match.id && s.key === key);
        if (already) {
          return prev.filter((s) => !(s.matchId === match.id && s.key === key));
        }
        const cleaned = prev.filter((s) => s.matchId !== match.id);
        return [
          ...cleaned,
          {
            matchId: match.id,
            key,
            pick: label,
            odds,
            fixture: `${match.home} v ${match.away}`,
            league: match.league,
          },
        ];
      });
      toast(`${label} added \u2014 nothing wagered`, "#F59E0B");
    },
    [setSlip, toast]
  );

  const removeSel = useCallback(
    (matchId, key) =>
      setSlip((p) => p.filter((s) => !(s.matchId === matchId && s.key === key))),
    [setSlip]
  );

  const clearSlip = useCallback(() => {
    setSlip([]);
    toast("Slip cleared", "#EF4444");
  }, [setSlip, toast]);

  const toggleFav = useCallback(
    (id) =>
      setFavs((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id])),
    [setFavs]
  );

  const pushRecent = useCallback(
    (id) => setRecent((p) => [id, ...p.filter((x) => x !== id)].slice(0, 6)),
    [setRecent]
  );

  /** Combined (accumulator) odds — the product of every selection. */
  const combinedOdds = useMemo(
    () => slip.reduce((acc, s) => acc * s.odds, 1),
    [slip]
  );

  const value = {
    c,
    theme,
    setTheme,
    slip,
    addSel,
    removeSel,
    clearSlip,
    combinedOdds,
    favs,
    toggleFav,
    recent,
    pushRecent,
    toasts,
    toast,
    notifs: 3,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export default AppContext;
