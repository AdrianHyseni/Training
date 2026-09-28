import type { GlossaryTerm } from "@/content/schema";

export function GlossaryPanel({ terms }: { terms: GlossaryTerm[] }) {
  return (
    <dl className="max-w-3xl divide-y divide-border rounded-station border border-border">
      {terms.map((t) => (
        <div key={t.term} className="p-4">
          <dt className="font-heading font-semibold">{t.term}</dt>
          <dd className="mt-1 text-sm text-text-muted">{t.definition}</dd>
        </div>
      ))}
    </dl>
  );
}
