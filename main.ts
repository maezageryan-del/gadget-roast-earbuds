// One-Line Roast: The Gadget You Use Every Day
// One-line roast of a gadget used every day, written to /output/entry.txt.
//
// The roast: "My earbuds connect to my neighbour's TV faster than to my own
// phone - they have a better social life than I do."
// 111 characters, one line, UTF-8, ASCII only. Deterministic, no network.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ROAST =
  "My earbuds connect to my neighbour's TV faster than to my own phone - they have a better social life than I do.";

// The sealed gate requires 1-200 characters, one line, not only whitespace.
if (
  ROAST.length < 1 ||
  ROAST.length > 200 ||
  ROAST.includes("\n") ||
  ROAST.trim().length === 0
) {
  throw new Error(`roast must be one line of 1-200 chars, got ${ROAST.length}`);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ROAST, "utf8");
