import { useState, useEffect } from "react";

/** True once the user has scrolled past `threshold` pixels. */
export function useScrollTop(threshold = 400) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > threshold);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return visible;
}

export default useScrollTop;
