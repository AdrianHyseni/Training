import { listAllModulePaths, loadModule } from "@/content/loader";

/** Aggregates every module's `verify` list into one printout for docs/CONTENT_REVIEW.md. */
function main() {
  const targets = listAllModulePaths();
  const lines: string[] = [];

  for (const { line, moduleId } of targets) {
    const mod = loadModule(line, moduleId);
    if (mod.meta.verify.length === 0) continue;
    lines.push(`### ${mod.meta.title} (\`${line}/${moduleId}\`)`);
    lines.push(`Last reviewed: ${mod.meta.lastReviewed}`);
    lines.push("");
    for (const v of mod.meta.verify) {
      lines.push(`- [ ] ${v.claim} — [source](${v.sourceUrl})`);
    }
    lines.push("");
  }

  console.log(lines.join("\n"));
}

main();
