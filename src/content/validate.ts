import { listAllModulePaths, loadModule } from "@/content/loader";

const MIN_WORDS = 1500;
const MAX_WORDS = 3000;
const MIN_QUIZ_QUESTIONS = 10;
const MIN_QUIZ_TYPES = 3;
const MIN_FLASHCARDS = 10;
const MIN_EXERCISES = 2;
const MIN_GLOSSARY_TERMS = 5;

let errors = 0;
let warnings = 0;

function fail(where: string, message: string) {
  errors += 1;
  console.error(`✗ ${where}: ${message}`);
}

function warn(where: string, message: string) {
  warnings += 1;
  console.warn(`! ${where}: ${message}`);
}

function main() {
  const targets = listAllModulePaths();

  if (targets.length === 0) {
    console.log("content:validate — no modules found under /content yet.");
    return;
  }

  const seenIds = new Set<string>();
  const allIds = new Set(targets.map((t) => t.moduleId));

  for (const { line, moduleId } of targets) {
    const where = `${line}/${moduleId}`;

    let mod;
    try {
      mod = loadModule(line, moduleId);
    } catch (error) {
      fail(where, `failed to load/parse content — ${error instanceof Error ? error.message : String(error)}`);
      continue;
    }

    // Unique IDs
    if (seenIds.has(mod.meta.id)) {
      fail(where, `duplicate module id "${mod.meta.id}"`);
    }
    seenIds.add(mod.meta.id);

    if (mod.meta.id !== moduleId) {
      fail(where, `module.yaml id "${mod.meta.id}" does not match directory name "${moduleId}"`);
    }
    if (mod.meta.line !== line) {
      fail(where, `module.yaml line "${mod.meta.line}" does not match directory "${line}"`);
    }

    // Broken internal links (prerequisites / related must reference real modules)
    for (const prereq of mod.meta.prerequisites) {
      if (!allIds.has(prereq)) {
        fail(where, `prerequisite "${prereq}" does not match any known module id`);
      }
    }
    for (const rel of mod.meta.related) {
      if (!allIds.has(rel)) {
        fail(where, `related module "${rel}" does not match any known module id`);
      }
    }

    // lastReviewed presence + staleness
    const lastReviewed = new Date(mod.meta.lastReviewed);
    const ageMonths = (Date.now() - lastReviewed.getTime()) / (1000 * 60 * 60 * 24 * 30);
    if (Number.isNaN(lastReviewed.getTime())) {
      fail(where, `invalid lastReviewed date "${mod.meta.lastReviewed}"`);
    } else if (ageMonths > 12) {
      warn(where, `lastReviewed is over 12 months old`);
    }

    // Lesson length
    if (mod.lessonWordCount < MIN_WORDS || mod.lessonWordCount > MAX_WORDS) {
      warn(where, `lesson is ${mod.lessonWordCount} words (expected ${MIN_WORDS}-${MAX_WORDS})`);
    }
    if (!mod.lessonSource.includes("```mermaid")) {
      warn(where, `no Mermaid diagram found in lesson.mdx`);
    }

    // Quiz
    if (mod.quiz.questions.length < MIN_QUIZ_QUESTIONS) {
      fail(where, `quiz has ${mod.quiz.questions.length} questions, minimum is ${MIN_QUIZ_QUESTIONS}`);
    }
    const types = new Set(mod.quiz.questions.map((q) => q.type));
    if (types.size < MIN_QUIZ_TYPES) {
      fail(where, `quiz uses only ${types.size} question type(s), minimum is ${MIN_QUIZ_TYPES}`);
    }
    for (const q of mod.quiz.questions) {
      const qWhere = `${where} quiz:${q.id}`;
      if (q.type === "single" || q.type === "predict") {
        if (q.correct < 0 || q.correct >= q.options.length) {
          fail(qWhere, `correct index ${q.correct} out of bounds for ${q.options.length} options`);
        }
      }
      if (q.type === "multi") {
        for (const c of q.correct) {
          if (c < 0 || c >= q.options.length) {
            fail(qWhere, `correct index ${c} out of bounds for ${q.options.length} options`);
          }
        }
      }
      if (q.type === "order") {
        if (q.correctOrder.length !== q.items.length || q.correctOrder.some((i) => i < 0 || i >= q.items.length)) {
          fail(qWhere, `correctOrder does not match items length/bounds`);
        }
      }
      if (q.type === "match") {
        for (const [l, r] of q.correctPairs) {
          if (l < 0 || l >= q.left.length || r < 0 || r >= q.right.length) {
            fail(qWhere, `correctPairs index out of bounds`);
          }
        }
      }
    }

    // Flashcards
    if (mod.cards.length < MIN_FLASHCARDS) {
      fail(where, `${mod.cards.length} flashcards, minimum is ${MIN_FLASHCARDS}`);
    }

    // Exercises
    if (mod.exercises.length < MIN_EXERCISES) {
      fail(where, `${mod.exercises.length} exercises, minimum is ${MIN_EXERCISES}`);
    }

    // Glossary
    if (mod.glossary.length < MIN_GLOSSARY_TERMS) {
      fail(where, `${mod.glossary.length} glossary terms, minimum is ${MIN_GLOSSARY_TERMS}`);
    }
  }

  console.log(`\ncontent:validate — ${targets.length} module(s) checked, ${errors} error(s), ${warnings} warning(s).`);
  if (errors > 0) {
    process.exit(1);
  }
}

main();
