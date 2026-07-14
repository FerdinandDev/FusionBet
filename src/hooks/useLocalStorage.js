import { useState, useEffect } from "react";

/** Persist a piece of state to localStorage, with a safe fallback. */
export function useLocalStorage(key, initial) {
  const [value, setValue] = useState(() => {
    try {
      const raw = window.localStorage.getItem(key);
      return raw ? JSON.parse(raw) : initial;
    } catch {
      return initial;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      /* quota exceeded or storage disabled — fail quietly */
    }
  }, [key, value]);

  return [value, setValue];
}

export default useLocalStorage;
