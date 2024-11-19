import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import React from "react";

import { Button } from "@/templates/components/button";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Form/Button",
  component: Button,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
    docs: {
      description: {
        component: `
### Installation

\`\`\`bash
npx awesome-ui-cli@latest init
npx awesome-ui-cli@latest add button
\`\`\`

### Usage

\`\`\`tsx
import { Button } from "@/components/ui/button"

export default function Example() {
  return (
    <div>
      {/* Basic button */}
      <Button>Click me</Button>

      {/* Button with variants */}
      <Button variant="destructive">Delete</Button>
      <Button variant="outline">Cancel</Button>
      
      {/* Button with sizes */}
      <Button size="sm">Small</Button>
      <Button size="lg">Large</Button>

 

      {/* Disabled state */}
      <Button disabled>Disabled</Button>

      {/* Loading state */}
      <Button disabled>Loading...</Button>

      {/* As child */}
      <Button asChild>
        <a href="#">Button as link</a>
      </Button>
    </div>
  )
}
\`\`\`
`,
      },
    },
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    variant: {
      control: "select",
      options: [
        "default",
        "secondary",
        "destructive",
        "outline",
        "ghost",
        "link",
      ],
    },
    size: {
      control: "select",
      options: ["default", "sm", "lg"],
    },
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: { onClick: fn() },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    variant: "default",
    size: "default",
    children: "Button",
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    size: "default",
    children: "Button",
  },
};

export const Destructive: Story = {
  args: {
    variant: "destructive",
    size: "default",
    children: "Button",
  },
};

export const Outline: Story = {
  args: {
    variant: "outline",
    size: "default",
    children: "Button",
  },
};

export const Ghost: Story = {
  args: {
    variant: "ghost",
    size: "default",
    children: "Button",
  },
};

export const Link: Story = {
  args: {
    variant: "link",
    size: "default",
    children: "Button",
  },
};

export const Large: Story = {
  args: {
    size: "lg",
    variant: "default",
    children: "Button",
  },
};

export const Small: Story = {
  args: {
    size: "sm",
    variant: "default",
    children: "Button",
  },
};

export const WithIcon: Story = {
  args: {
    size: "default",
    variant: "default",
    children: (
      <>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mr-2"
        >
          <path d="M5 12h14" />
          <path d="m12 5 7 7-7 7" />
        </svg>
        Button with Icon
      </>
    ),
  },
};

export const Loading: Story = {
  args: {
    size: "default",
    variant: "default",
    children: "Loading...",
    disabled: true,
  },
};

export const AsChild: Story = {
  args: {
    asChild: true,
    children: <a href="#">Button as Link</a>,
  },
};
