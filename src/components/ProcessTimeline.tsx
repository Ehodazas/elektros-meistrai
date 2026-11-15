import { useEffect, useRef, useState, type ComponentType } from "react";

type Step = { icon: ComponentType<{ className?: string }>; title: string; text: string };

/**
 * Process steps on a "wire" that charges up as you scroll through the section; each node
 * lights up when the current reaches it. Horizontal on desktop, vertical on phones.
 * With reduced motion the line is simply full.
 */
export default function ProcessTimeline({ steps }: { steps: Step[] }) {
  const ref = useRef<HTMLOListElement>(null);
  const [p, setP] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setP(1);
      return;
    }
    const update = () => {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // 0 when the list top reaches 85% of the viewport, 1 when its bottom reaches 55%.
      const start = vh * 0.85;
      const end = vh * 0.55;
      const total = r.height + (start - end);
      setP(Math.min(1, Math.max(0, (start - r.top) / total)));
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const n = steps.length;

  return (
    <ol ref={ref} className="relative mt-14 grid gap-10 lg:grid-cols-4 lg:gap-x-0">
      {/* Wire: vertical on phones, horizontal on desktop */}
      <span aria-hidden="true" className="absolute top-2 bottom-2 left-6 w-0.5 bg-line lg:top-6 lg:right-[12.5%] lg:bottom-auto lg:left-[12.5%] lg:h-0.5 lg:w-auto">
        <span
          className="absolute inset-0 origin-top bg-amber shadow-[0_0_12px_rgba(245,184,65,0.8)] lg:hidden"
          style={{ transform: `scaleY(${p})` }}
        />
        <span
          className="absolute inset-0 hidden origin-left bg-amber shadow-[0_0_12px_rgba(245,184,65,0.8)] lg:block"
          style={{ transform: `scaleX(${p})` }}
        />
      </span>

      {steps.map((s, i) => {
        // Node i sits at i/(n-1) along the wire.
        const on = p >= (n === 1 ? 0 : i / (n - 1)) - 0.001 && p > 0;
        return (
          <li key={s.title} className="relative flex gap-5 lg:block lg:px-4 lg:text-center">
            <span
              className={`relative z-10 grid h-12 w-12 shrink-0 place-items-center rounded-full border-2 transition-[background-color,border-color,color,box-shadow] duration-500 lg:mx-auto ${
                on ? "border-amber bg-navy text-amber shadow-[0_0_0_6px_rgba(245,184,65,0.18)]" : "border-line bg-white text-slate-400"
              }`}
              aria-hidden="true"
            >
              <s.icon className="h-5 w-5" />
            </span>
            <div className="lg:mt-6">
              <p className={`font-display text-sm font-bold transition-colors duration-500 ${on ? "text-amber-dark" : "text-slate-400"}`}>
                {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-1 text-lg font-bold">{s.title}</h3>
              <p className="mt-2 text-[0.95rem] text-muted lg:mx-auto lg:max-w-[16rem]">{s.text}</p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
