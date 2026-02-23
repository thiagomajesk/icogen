#!/usr/bin/env node

import { downloadAllIcons, refreshAllIcons } from "./github-sync.js";

const args = process.argv.slice(2);
const refresh = args.includes("--refresh");

async function main() {
  console.log("Starting icon download...");

  const report = refresh
    ? await refreshAllIcons({
        concurrency: 10,
        onLog: (event) => {
          console.log(`[${event.level}] ${event.line}`);
        },
      })
    : await downloadAllIcons({
        concurrency: 10,
        onLog: (event) => {
          console.log(`[${event.level}] ${event.line}`);
        },
      });

  console.log("\n=== Download Complete ===");
  console.log(`Remote total: ${report.remoteTotal}`);
  console.log(`Downloaded: ${report.downloaded.length}`);
  console.log(`Failed: ${report.failed.length}`);

  if (report.failed.length > 0) {
    console.log("\nFailed downloads:");
    report.failed.forEach((f) => console.log(`  - ${f.path}: ${f.reason}`));
  }
}

main().catch(console.error);
