import { useEffect, useState } from "react";

/**
 * Decorative circuit traces over the hero: orthogonal "PCB" lines draw themselves on load,
 * then small pulses of current travel along them. Pulses are only mounted after hydration
 * and when the user hasn't asked for reduced motion.
 */
const TRACES = [
  "M-20 120 H180 L220 160 H420 L460 120 H760",
  "M-20 300 H120 L170 350 H360 L400 310 H560 L600 270 H760",
  "M80 520 V420 L130 370 H300 L340 410 H520 L560 450 V520",
  "M640 -20 V80 L600 120 V230 L640 270 V400",
  "M300 -20 V60 L340 100 H500",
];

const NODES: [number, number][] = [
  [220, 160], [420, 160], [170, 350], [360, 350], [560, 310], [130, 370], [340, 410], [600, 120], [640, 270], [500, 100],
];

export default function HeroCircuit() {
  const [pulses, setPulses] = useState(false);

  useEffect(() => {
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) setPulses(true);
  }, []);

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 740 500"
      preserveAspectRatio="xMidYMid slice"
      className="pointer-events-none absolute inset-0 hidden h-full w-full md:block"
      style={{ maskImage: "radial-gradient(ellipse 65% 90% at 70% 50%, black 25%, transparent 80%)" }}
    >
      <defs>
        <radialGradient id="pulse-glow">
          <stop offset="0%" stopColor="#F5B841" stopOpacity="1" />
          <stop offset="100%" stopColor="#F5B841" stopOpacity="0" />
        </radialGradient>
      </defs>
      <g fill="none" stroke="rgba(245,184,65,0.28)" strokeWidth="1.25" strokeLinejoin="round">
        {TRACES.map((d, i) => (
          <path key={i} id={`trace-${i}`} d={d} pathLength={1} className="wire-draw" style={{ animationDelay: `${0.2 + i * 0.18}s`, animationDuration: "1.8s" }} />
        ))}
      </g>
      <g>
        {NODES.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="3.5" fill="#101D30" stroke="rgba(245,184,65,0.55)" strokeWidth="1.25"
            className="node-pop" style={{ animationDelay: `${1.2 + i * 0.07}s` }} />
        ))}
      </g>
      {pulses && (
        <g>
          {TRACES.map((_, i) => (
            <g key={i} visibility="hidden">
              <set attributeName="visibility" to="visible" begin={`${2 + i * 0.9}s`} />
              <circle r="9" fill="url(#pulse-glow)" opacity="0.7">
                <animateMotion dur={`${3.2 + i * 0.7}s`} begin={`${2 + i * 0.9}s`} repeatCount="indefinite" rotate="auto">
                  <mpath href={`#trace-${i}`} />
                </animateMotion>
              </circle>
              <circle r="2" fill="#FFE3A3">
                <animateMotion dur={`${3.2 + i * 0.7}s`} begin={`${2 + i * 0.9}s`} repeatCount="indefinite">
                  <mpath href={`#trace-${i}`} />
                </animateMotion>
              </circle>
            </g>
          ))}
        </g>
      )}
    </svg>
  );
}
