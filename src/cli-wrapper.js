#!/usr/bin/env node

import { spawn } from "child_process";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const cliPath = resolve(__dirname, "./cli.ts");

// Use --import instead of --loader for Node.js v20+
const child = spawn(
  process.execPath,
  ["--import", "tsx", cliPath, ...process.argv.slice(2)],
  {
    stdio: "inherit",
    env: {
      ...process.env,
      NODE_NO_WARNINGS: "1", // Optional: suppress experimental warnings
    },
  }
);

child.on("exit", (code) => {
  process.exit(code || 0);
});

child.on("error", (err) => {
  console.error("Failed to start process:", err);
  process.exit(1);
});
