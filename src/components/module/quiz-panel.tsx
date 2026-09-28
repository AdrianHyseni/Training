"use client";

import { useMemo, useState } from "react";
import type { Quiz, QuizQuestion } from "@/content/schema";

type Answer =
  | { type: "single" | "predict"; value: number | null }
  | { type: "multi"; value: number[] }
  | { type: "order"; value: number[] }
  | { type: "match"; value: (number | null)[] }
  | { type: "short"; value: string };

function initialAnswer(q: QuizQuestion): Answer {
  switch (q.type) {
    case "single":
    case "predict":
      return { type: q.type, value: null };
    case "multi":
      return { type: "multi", value: [] };
    case "order":
      return { type: "order", value: q.items.map((_, i) => i) };
    case "match":
      return { type: "match", value: q.left.map(() => null) };
    case "short":
      return { type: "short", value: "" };
  }
}

function isCorrect(q: QuizQuestion, answer: Answer): boolean {
  if (q.type === "single" || q.type === "predict") {
    return answer.type === q.type && answer.value === q.correct;
  }
  if (q.type === "multi" && answer.type === "multi") {
    const a = [...answer.value].sort();
    const b = [...q.correct].sort();
    return a.length === b.length && a.every((v, i) => v === b[i]);
  }
  if (q.type === "order" && answer.type === "order") {
    return answer.value.every((v, i) => v === q.correctOrder[i]);
  }
  if (q.type === "match" && answer.type === "match") {
    return q.correctPairs.every(([l, r]) => answer.value[l] === r);
  }
  return false; // short answer is AI-graded in M4; not auto-scored here
}

export function QuizPanel({ quiz }: { quiz: Quiz }) {
  const [answers, setAnswers] = useState<Record<string, Answer>>(() =>
    Object.fromEntries(quiz.questions.map((q) => [q.id, initialAnswer(q)])),
  );
  const [submitted, setSubmitted] = useState(false);

  const scored = quiz.questions.filter((q) => q.type !== "short");
  const score = useMemo(() => {
    if (!submitted) return 0;
    return scored.filter((q) => isCorrect(q, answers[q.id]!)).length;
  }, [submitted, scored, answers]);
  const pct = scored.length ? score / scored.length : 0;
  const passed = pct >= quiz.passThreshold;

  function setAnswer(id: string, answer: Answer) {
    setAnswers((prev) => ({ ...prev, [id]: answer }));
  }

  return (
    <div className="space-y-8">
      {submitted && (
        <div
          className={`rounded-station border p-4 ${passed ? "border-emerald-500/40 bg-emerald-500/10" : "border-amber-500/40 bg-amber-500/10"}`}
        >
          <p className="font-heading text-lg font-semibold">
            {score} / {scored.length} auto-graded correct ({Math.round(pct * 100)}%)
          </p>
          <p className="mt-1 text-sm text-text-muted">
            Pass threshold is {Math.round(quiz.passThreshold * 100)}%.{" "}
            {passed ? "You passed this station." : "Review the explanations below and try again."}
            {" "}Short-answer questions are graded by the AI tutor once it&rsquo;s wired up (M4) — self-check them against the explanation for now.
          </p>
        </div>
      )}

      {quiz.questions.map((q, qi) => (
        <QuestionCard
          key={q.id}
          index={qi}
          question={q}
          answer={answers[q.id]!}
          onChange={(a) => setAnswer(q.id, a)}
          submitted={submitted}
        />
      ))}

      {!submitted ? (
        <button
          type="button"
          onClick={() => setSubmitted(true)}
          className="rounded-station bg-accent px-5 py-2.5 text-sm font-semibold text-white transition hover:brightness-110"
        >
          Check answers
        </button>
      ) : (
        <button
          type="button"
          onClick={() => {
            setSubmitted(false);
            setAnswers(Object.fromEntries(quiz.questions.map((q) => [q.id, initialAnswer(q)])));
          }}
          className="rounded-station border border-border px-5 py-2.5 text-sm font-semibold transition hover:bg-surface-raised"
        >
          Retake quiz
        </button>
      )}
    </div>
  );
}

function QuestionCard({
  index,
  question,
  answer,
  onChange,
  submitted,
}: {
  index: number;
  question: QuizQuestion;
  answer: Answer;
  onChange: (a: Answer) => void;
  submitted: boolean;
}) {
  const correct = submitted && question.type !== "short" ? isCorrect(question, answer) : null;

  return (
    <div className="rounded-station border border-border bg-surface p-5">
      <p className="font-heading text-base font-semibold">
        {index + 1}. {question.prompt}
      </p>
      {question.type === "predict" && (
        <pre className="mt-3 overflow-x-auto rounded-station border border-border bg-surface-raised p-3 font-mono text-sm">
          <code>{question.code}</code>
        </pre>
      )}

      <div className="mt-4">
        {(question.type === "single" || question.type === "predict") && answer.type === question.type && (
          <div className="space-y-2">
            {question.options.map((opt, oi) => (
              <label key={oi} className="flex cursor-pointer items-center gap-2 text-sm">
                <input
                  type="radio"
                  name={question.id}
                  disabled={submitted}
                  checked={answer.value === oi}
                  onChange={() => onChange({ type: question.type, value: oi })}
                />
                {opt}
              </label>
            ))}
          </div>
        )}

        {question.type === "multi" && answer.type === "multi" && (
          <div className="space-y-2">
            {question.options.map((opt, oi) => (
              <label key={oi} className="flex cursor-pointer items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  disabled={submitted}
                  checked={answer.value.includes(oi)}
                  onChange={(e) =>
                    onChange({
                      type: "multi",
                      value: e.target.checked ? [...answer.value, oi] : answer.value.filter((v) => v !== oi),
                    })
                  }
                />
                {opt}
              </label>
            ))}
          </div>
        )}

        {question.type === "order" && answer.type === "order" && (
          <ol className="space-y-1.5">
            {answer.value.map((itemIndex, position) => (
              <li key={itemIndex} className="flex items-center gap-2 rounded border border-border px-3 py-1.5 text-sm">
                <span className="text-text-muted">{position + 1}.</span>
                <span className="flex-1">{question.items[itemIndex]}</span>
                <button
                  type="button"
                  disabled={submitted || position === 0}
                  onClick={() => {
                    const next = [...answer.value];
                    [next[position - 1], next[position]] = [next[position]!, next[position - 1]!];
                    onChange({ type: "order", value: next });
                  }}
                  className="rounded px-1.5 py-0.5 text-xs hover:bg-surface-raised disabled:opacity-30"
                >
                  ↑
                </button>
                <button
                  type="button"
                  disabled={submitted || position === answer.value.length - 1}
                  onClick={() => {
                    const next = [...answer.value];
                    [next[position], next[position + 1]] = [next[position + 1]!, next[position]!];
                    onChange({ type: "order", value: next });
                  }}
                  className="rounded px-1.5 py-0.5 text-xs hover:bg-surface-raised disabled:opacity-30"
                >
                  ↓
                </button>
              </li>
            ))}
          </ol>
        )}

        {question.type === "match" && answer.type === "match" && (
          <div className="space-y-2">
            {question.left.map((leftItem, li) => (
              <div key={li} className="flex items-center gap-3 text-sm">
                <span className="w-1/2">{leftItem}</span>
                <select
                  disabled={submitted}
                  value={answer.value[li] ?? ""}
                  onChange={(e) => {
                    const next = [...answer.value];
                    next[li] = e.target.value === "" ? null : Number(e.target.value);
                    onChange({ type: "match", value: next });
                  }}
                  className="w-1/2 rounded border border-border bg-surface px-2 py-1"
                >
                  <option value="">Select a match…</option>
                  {question.right.map((rightItem, ri) => (
                    <option key={ri} value={ri}>
                      {rightItem}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        )}

        {question.type === "short" && answer.type === "short" && (
          <textarea
            disabled={submitted}
            value={answer.value}
            onChange={(e) => onChange({ type: "short", value: e.target.value })}
            rows={4}
            placeholder="Write your answer…"
            className="w-full rounded-station border border-border bg-surface p-3 text-sm"
          />
        )}
      </div>

      {submitted && (
        <div
          className={`mt-4 rounded-station border p-3 text-sm ${
            correct === null
              ? "border-border bg-surface-raised"
              : correct
                ? "border-emerald-500/40 bg-emerald-500/10"
                : "border-red-500/40 bg-red-500/10"
          }`}
        >
          <p className="font-medium">{correct === null ? "Self-check" : correct ? "Correct" : "Not quite"}</p>
          <p className="mt-1 text-text-muted">{question.explanation}</p>
        </div>
      )}
    </div>
  );
}
