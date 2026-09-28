import Link from "next/link";
import { TransitMapTeaser } from "@/components/transit-map-teaser";
import { LINES } from "@/content/lines";
import { listModules } from "@/content/loader";

const STATS = [
  { value: "11", label: "Lines" },
  { value: "10", label: "Learning paths" },
  { value: "75%", label: "Default pass threshold" },
];

export default function HomePage() {
  const moduleCounts = Object.fromEntries(LINES.map((line) => [line.id, listModules(line.id).length]));
  const publishedCount = Object.values(moduleCounts).filter((c) => c > 0).length;

  return (
    <div className="space-y-16 sm:space-y-20">
      <section className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-center">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">Interchange</p>
          <h1 className="mt-3 text-balance font-heading text-4xl font-bold leading-[1.1] sm:text-5xl">
            Learn integration and AI engineering like a transit map.
          </h1>
          <p className="mt-4 max-w-xl text-pretty text-base text-text-muted sm:text-lg">
            Eleven lines, from Enterprise Integration and MuleSoft through SAP BTP, cloud integration, data
            engineering, PostgreSQL, and AI engineering. Every module is a station. Pass its quiz, and the station
            fills in.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#lines"
              className="rounded-station bg-accent px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:brightness-110"
            >
              Browse the lines
            </a>
            <span className="text-sm text-text-muted">
              {publishedCount} of {LINES.length} lines have a published module — the rest arrive with M7.
            </span>
          </div>
        </div>
        <div className="rounded-station border border-border bg-surface p-4 sm:p-6" aria-hidden="true">
          <TransitMapTeaser />
        </div>
      </section>

      <section aria-label="At a glance" className="grid grid-cols-3 divide-x divide-border rounded-station border border-border bg-surface">
        {STATS.map((stat) => (
          <div key={stat.label} className="px-4 py-5 text-center sm:px-6">
            <div className="font-heading text-2xl font-bold sm:text-3xl">{stat.value}</div>
            <div className="mt-1 text-xs text-text-muted sm:text-sm">{stat.label}</div>
          </div>
        ))}
      </section>

      <section id="lines" className="scroll-mt-20">
        <div className="flex items-baseline justify-between gap-4">
          <h2 className="font-heading text-2xl font-bold">All lines</h2>
          <p className="text-sm text-text-muted">Click a line to open its published module, quiz, and flashcards.</p>
        </div>
        <ul className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {LINES.map((line) => {
            const count = moduleCounts[line.id] ?? 0;
            return (
              <li key={line.id}>
                <Link
                  href={`/lines/${line.id}`}
                  className="group relative block overflow-hidden rounded-station border border-border bg-surface p-5 transition hover:-translate-y-0.5 hover:shadow-md"
                >
                  <span
                    aria-hidden="true"
                    className="absolute inset-y-0 left-0 w-1"
                    style={{ backgroundColor: `rgb(var(--line-${line.id}))` }}
                  />
                  <div className="flex items-start gap-3">
                    <span
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full font-mono text-xs font-bold text-white"
                      style={{ backgroundColor: `rgb(var(--line-${line.id}))` }}
                      aria-hidden="true"
                    >
                      {line.code}
                    </span>
                    <div className="min-w-0">
                      <h3 className="font-heading text-base font-semibold leading-snug group-hover:underline">
                        {line.name}
                      </h3>
                      <p className="mt-1 text-sm text-text-muted">{line.tagline}</p>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center gap-1.5 text-xs">
                    <span
                      aria-hidden="true"
                      className={`h-1.5 w-1.5 rounded-full ${count > 0 ? "bg-emerald-500" : "bg-text-muted"}`}
                    />
                    <span className="text-text-muted">
                      {count > 0 ? `${count} module${count === 1 ? "" : "s"} published` : line.statusLabel}
                    </span>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}
