"use client";

import { useState } from "react";
import type { Flashcard } from "@/content/schema";

export function FlashcardsPanel({ cards }: { cards: Flashcard[] }) {
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const card = cards[index];
  if (!card) return null;

  function go(delta: number) {
    setFlipped(false);
    setIndex((i) => (i + delta + cards.length) % cards.length);
  }

  return (
    <div className="mx-auto max-w-xl">
      <p className="text-center text-sm text-text-muted">
        Card {index + 1} of {cards.length}
      </p>
      <button
        type="button"
        onClick={() => setFlipped((f) => !f)}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") go(1);
          if (e.key === "ArrowLeft") go(-1);
        }}
        className="mt-3 flex min-h-56 w-full items-center justify-center rounded-station border border-border bg-surface-raised p-8 text-center transition hover:border-accent/50"
        aria-label={flipped ? "Showing answer, click to flip back" : "Showing question, click to reveal answer"}
      >
        <span className="font-heading text-lg leading-snug">{flipped ? card.back : card.front}</span>
      </button>
      <div className="mt-4 flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => go(-1)}
          className="rounded-station border border-border px-4 py-2 text-sm font-medium transition hover:bg-surface-raised"
        >
          ← Previous
        </button>
        <span className="text-xs text-text-muted">Click the card, or use ← / → to navigate</span>
        <button
          type="button"
          onClick={() => go(1)}
          className="rounded-station border border-border px-4 py-2 text-sm font-medium transition hover:bg-surface-raised"
        >
          Next →
        </button>
      </div>
    </div>
  );
}
