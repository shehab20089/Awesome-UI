import fs from "fs-extra";
import path from "path";
import { ComponentConfig } from "../types";

export class TailwindManager {
  private configPath: string;

  constructor() {
    this.configPath = path.join(process.cwd(), "tailwind.config.ts");
  }

  async updateConfig(component: ComponentConfig): Promise<void> {
    if (!component.styles?.tailwind) return;

    const currentConfig = await this.readConfig();
    const updatedConfig = this.mergeConfigs(
      currentConfig,
      component.styles.tailwind
    );
    await this.writeConfig(updatedConfig);
  }

  private async readConfig(): Promise<any> {
    try {
      const content = await fs.readFile(this.configPath, "utf-8");
      // Parse the TypeScript config file content
      // This is a simplified version - you might want to use a proper TS parser
      return eval(content.replace("export default", "module.exports ="));
    } catch {
      return {
        content: [
          "./components/**/*.{ts,tsx}",
          "./app/**/*.{ts,tsx}",
          "./src/**/*.{ts,tsx}",
        ],
        theme: {
          extend: {},
        },
        plugins: [],
      };
    }
  }

  private mergeConfigs(current: any, newConfig: any): any {
    return {
      ...current,
      theme: {
        ...current.theme,
        extend: {
          ...current.theme?.extend,
          ...newConfig.theme,
        },
      },
    };
  }

  private async writeConfig(config: any): Promise<void> {
    const content = `
import type { Config } from "tailwindcss"

const config: Config = ${JSON.stringify(config, null, 2)}

export default config`;

    await fs.writeFile(this.configPath, content);
  }
}
