import React from "react";
import { render } from "@testing-library/react-native";

import { Profile } from "@/screens/Profile";

test("test this input if work correctly", () => {
  const { debug } = render(<Profile />);
  debug()
});
