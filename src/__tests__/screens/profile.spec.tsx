import React from "react";
import { render } from "@testing-library/react-native";

import { Profile } from "@/screens/Profile";

describe("Profile", () => {
  it("test this input if work correctly", () => {
    const { getByPlaceholderText } = render(<Profile />);
    const input = getByPlaceholderText("Nome");

    expect(input.props.placeholder).toBeTruthy();
  });

  it("check is user date has been loaded", () => {
    const { getByTestId } = render(<Profile />);
    const input = getByTestId("input-name");
    const inputSurname = getByTestId("input-surname");

    expect(input.props.value).toEqual("Mateus");
    expect(inputSurname.props.value).toEqual("Tavares");
  });

  it("checks if title render correctly", () => {
    const { getByTestId } = render(<Profile />);
    const textTitle = getByTestId("text-title");

    expect(textTitle.props.children).toContain("Perfil");
  });
});
