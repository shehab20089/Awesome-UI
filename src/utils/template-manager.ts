import fs from "fs-extra";
import path from "path";
import { ComponentConfig, ComponentFile } from "../types";
const dirName = path.resolve(path.dirname(""));

export class TemplateManager {
  private templatesDir: string;
  private targetDir: string;

  constructor() {
    console.log(dirName);
    this.templatesDir = path.join(dirName, "./src/templates");
    this.targetDir = process.cwd();
  }

  async copyComponentFiles(component: ComponentConfig): Promise<void> {
    for (const file of component.files) {
      await this.copyFile(file, component.name);
    }
  }

  private async copyFile(
    file: ComponentFile,
    componentName: string
  ): Promise<void> {
    const sourcePath = path.join(this.templatesDir, file.template);
    const targetPath = this.getTargetPath(file, componentName);

    await fs.ensureDir(path.dirname(targetPath));
    await fs.copy(sourcePath, targetPath);
  }

  private getTargetPath(file: ComponentFile, componentName: string): string {
    switch (file.type) {
      case "component":
        return path.join(this.targetDir, "components/ui", file.name);
      case "styles":
        return path.join(this.targetDir, "styles", file.name);
      case "utils":
        return path.join(this.targetDir, "lib/utils", file.name);
      case "types":
        return path.join(this.targetDir, "types", file.name);
      default:
        throw new Error(`Unknown file type: ${file.type}`);
    }
  }
}
