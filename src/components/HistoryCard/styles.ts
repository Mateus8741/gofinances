import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

interface CotainerProps {
  color: string;
}

export const Container = styled.View<CotainerProps>`
  width: 100%;

  background-color: ${({ theme }) => theme.colors.shape};

  flex-direction: row;
  justify-content: space-between;

  padding: 13px 24px;

  border-top-left-radius: 5px;
  border-left-width: 5px;
  border-left-color: ${({ color }) => color};

  border-top-width: 1px;
  border-top-color: ${({ color }) => color};

  border-bottom-right-radius: 5px;
  border-bottom-width: 4px;
  border-bottom-color: ${({ color }) => color};

  border-right-width: 1px;
  border-right-color: ${({ color }) => color};

  margin-bottom: 8px;
`;

export const Title = styled.Text<CotainerProps>`
  font-size: ${RFValue(15)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ color }) => color};
`;

export const Amount = styled.Text`
  font-size: ${RFValue(15)}px;
  color: ${({ theme }) => theme.colors.attention};
  font-family: ${({ theme }) => theme.fonts.regular};
`;
