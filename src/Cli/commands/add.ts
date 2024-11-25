import chalk from "chalk";
import { REGISTRY } from "../utils/registry";
import { TemplateManager } from "../utils/template-manager";
import { DependencyManager } from "../utils/dependency-manager";

export async function add(componentName: string): Promise<void> {
  try {
    const component = REGISTRY[componentName];
    if (!component) {
      throw new Error(`Component "${componentName}" not found in registry`);
    }

    console.log(chalk.blue(`Adding ${component.name} component...`));

    const templateManager = new TemplateManager();
    const dependencyManager = new DependencyManager();

    // Install dependencies first
    console.log("Installing dependencies...");
    await dependencyManager.installDependencies(component);

    // Then copy component files
    console.log("Copying component files...");
    await templateManager.copyComponentFiles(component);

    console.log(
      chalk.green(`✓ Successfully added ${component.name} component!`)
    );

    // Show usage instructions
    console.log("\nNext steps:");
    console.log("1. Import the component:");
    console.log(
      chalk.cyan(
        `   import { ${componentName} } from "@/components/ui/${componentName}"`
      )
    );
    console.log("2. Use it in your application:");
    console.log(chalk.cyan(`   <${componentName}>Content</${componentName}>`));
  } catch (error: any) {
    console.error(chalk.red(`Error: ${error?.message}`));
    process.exit(1);
  }
}
