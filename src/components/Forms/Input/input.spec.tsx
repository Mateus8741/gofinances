import React from "react";
import { render } from "@testing-library/react-native";

import { ThemeProvider } from "styled-components/native";
import theme from "@/global/styles/theme";

import { Input } from "./index";

function Providers({children}: {children: React.ReactNode}) {
  return (
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>
    )
}
    
describe("Input Component", () => {
  it("border color focus on work correctly", () => {
    const { getByTestId } = render(
      <Input
        testID="input-email"
        placeholder="E-mail"
        keyboardType="email-address"
        autoCorrect={false}
        active
      />, {
        wrapper: Providers
      }
    );
    const inputComponent = getByTestId("input-email");
    expect(inputComponent.props.style[0].borderColor).toEqual(theme.colors.attention);
    expect(inputComponent.props.style[0].borderWidth).toEqual(3);
  });
});
