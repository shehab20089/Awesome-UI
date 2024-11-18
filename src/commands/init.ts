import fs from "fs-extra";
import * as path from "path";
import ora from "ora";
import { execSync } from "child_process";

export async function initProject() {
  const spinner = ora("Initializing project...").start();

  try {
    // Create base directories
    await fs.mkdir("./src/components/ui", { recursive: true });
    await fs.mkdir("./src/lib", { recursive: true });

    // Copy tailwind config from project root
    const templateConfigPath = path.join(
      __dirname,
      "../..",
      "tailwind.config.js"
    );
    const targetConfigPath = path.join(process.cwd(), "tailwind.config.ts");
    await fs.copy(templateConfigPath, targetConfigPath);

    // Create postcss.config.js
    const postcssConfig = `
        module.exports = {
          plugins: {
            tailwindcss: {},
            autoprefixer: {},
          },
        }`;

    await fs.writeFile("postcss.config.js", postcssConfig);

    // Create utils.ts
    const utilsContent = `
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}`;

    await fs.writeFile(path.join("./src/lib", "utils.ts"), utilsContent);

    // Initialize package.json if it doesn't exist
    try {
      await fs.access("package.json");
    } catch {
      execSync("npm init -y");
    }

    // Install base dependencies
    const baseDeps = [
      "tailwindcss",
      "postcss",
      "autoprefixer",
      "clsx",
      "tailwind-merge",
    ];

    execSync(`npm install ${baseDeps.join(" ")} --save-dev`);

    spinner.succeed("Project initialized successfully");
  } catch (error) {
    spinner.fail("Failed to initialize project");
    console.error(error);
    process.exit(1);
  }
}
