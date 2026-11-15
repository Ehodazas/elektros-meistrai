import { useEffect, useRef, useState } from "react";
import { stagger } from "../lib/stagger.ts";
import { company, type Stat } from "../data/company.ts";

/** Animated counters. Renders nothing until real numbers are configured in company.ts. */
export default function StatsBand() {
  if (company.stats.length === 0) return null;
  return (
    <section aria-label="Skaičiai" className="border-b border-line bg-white">
      <ul className="wrap grid grid-cols-2 gap-px py-10 md:grid-cols-4">
        {company.stats.map((s, i) => (
          <li key={s.label} data-reveal style={stagger(i)} className="px-2 py-3 text-center">
            <Counter stat={s} />
            <p className="mt-1 text-sm text-muted">{s.label}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

function Counter({ stat }: { stat: Stat }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const [n, setN] = useState(stat.value);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setN(0);
    let raf = 0;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const start = performance.now();
      const tick = (t: number) => {
        const p = Math.min(1, (t - start) / 1400);
        setN(Math.round(stat.value * (1 - Math.pow(1 - p, 3))));
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    });
    io.observe(el);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, [stat.value]);

  return (
    <p ref={ref} className="font-display text-4xl font-extrabold text-navy tabular-nums sm:text-5xl">
      {n}{stat.suffix}
    </p>
  );
}
