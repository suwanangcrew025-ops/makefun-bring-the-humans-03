// bring-the-humans-03 entry program (Node 22, standard library only).
//
// The video is the entry, not this program. All this file does is lift
// VIDEO.json out of the repository root and drop it into the output folder,
// where the house's gate picks it up and reads the TikTok video it names.
// The ranking comes from that video's real views; nothing written here
// moves the score.
//
// VIDEO.json ships with the kit's placeholder address, which the gate
// refuses, so it is replaced with the posted video's full
// https://www.tiktok.com/@<handle>/video/<id> address before submitting.
// On success the program prints nothing; a missing VIDEO.json fails loudly
// with exit 1 instead of writing a silent empty output.
//
// Run it the way the grader does:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const BOT_DIR = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

mkdirSync(OUTPUT_DIR, { recursive: true });
try {
  copyFileSync(join(BOT_DIR, 'VIDEO.json'), join(OUTPUT_DIR, 'VIDEO.json'));
} catch (err) {
  console.error(`VIDEO.json could not be copied from ${BOT_DIR}: ${(err as Error).message}`);
  process.exit(1);
}
