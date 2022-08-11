import styled from "styled-components/native";
import { Platform, StatusBar } from "react-native";

export const Status = styled<any>(StatusBar).attrs({
  barStyle: "light-content",
  backgroundColor: Platform.OS === "android" ? "#5636D3" : null,
})``;

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const Text = styled.Text`
  color: #000000;
`;
