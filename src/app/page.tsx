const LINES = [
  { id: "enterprise-integration", name: "Enterprise Integration" },
  { id: "mulesoft", name: "MuleSoft" },
  { id: "cloud-integration", name: "Cloud Integration (AWS/Azure)" },
  { id: "sap-btp", name: "SAP BTP Integration Suite" },
  { id: "data-engineering", name: "Data Engineering" },
  { id: "data-engineering-cloud", name: "Data Engineering on AWS/Azure" },
  { id: "postgresql", name: "PostgreSQL" },
  { id: "implementation-engineer", name: "Implementation Engineer" },
  { id: "forward-deployed", name: "Forward Deployed Engineer" },
  { id: "ai-engineer", name: "AI Engineer" },
  { id: "anthropic-training", name: "Anthropic Training" },
] as const;

export default function HomePage() {
  return (
    <div className="space-y-8">
      <section>
        <h1 className="font-heading text-3xl font-bold">The transit map</h1>
        <p className="mt-2 max-w-2xl text-text-muted">
          Each line below is a topic. Stations become modules once the content engine lands in M1 — this is the
          foundation milestone: layout shell, design tokens, and infrastructure.
        </p>
      </section>
      <section aria-label="Lines" className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {LINES.map((line) => (
          <div
            key={line.id}
            className="rounded-station border border-border bg-surface p-4"
            style={{ borderLeftColor: `rgb(var(--line-${line.id}))`, borderLeftWidth: 4 }}
          >
            <h2 className="font-heading text-base font-semibold">{line.name}</h2>
            <p className="mt-1 text-sm text-text-muted">Modules coming in M1 / M7.</p>
          </div>
        ))}
      </section>
    </div>
  );
}
