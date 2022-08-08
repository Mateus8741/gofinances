import styled, { css } from "styled-components/native";

import { RectButton } from "react-native-gesture-handler";

import { RFValue } from "react-native-responsive-fontsize";

import { Feather } from "@expo/vector-icons";

interface IconProps {
  type: "up" | "down";
}

interface ContainerProps {
  type: "up" | "down";
  isActive: boolean;
}

export const Container = styled.View<ContainerProps>`
  width: 48%;



  border: ${({ isActive }) => (isActive ? 0 : 1)}px solid
    ${({ theme }) => theme.colors.text};
  border-radius: 5px;

  ${({ isActive, type }) =>
    isActive &&
    type === "up" &&
    css`
      background-color: ${({ theme }) => theme.colors.success_light};
    `}
  ${({ isActive, type }) =>
    isActive &&
    type === "down" &&
    css`
      background-color: ${({ theme }) => theme.colors.attention_light};
    `}
`;

export const Title = styled.Text`
  font-size: ${RFValue(14)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
`;

export const Button = styled<any>(RectButton)`
  flex-direction: row;
  align-items: center;
  justify-content: center;

  padding: 18px;
`;

export const Icon = styled<any>(Feather)<IconProps>`
  margin-right: 12px;
  font-size: ${RFValue(24)}px;

  color: ${({ theme, type }) =>
    type === "up" ? theme.colors.success : theme.colors.attention};
`;
