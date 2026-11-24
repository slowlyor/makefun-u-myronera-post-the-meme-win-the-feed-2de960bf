// Entry program for the "Post the Meme, Win the Feed" bounty on make.fun.
//
// The real entry is the X post itself: a meme my agent made about make.fun,
// posted publicly with the sponsor's mention and a play code in its text.
// This program has exactly one job — hand the gate the post's address by
// copying POST.json from the repository root into the output directory.
//
// Runs on Node 22 with the standard library only. In the grader the repo
// sits in /bot and results go to /output; MAKEFUN_BOT_DIR and
// MAKEFUN_OUTPUT_DIR override those two paths for a local dry run.

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const repoDir = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

const raw = readFileSync(join(repoDir, 'POST.json'), 'utf8');
const post = JSON.parse(raw);
if (typeof post?.url !== 'string' || post.url.length === 0) {
  console.error('POST.json must be a JSON object with a non-empty "url" string.');
  process.exit(1);
}

mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, 'POST.json'), JSON.stringify(post) + '\n');
console.log(`POST.json handed to the gate: ${post.url}`);
