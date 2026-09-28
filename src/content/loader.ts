import fs from "node:fs";
import path from "node:path";
import yaml from "js-yaml";
import matter from "gray-matter";
import { cardsFile, exercisesFile, glossaryFile, moduleMeta, quiz } from "@/content/schema";
import type { Flashcard, Exercise, GlossaryTerm, ModuleMeta, Quiz } from "@/content/schema";

const CONTENT_ROOT = path.join(process.cwd(), "content");

export interface LoadedModule {
  meta: ModuleMeta;
  lessonSource: string;
  lessonWordCount: number;
  quiz: Quiz;
  cards: Flashcard[];
  exercises: Exercise[];
  glossary: GlossaryTerm[];
  hasLab: boolean;
}

function readYaml(filePath: string): unknown {
  return yaml.load(fs.readFileSync(filePath, "utf-8"));
}

export function listLines(): string[] {
  if (!fs.existsSync(CONTENT_ROOT)) return [];
  return fs
    .readdirSync(CONTENT_ROOT, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort();
}

export function listModules(line: string): string[] {
  const lineDir = path.join(CONTENT_ROOT, line);
  if (!fs.existsSync(lineDir)) return [];
  return fs
    .readdirSync(lineDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort();
}

export function listAllModulePaths(): Array<{ line: string; moduleId: string }> {
  return listLines().flatMap((line) => listModules(line).map((moduleId) => ({ line, moduleId })));
}

export function loadModule(line: string, moduleId: string): LoadedModule {
  const dir = path.join(CONTENT_ROOT, line, moduleId);

  const meta = moduleMeta.parse(readYaml(path.join(dir, "module.yaml")));

  const lessonPath = path.join(dir, "lesson.mdx");
  const lessonRaw = fs.readFileSync(lessonPath, "utf-8");
  const { content: lessonSource } = matter(lessonRaw);
  const lessonWordCount = lessonSource.trim().split(/\s+/).filter(Boolean).length;

  const quizData = quiz.parse(readYaml(path.join(dir, "quiz.yaml")));
  const cardsData = cardsFile.parse(readYaml(path.join(dir, "cards.yaml"))).cards;
  const exercisesData = exercisesFile.parse(readYaml(path.join(dir, "exercises.yaml"))).exercises;
  const glossaryData = glossaryFile.parse(readYaml(path.join(dir, "glossary.yaml"))).terms;

  const hasLab = fs.existsSync(path.join(dir, "lab.md"));

  return {
    meta,
    lessonSource,
    lessonWordCount,
    quiz: quizData,
    cards: cardsData,
    exercises: exercisesData,
    glossary: glossaryData,
    hasLab,
  };
}

export function loadLabIfPresent(line: string, moduleId: string): string | null {
  const labPath = path.join(CONTENT_ROOT, line, moduleId, "lab.md");
  if (!fs.existsSync(labPath)) return null;
  return fs.readFileSync(labPath, "utf-8");
}
