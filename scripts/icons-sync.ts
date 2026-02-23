#!/usr/bin/env node

import { syncMetadataForLocalIcons, getIconAvailability } from "./github-sync.js";

const args = process.argv.slice(2);

async function main() {
  console.log("Checking icon availability...");
  
  const availability = await getIconAvailability();
  console.log(`Remote total: ${availability.remoteTotal}`);
  console.log(`Local total: ${availability.localTotal}`);
  console.log(`Missing: ${availability.missingTotal}`);

  if (availability.missingTotal > 0) {
    console.log("\nRun 'npm run icons:download' to download missing icons first.");
    return;
  }

  console.log("\nStarting metadata sync...");

  const report = await syncMetadataForLocalIcons({
    concurrency: 10,
    onLog: (event) => {
      console.log(`[${event.level}] ${event.line}`);
    },
  });

  console.log("\n=== Sync Complete ===");
  console.log(`Icons processed: ${report.localTotal}`);
}

main().catch(console.error);
