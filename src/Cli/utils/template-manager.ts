import fs from "fs-extra";
import path from "path";
import { ComponentConfig, ComponentFile } from "../types";
import { resolvePackagePath } from "./paths";

export class TemplateManager {
  private targetDir: string;

  constructor() {
    this.targetDir = process.cwd();
  }

  async copyComponentFiles(component: ComponentConfig): Promise<void> {
    try {
      for (const file of component.files) {
        await this.copyFile(file, component.name);
      }
    } catch (error) {
      throw new Error(`Failed to copy component files: ${error}`);
    }
  }

  private async copyFile(
    file: ComponentFile,
    componentName: string
  ): Promise<void> {
    const sourcePath = resolvePackagePath("src", "templates", file.template);
    const targetPath = this.getTargetPath(file, componentName);

    try {
      await fs.ensureDir(path.dirname(targetPath));
      await fs.copy(sourcePath, targetPath);
    } catch (error) {
      throw new Error(`Failed to copy file ${file.template}: ${error}`);
    }
  }

  private getTargetPath(file: ComponentFile, componentName: string): string {
    return path.join(this.targetDir, "src", "components", "ui", file.name);
  }
}
