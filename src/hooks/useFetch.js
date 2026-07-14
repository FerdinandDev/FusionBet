import { useState, useEffect, useCallback } from "react";

/** Generic async fetcher with loading + error state. */
export function useFetch(fn, deps = []) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const run = useCallback(() => {
    let alive = true;
    setLoading(true);
    setError(null);

    Promise.resolve(fn())
      .then((res) => alive && setData(res))
      .catch((err) => alive && setError(err.message || "Something went wrong"))
      .finally(() => alive && setLoading(false));

    return () => {
      alive = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  useEffect(run, [run]);

  return { data, loading, error, refetch: run };
}

export default useFetch;
