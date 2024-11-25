export interface ComponentConfig {
  name: string;
  description: string;
  dependencies: string[];
  devDependencies: string[];
  files: ComponentFile[];
  styles?: {
    tailwind?: {
      config: string[];
      theme?: Record<string, unknown>;
    };
  };
}

export interface ComponentFile {
  name: string;
  template: string;
  type: "component" | "styles" | "utils" | "types";
}

export interface Registry {
  [key: string]: ComponentConfig;
}
