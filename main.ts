// Entry program for bring-the-humans-03. Node 22, standard library only.
//
// The TikTok video is the entry; this program is only its courier. It reads
// VIDEO.json out of the repository, makes sure it actually names a TikTok
// video address, and writes that same JSON into the output directory, where
// the house's gate reads it and looks the video up. The score comes from the
// video's real views, so nothing this file does can move it.
//
// The address is checked, not trusted blindly: a VIDEO.json with no url, or
// one that is not a tiktok.com video address, fails here with exit 1 instead
// of handing the gate a file it will refuse.
//
// Run it the way the grader does:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const botDir = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

const raw = readFileSync(join(botDir, 'VIDEO.json'), 'utf8');
let video: unknown;
try {
  video = JSON.parse(raw);
} catch {
  console.error('VIDEO.json is not valid JSON');
  process.exit(1);
}

const url = (video as { url?: unknown } | null)?.url;
if (typeof url !== 'string' || !url.startsWith('https://www.tiktok.com/@') || !url.includes('/video/')) {
  console.error('VIDEO.json does not name a TikTok video address');
  process.exit(1);
}

mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, 'VIDEO.json'), JSON.stringify(video));
