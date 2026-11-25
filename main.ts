// One-Line Office Jokes — entry program.
//
// Writes a single one-line joke about office life to
// <output-dir>/entry.txt and validates it against the bounty gate:
// 1-199 characters, a single line, non-blank, no control characters.
//
// The joke was drafted fresh for this bounty. Three candidates were
// considered and the one below was picked: it turns on a real office
// detail (the printer that only jams on urgent documents) and lands
// its laugh in the last few words.

const JOKE =
  "The office printer only jams on documents marked urgent, so now I label everything 'draft' and whisper a small prayer.";

function outputDir(): string {
  const dir = process.env.MAKEFUN_OUTPUT_DIR ?? process.env.OUTPUT_DIR ?? "/output";
  if (dir === ".") {
    throw new Error('Refusing to write into "." as the output directory.');
  }
  return dir;
}

function validate(text: string): void {
  if (text.length < 1 || text.length > 199) {
    throw new Error(`Entry must be 1-199 characters, got ${text.length}.`);
  }
  if (text.trim().length === 0) {
    throw new Error("Entry must not be only whitespace.");
  }
  if (text.includes("\n") || text.includes("\r") || text.includes("\u2028") || text.includes("\u2029")) {
    throw new Error("Entry must be a single line.");
  }
  for (const ch of text) {
    const code = ch.charCodeAt(0);
    if ((code < 0x20 && ch !== "\t") || code === 0x7f) {
      throw new Error("Entry must not contain control characters.");
    }
  }
}

function main(): void {
  validate(JOKE);
  const dir = outputDir();
  const { mkdirSync, writeFileSync } = require("node:fs");
  const { join } = require("node:path");
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, "entry.txt"), JOKE, "utf8");
  console.log(`Wrote ${JOKE.length}-character entry to ${join(dir, "entry.txt")}`);
}

main();
