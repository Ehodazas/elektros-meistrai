import { useEffect, useState } from "react";

/**
 * false during prerender and the first (hydration) render, true afterwards.
 * Use it for UI that depends on things the prerendered HTML can't know, such as
 * the query string, so hydration matches the static markup.
 */
export function useHydrated(): boolean {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);
  return hydrated;
}
