/**
 * Decorative installation-diagram traces over the hero photo: thin orthogonal lines are
 * drawn once on load and their junctions appear – no continuous motion afterwards.
 * Hidden on small screens, static under reduced motion (see index.css).
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
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 740 500"
      preserveAspectRatio="xMidYMid slice"
      className="pointer-events-none absolute inset-0 hidden h-full w-full md:block"
      style={{ maskImage: "radial-gradient(ellipse 65% 90% at 70% 50%, black 25%, transparent 80%)" }}
    >
      <g fill="none" stroke="rgba(245,184,65,0.32)" strokeWidth="1.25" strokeLinejoin="round">
        {TRACES.map((d, i) => (
          <path key={i} d={d} pathLength={1} className="wire-draw" style={{ animationDelay: `${0.2 + i * 0.12}s`, animationDuration: "1.2s" }} />
        ))}
      </g>
      <g>
        {NODES.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="3" fill="#101D30" stroke="rgba(245,184,65,0.6)" strokeWidth="1.25"
            className="node-pop" style={{ animationDelay: `${0.9 + i * 0.05}s` }} />
        ))}
      </g>
    </svg>
  );
}
