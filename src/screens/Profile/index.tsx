import React from "react";

import { Botao, Container, Texto, TextoInput } from "./styles";

export function Profile(): JSX.Element {
  return (
    <Container>
      <Texto>Perfil</Texto>
      <TextoInput placeholder="Nome" autoCorrect={false} />
      <TextoInput placeholder="Sobrenome" autoCorrect={false} />
      <Botao title="Salvar" onPress={() => {}} />
    </Container>
  );
}
