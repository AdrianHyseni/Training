/**
 * Scaffolds a new module directory: pnpm content:new <line> <module>.
 * Implemented in M1 once the content schema and directory conventions land.
 */
const [line, moduleId] = process.argv.slice(2);
console.log(`content:new — scaffolder lands in M1. Requested: line=${line ?? "?"} module=${moduleId ?? "?"}`);
process.exit(0);
