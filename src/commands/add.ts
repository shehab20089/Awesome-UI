import { promises as fs } from "fs";
import path from "path";
import ora from "ora";
import chalk from "chalk";
import { REGISTRY } from "../utils/registry.js";

export async function addComponent(componentName: string) {
  const component = REGISTRY[componentName];
  if (!component) {
    console.error(
      chalk.red(`Component "${componentName}" not found in registry`)
    );
    return;
  }

  const spinner = ora(`Adding ${componentName} component...`).start();

  try {
    // Create component files
    for (const file of component.files) {
      const filePath = path.join("components/ui", file.name);
      await fs.writeFile(filePath, file.content);
    }

    spinner.succeed(`Component "${componentName}" added successfully`);
  } catch (error) {
    spinner.fail(`Failed to add component "${componentName}"`);
    console.error(error);
  }
}
