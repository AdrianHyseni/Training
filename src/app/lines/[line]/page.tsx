import Link from "next/link";
import { notFound } from "next/navigation";
import { getLine } from "@/content/lines";
import { listAllModulePaths, listModules, loadModule } from "@/content/loader";

export function generateStaticParams() {
  return Array.from(new Set(listAllModulePaths().map((m) => m.line))).map((line) => ({ line }));
}

export default async function LinePage({ params }: { params: Promise<{ line: string }> }) {
  const { line: lineId } = await params;
  const line = getLine(lineId);
  if (!line) notFound();

  const moduleIds = listModules(lineId);
  const modules = moduleIds.map((moduleId) => loadModule(lineId, moduleId));

  return (
    <div className="space-y-8">
      <div>
        <span
          className="inline-flex h-10 w-10 items-center justify-center rounded-full font-mono text-sm font-bold text-white"
          style={{ backgroundColor: `rgb(var(--line-${line.id}))` }}
        >
          {line.code}
        </span>
        <h1 className="mt-4 font-heading text-3xl font-bold">{line.name}</h1>
        <p className="mt-2 max-w-2xl text-text-muted">{line.tagline}</p>
      </div>

      {modules.length === 0 ? (
        <p className="text-text-muted">No modules published on this line yet.</p>
      ) : (
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {modules.map((mod) => (
            <li key={mod.meta.id} className="rounded-station border border-border bg-surface p-5">
              <Link href={`/lines/${line.id}/${mod.meta.id}`} className="font-heading text-lg font-semibold hover:underline">
                {mod.meta.title}
              </Link>
              <p className="mt-1 text-sm capitalize text-text-muted">
                {mod.meta.level} · {mod.meta.estimatedMinutes} min
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
