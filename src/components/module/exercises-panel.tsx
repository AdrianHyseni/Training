"use client";

import { useState } from "react";
import type { Exercise } from "@/content/schema";

export function ExercisesPanel({ exercises }: { exercises: Exercise[] }) {
  return (
    <div className="space-y-8">
      {exercises.map((ex, i) => (
        <ExerciseCard key={ex.id} exercise={ex} index={i} />
      ))}
    </div>
  );
}

function ExerciseCard({ exercise, index }: { exercise: Exercise; index: number }) {
  const [revealed, setRevealed] = useState(false);
  const [answer, setAnswer] = useState("");
  const totalPoints = exercise.rubric.reduce((sum, r) => sum + r.points, 0);

  return (
    <div className="rounded-station border border-border bg-surface p-5">
      <p className="font-heading text-base font-semibold">
        Exercise {index + 1}: {exercise.prompt}
      </p>

      <textarea
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        rows={6}
        placeholder="Sketch your design here…"
        className="mt-4 w-full rounded-station border border-border bg-surface-raised p-3 text-sm"
      />

      <div className="mt-3 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => setRevealed((r) => !r)}
          className="rounded-station border border-border px-4 py-2 text-sm font-medium transition hover:bg-surface-raised"
        >
          {revealed ? "Hide model answer" : "Reveal model answer"}
        </button>
        <span className="text-xs text-text-muted">
          Rubric: {totalPoints} point{totalPoints === 1 ? "" : "s"} · AI feedback against this rubric lands in M4
        </span>
      </div>

      {revealed && (
        <div className="mt-4 space-y-4">
          <div className="rounded-station border border-border bg-surface-raised p-4">
            <p className="font-heading text-sm font-semibold">Model answer</p>
            <div className="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-text-muted">
              {exercise.modelAnswer}
            </div>
          </div>
          <div className="rounded-station border border-border bg-surface-raised p-4">
            <p className="font-heading text-sm font-semibold">Rubric</p>
            <ul className="mt-2 space-y-1 text-sm text-text-muted">
              {exercise.rubric.map((r, i) => (
                <li key={i} className="flex justify-between gap-4">
                  <span>{r.criterion}</span>
                  <span className="shrink-0 font-mono text-xs">{r.points} pt</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
