/**
 * Signature edge for dark header sections: a slanted cut into the next section's colour
 * with an amber "wire" running along it, drawn once on load. Purely decorative.
 */
export default function WireEdge({ fill = "var(--color-paper)" }: { fill?: string }) {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-8 sm:h-12 lg:h-16">
      <svg viewBox="0 0 1440 64" preserveAspectRatio="none" className="h-full w-full">
        <polygon points="0,64 1440,6 1440,64" fill={fill} />
        <polyline
          points="0,64 1440,6"
          fill="none"
          stroke="var(--color-amber)"
          strokeWidth="3"
          vectorEffect="non-scaling-stroke"
          pathLength={1}
          className="wire-draw"
        />
      </svg>
    </div>
  );
}
