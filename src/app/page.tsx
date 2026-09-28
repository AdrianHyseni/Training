import { TransitMapTeaser } from "@/components/transit-map-teaser";

type LineStatus = "porting" | "authoring";

interface Line {
  id: string;
  code: string;
  name: string;
  tagline: string;
  status: LineStatus;
  statusLabel: string;
}

const LINES: Line[] = [
  {
    id: "enterprise-integration",
    code: "EI",
    name: "Enterprise Integration",
    tagline: "Patterns, event-driven architecture, API design & governance",
    status: "porting",
    statusLabel: "Porting in M1",
  },
  {
    id: "mulesoft",
    code: "MU",
    name: "MuleSoft",
    tagline: "Developer, architect, DataWeave, CI/CD, Flex Gateway",
    status: "porting",
    statusLabel: "Porting in M1",
  },
  {
    id: "cloud-integration",
    code: "CI",
    name: "Cloud Integration",
    tagline: "AWS & Azure messaging, APIs, orchestration, hybrid connectivity",
    status: "authoring",
    statusLabel: "Authoring — M7 batch 5",
  },
  {
    id: "sap-btp",
    code: "SAP",
    name: "SAP BTP Integration Suite",
    tagline: "iFlows, adapters, API management, S/4HANA integration",
    status: "authoring",
    statusLabel: "Authoring — M7 batch 6",
  },
  {
    id: "data-engineering",
    code: "DE",
    name: "Data Engineering",
    tagline: "Pipelines, streaming, dbt, Spark, Kafka",
    status: "porting",
    statusLabel: "Porting in M1",
  },
  {
    id: "data-engineering-cloud",
    code: "DC",
    name: "Data Engineering on AWS/Azure",
    tagline: "AWS & Azure data stacks, Microsoft Fabric",
    status: "porting",
    statusLabel: "Porting in M1",
  },
  {
    id: "postgresql",
    code: "PG",
    name: "PostgreSQL",
    tagline: "Indexing, internals, replication, pgvector — lab-heavy",
    status: "authoring",
    statusLabel: "Authoring — M7 batch 4",
  },
  {
    id: "implementation-engineer",
    code: "IE",
    name: "Implementation Engineer",
    tagline: "Discovery, migration, cutover, troubleshooting, RCA",
    status: "authoring",
    statusLabel: "Authoring — M7 batch 7",
  },
  {
    id: "forward-deployed",
    code: "FD",
    name: "Forward Deployed Engineer",
    tagline: "GenAI prototyping to production, customer discovery",
    status: "authoring",
    statusLabel: "Authoring — M7 batch 3",
  },
  {
    id: "ai-engineer",
    code: "AI",
    name: "AI Engineer",
    tagline: "LLMs, RAG, agents, MCP, evaluation, LLMOps",
    status: "authoring",
    statusLabel: "Authoring — M7 batch 1",
  },
  {
    id: "anthropic-training",
    code: "AT",
    name: "Anthropic Training",
    tagline: "Claude API, prompt engineering, Claude Code, agents",
    status: "authoring",
    statusLabel: "Authoring — M7 batch 2",
  },
];

const STATS = [
  { value: "11", label: "Lines" },
  { value: "10", label: "Learning paths" },
  { value: "75%", label: "Default pass threshold" },
];

export default function HomePage() {
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
              M0 preview — content and the interactive map land in M1 / M2.
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
          <p className="text-sm text-text-muted">Station data and quizzes arrive with the content engine (M1).</p>
        </div>
        <ul className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {LINES.map((line) => (
            <li
              key={line.id}
              className="group relative overflow-hidden rounded-station border border-border bg-surface p-5 transition hover:-translate-y-0.5 hover:shadow-md"
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
                  <h3 className="font-heading text-base font-semibold leading-snug">{line.name}</h3>
                  <p className="mt-1 text-sm text-text-muted">{line.tagline}</p>
                </div>
              </div>
              <div className="mt-4 flex items-center gap-1.5 text-xs">
                <span
                  aria-hidden="true"
                  className={`h-1.5 w-1.5 rounded-full ${line.status === "porting" ? "bg-accent" : "bg-text-muted"}`}
                />
                <span className="text-text-muted">{line.statusLabel}</span>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
