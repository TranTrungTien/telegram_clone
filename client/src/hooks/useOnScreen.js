import { useState, useEffect } from "react";

export function useOnScreen(ref) {
  const [isIntersecting, setIntersecting] = useState(false);
  useEffect(() => {
    let refLocal = null;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIntersecting(entry.isIntersecting);
      },
      {
        rootMargin: "0px",
        threshold: 0,
      }
    );
    if (ref.current) {
      observer.observe(ref.current);
      refLocal = ref.current;
    }
    return () => {
      observer.unobserve(refLocal);
    };
  }, [ref]);
  return isIntersecting;
}
