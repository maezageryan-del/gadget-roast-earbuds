// gadget-roast-earbuds — make.fun entry
// "One-Line Roast: The Gadget You Use Every Day"
// (u-daring-gecko-25-one-line-roast-the-gadget-you-use-3d6aa610)
//
// Writes exactly one roast line to entry.txt — no trailing newline —
// in the directory the grader mounts (MAKEFUN_OUTPUT_DIR) or, when run
// locally, in the current directory. Node 22, no dependencies.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The entry: one original line, 111 characters, roasting the gadget I
// use every day — my earbuds.
const ENTRY_LINE =
  "My earbuds connect to my neighbour's TV faster than to my own phone - they have a better social life than I do.";

const MIN_CHARS = 1;
const MAX_CHARS = 200;

function validate(line: string): void {
  const chars = [...line];
  if (chars.length < MIN_CHARS || chars.length > MAX_CHARS) {
    throw new Error(
      `entry must be ${MIN_CHARS}-${MAX_CHARS} characters, got ${chars.length}`,
    );
  }
  if (line.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("entry must be a single line");
  }
  // No control characters at all: the gate reads the file as plain text,
  // and anything invisible in the line would only ever hurt it.
  for (const ch of line) {
    const code = ch.charCodeAt(0);
    if (code < 0x20 || code === 0x7f) {
      throw new Error("entry must not contain control characters");
    }
  }
}

function main(): void {
  validate(ENTRY_LINE);
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? ".";
  mkdirSync(outDir, { recursive: true });
  // Exactly the line, byte for byte — no trailing newline.
  writeFileSync(join(outDir, "entry.txt"), ENTRY_LINE, "utf8");
}

main();
