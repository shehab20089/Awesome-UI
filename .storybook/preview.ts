import type { Preview } from "@storybook/react";
import "../src/global.css"; // adjust this path to where your Tailwind CSS file is located

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
