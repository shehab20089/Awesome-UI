import fs from "fs-extra";
import * as path from "path";
import ora from "ora";
import { execSync } from "child_process";
import { resolvePackagePath } from "../utils/paths";

export async function initProject() {
  const spinner = ora("Initializing Awesome UI...").start();

  try {
    // Create base directories
    await fs.mkdir("./src/components/ui", { recursive: true });
    await fs.mkdir("./src/lib", { recursive: true });

    // Define config files to copy
    const configFiles = [
      {
        name: "Tailwind config",
        template: resolvePackagePath(
          "tailwind.config.ts" // Moved up one level since it's in templates root
        ),
        target: path.join(process.cwd(), "tailwind.config.ts"),
      },
      {
        name: "PostCSS config",
        template: resolvePackagePath(
          "postcss.config.cjs" // Moved up one level since it's in templates root
        ),
        target: path.join(process.cwd(), "postcss.config.cjs"),
      },
      {
        name: "Global CSS",
        template: resolvePackagePath("src", "global.css"),
        target: path.join(process.cwd(), "src/global.css"),
      },
    ];

    // Copy each config file
    for (const config of configFiles) {
      await fs.ensureDir(path.dirname(config.target));
      await fs.copy(config.template, config.target);
      spinner.succeed(`Created ${config.name}`);
    }

    // Create utils.ts
    const utilsContent = `
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}`;

    await fs.writeFile(path.join("./src/lib", "utils.ts"), utilsContent);

    // Check if package.json exists
    try {
      await fs.access("package.json");
    } catch {
      spinner.fail(
        "No React project detected in current directory. Please run this command in a React project root directory."
      );
      process.exit(1);
    }

    // Install base dependencies
    const baseDeps = [
      "tailwindcss",
      "postcss",
      "autoprefixer",
      "clsx",
      "tailwind-merge",
      "tailwindcss-animate",
    ];

    execSync(`npm install ${baseDeps.join(" ")} --save-dev`);

    spinner.succeed("Awesome UI initialized successfully");
  } catch (error) {
    spinner.fail("Failed to initialize Awesome UI");
    console.error(error);
    process.exit(1);
  }
}
