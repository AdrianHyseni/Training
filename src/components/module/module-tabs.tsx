"use client";

import * as Tabs from "@radix-ui/react-tabs";
import type { ReactNode } from "react";

export function ModuleTabs({
  lesson,
  exercises,
  flashcards,
  quiz,
  lab,
  glossary,
}: {
  lesson: ReactNode;
  exercises: ReactNode;
  flashcards: ReactNode;
  quiz: ReactNode;
  lab?: ReactNode;
  glossary: ReactNode;
}) {
  const tabs = [
    { value: "lesson", label: "Lesson", content: lesson },
    { value: "exercises", label: "Exercises", content: exercises },
    { value: "flashcards", label: "Flashcards", content: flashcards },
    { value: "quiz", label: "Quiz", content: quiz },
    ...(lab ? [{ value: "lab", label: "Lab", content: lab }] : []),
    { value: "glossary", label: "Glossary", content: glossary },
  ];

  return (
    <Tabs.Root defaultValue="lesson">
      <Tabs.List className="flex flex-wrap gap-1 border-b border-border" aria-label="Module sections">
        {tabs.map((tab) => (
          <Tabs.Trigger
            key={tab.value}
            value={tab.value}
            className="rounded-t-station border-b-2 border-transparent px-4 py-2.5 text-sm font-medium text-text-muted transition hover:text-text data-[state=active]:border-accent data-[state=active]:text-text"
          >
            {tab.label}
          </Tabs.Trigger>
        ))}
      </Tabs.List>
      {tabs.map((tab) => (
        <Tabs.Content key={tab.value} value={tab.value} className="py-8 focus:outline-none">
          {tab.content}
        </Tabs.Content>
      ))}
    </Tabs.Root>
  );
}
