import { execSync } from "child_process";
import { ComponentConfig } from "../types";

export class DependencyManager {
  async installDependencies(component: ComponentConfig): Promise<void> {
    if (component.dependencies.length > 0) {
      await this.install(component.dependencies, false);
    }

    if (component.devDependencies.length > 0) {
      await this.install(component.devDependencies, true);
    }
  }

  private async install(deps: string[], isDev: boolean): Promise<void> {
    const command = `npm install ${deps.join(" ")} ${
      isDev ? "--save-dev" : "--save"
    }`;
    execSync(command, { stdio: "inherit" });
  }
}
