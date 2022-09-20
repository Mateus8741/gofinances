import styled from "styled-components";
import darkTheme from "@global/styles/darkTheme/darkTheme";

declare module "styled-components" {
    type ThemeType = typeof darkTheme
    export interface DefaultTheme extends ThemeType {}
}