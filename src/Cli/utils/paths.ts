import { fileURLToPath } from "url";
import { dirname, join } from "path";

// Helper to resolve paths from the package root
export function getPackageRoot() {
  const currentFilePath = fileURLToPath(import.meta.url);
  // Navigate up from dist/Cli/utils or src/Cli/utils to package root
  return join(dirname(currentFilePath), "..", "..", "..");
}

export function resolvePackagePath(...paths: string[]) {
  return join(getPackageRoot(), ...paths);
}
