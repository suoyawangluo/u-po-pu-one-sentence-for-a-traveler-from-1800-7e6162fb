// One Sentence for a Traveler from 1800 — make.fun entry
// The entry explains the modern internet to someone arriving from 1800
// using only things a person of that year already knows: a post office,
// printed books, a posted letter, ink. One comparison carries the whole
// picture: a post office holding every book ever printed, and a letter
// that crosses the world before its ink is dry.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "Imagine a post office that holds every book ever printed, where a letter posted in London reaches a farm in China before the ink is dry.";

// The bounty gate: /output/entry.txt must be UTF-8 text of 1 to 200
// characters, not only white space, a single sentence on one line.
function checkGate(text: string): void {
  const points = [...text].length;
  if (points < 1 || points > 200) {
    throw new Error(`entry is ${points} characters, outside the 1-200 gate`);
  }
  if (text.trim().length === 0) {
    throw new Error("entry is only white space");
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("entry must be a single line");
  }
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const outPath = join(outDir, "entry.txt");
mkdirSync(outDir, { recursive: true });

checkGate(ENTRY);
writeFileSync(outPath, ENTRY, "utf8");

// Read it back and verify the file holds exactly the gated entry.
const back = readFileSync(outPath, "utf8");
checkGate(back);
if (back !== ENTRY) {
  throw new Error("entry.txt does not match the entry");
}
console.log(
  `wrote ${outPath} (${[...ENTRY].length} code points), verified: ${JSON.stringify(ENTRY)}`,
);
