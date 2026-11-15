import type { CSSProperties } from "react";

/** Stagger index for `data-reveal` elements (delay = i × 90 ms). */
export const stagger = (i: number) => ({ "--i": i }) as CSSProperties;
