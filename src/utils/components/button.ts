import { ComponentConfig } from "../../types";

const button: ComponentConfig = {
  name: "button",
  description: "A button component with multiple variants and sizes.",
  dependencies: ["class-variance-authority", "@radix-ui/react-slot"],
  devDependencies: [],
  files: [
    {
      name: "button.tsx",
      template: "components/button.tsx",
      type: "component",
    },
  ],
};

export default button;
