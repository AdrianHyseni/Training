import Link from "next/link";
import { notFound } from "next/navigation";
import { getLine } from "@/content/lines";
import { listAllModulePaths, loadModule, loadLabIfPresent } from "@/content/loader";
import { ModuleTabs } from "@/components/module/module-tabs";
import { LessonContent } from "@/components/module/lesson-content";
import { ExercisesPanel } from "@/components/module/exercises-panel";
import { FlashcardsPanel } from "@/components/module/flashcards-panel";
import { QuizPanel } from "@/components/module/quiz-panel";
import { GlossaryPanel } from "@/components/module/glossary-panel";

export function generateStaticParams() {
  return listAllModulePaths().map(({ line, moduleId }) => ({ line, module: moduleId }));
}

export default async function ModulePage({ params }: { params: Promise<{ line: string; module: string }> }) {
  const { line: lineId, module: moduleId } = await params;
  const line = getLine(lineId);
  if (!line) notFound();

  let mod;
  try {
    mod = loadModule(lineId, moduleId);
  } catch {
    notFound();
  }

  const lab = loadLabIfPresent(lineId, moduleId);

  return (
    <div>
      <nav className="text-sm text-text-muted" aria-label="Breadcrumb">
        <Link href={`/lines/${line.id}`} className="hover:text-text hover:underline">
          {line.name}
        </Link>
        <span className="mx-1.5">/</span>
        <span>{mod.meta.title}</span>
      </nav>

      <div className="mt-3 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="font-heading text-3xl font-bold">{mod.meta.title}</h1>
          <p className="mt-1 text-sm capitalize text-text-muted">
            {mod.meta.level} · {mod.meta.estimatedMinutes} min · last reviewed {mod.meta.lastReviewed}
          </p>
        </div>
        <span
          className="shrink-0 rounded-full px-3 py-1 font-mono text-xs font-bold text-white"
          style={{ backgroundColor: `rgb(var(--line-${line.id}))` }}
        >
          {line.code}
        </span>
      </div>

      {mod.meta.verify.length > 0 && (
        <div className="mt-4 max-w-3xl rounded-station border border-amber-500/40 bg-amber-500/10 p-4 text-sm">
          <p className="font-semibold">Verify before relying on this in production</p>
          <ul className="mt-1.5 list-disc space-y-1 pl-5 text-text-muted">
            {mod.meta.verify.map((v) => (
              <li key={v.claim}>
                {v.claim} —{" "}
                <a href={v.sourceUrl} className="text-accent underline underline-offset-2" target="_blank" rel="noreferrer">
                  source
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-8">
        <ModuleTabs
          lesson={<LessonContent source={mod.lessonSource} />}
          exercises={<ExercisesPanel exercises={mod.exercises} />}
          flashcards={<FlashcardsPanel cards={mod.cards} />}
          quiz={<QuizPanel quiz={mod.quiz} />}
          lab={lab ? <LessonContent source={lab} /> : undefined}
          glossary={<GlossaryPanel terms={mod.glossary} />}
        />
      </div>
    </div>
  );
}
