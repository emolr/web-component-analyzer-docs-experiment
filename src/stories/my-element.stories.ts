import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import type { MyElement } from "../../src/my-element.ts";
import "../../src/my-element.ts";

const meta = {
  title: "Elements/MyElement",
  component: "my-element",
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<MyElement>;

export default meta;

type Story = StoryObj<MyElement>;

export const Default: Story = {
  render: () => {
    return html` <my-element></my-element> `;
  },
};

export const docsHint: Story = {
  render: () => {
    return html` <my-element docs-hint="Hello"></my-element> `;
  },
};

export const count: Story = {
  render: () => {
    return html` <my-element count="5"></my-element> `;
  },
};

export const size: Story = {
  render: () => {
    return html`
      <my-element size="small"></my-element>
      <my-element size="medium"></my-element>
      <my-element size="large"></my-element>
      <my-element id="element-change"></my-element>
    `;
  },
};
