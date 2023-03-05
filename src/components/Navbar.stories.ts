import type { Meta, StoryObj } from "@storybook/react";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./NavBar";

const meta: Meta<typeof Navbar> = {
  title: "Navbar",
  component: Navbar,
};

export default meta;
type Story = StoryObj<typeof Navbar>;

export const User: Story = {
  args: {
    user: "user",
  },
};
export const NoUser: Story = {
  args: {
    user: undefined,
  },
};
export const Admin: Story = {
  args: {
    user: "admin",
  },
};
