// src/commands/init.ts
import { promises as fs } from "fs";
import path from "path";
import ora from "ora";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export async function initProject() {
  const spinner = ora("Initializing project...").start();

  try {
    // Create base directories
    await fs.mkdir("components/ui", { recursive: true });
    await fs.mkdir("lib", { recursive: true });

    // Create utils.ts
    const utilsContent = `
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}`;

    await fs.writeFile(path.join("lib", "utils.ts"), utilsContent);

    spinner.succeed("Project initialized successfully");
  } catch (error) {
    spinner.fail("Failed to initialize project");
    console.error(error);
    process.exit(1);
  }
}
