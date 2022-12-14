import React from "react";

import { RectButtonProps } from "react-native-gesture-handler";
import { Container, Title } from "./styles";

interface InputProps extends RectButtonProps {
  title: string;
  onPress: () => void;
}

export function Button({ title, onPress, ...rest }: InputProps) {
  return (
    <Container onPress={onPress} {...rest}>
      <Title>{title}</Title>
    </Container>
  );
}
