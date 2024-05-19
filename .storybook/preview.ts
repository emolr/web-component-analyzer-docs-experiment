import type { Preview } from "@storybook/web-components";
import { setCustomElementsManifest } from "@storybook/web-components";

import customElementsManifest from "../custom-elements.json";

setCustomElementsManifest(customElementsManifest);


const preview: Preview = {
  decorators: [
    (story) => {
      return story();
    },
  ],

  parameters: {
    docs: {
      source: {
        excludeDecorators: true,
      },
    },
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
