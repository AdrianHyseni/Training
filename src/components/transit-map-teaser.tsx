const LINE_ORDER = [
  "enterprise-integration",
  "mulesoft",
  "cloud-integration",
  "sap-btp",
  "data-engineering",
  "data-engineering-cloud",
  "postgresql",
  "implementation-engineer",
  "forward-deployed",
  "ai-engineer",
  "anthropic-training",
] as const;

const WIDTH = 1200;
const HEIGHT = 260;
const HUB_X = WIDTH / 2;
const HUB_Y = HEIGHT / 2;
const MARGIN = 24;

function laneY(index: number, count: number) {
  const step = (HEIGHT - MARGIN * 2) / (count - 1);
  return MARGIN + step * index;
}

/**
 * A decorative, schematic preview of the transit-map concept: every line
 * converges on one interchange hub. It's illustrative only — the real,
 * data-driven pannable map (with per-module stations) lands in M2.
 */
export function TransitMapTeaser() {
  const count = LINE_ORDER.length;

  return (
    <svg
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      className="h-auto w-full"
      role="img"
      aria-label="Schematic preview: every line on the map converges at one central interchange"
    >
      {LINE_ORDER.map((id, i) => {
        const yStart = laneY(i, count);
        const yEnd = laneY(count - 1 - i, count);
        const stroke = `rgb(var(--line-${id}))`;
        const d = `M 0 ${yStart} C ${WIDTH * 0.25} ${yStart}, ${WIDTH * 0.4} ${HUB_Y}, ${HUB_X} ${HUB_Y} S ${WIDTH * 0.75} ${yEnd}, ${WIDTH} ${yEnd}`;
        return (
          <g key={id}>
            <path d={d} fill="none" stroke={stroke} strokeWidth={3} strokeLinecap="round" opacity={0.85} />
            <circle cx={0} cy={yStart} r={4} fill={stroke} />
            <circle cx={WIDTH} cy={yEnd} r={4} fill={stroke} />
          </g>
        );
      })}
      <circle cx={HUB_X} cy={HUB_Y} r={9} fill="rgb(var(--color-bg))" stroke="rgb(var(--color-text))" strokeWidth={2} />
      <circle cx={HUB_X} cy={HUB_Y} r={3.5} fill="rgb(var(--color-text))" />
    </svg>
  );
}
