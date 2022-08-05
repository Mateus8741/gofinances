import React from "react";

import {
  Amount,
  Container,
  Footer,
  Header,
  Icon,
  LastTransaction,
  Title,
} from "./styles";

interface Props {
  type?: "up" | "down" | "total";
  title: string;
  amount?: string;
  lastTransaction: string;
}

const icon = {
  up: "arrow-up-circle",
  down: "arrow-down-circle",
  total: "dollar-sign",
};

export function HighLightCard({ type, title, amount, lastTransaction }: Props) {
  return (
    <Container type={type}>
      <Header>
        <Title type={type}>{title}</Title>
        <Icon name={icon[type]} type={type} />
      </Header>

      <Footer>
        {amount ? 
          <Amount type={type}>R$ {amount}</Amount>
         : 
          <Amount>R$ 0,00</Amount>
        }
        <LastTransaction type={type}>{lastTransaction}</LastTransaction>
      </Footer>
    </Container>
  );
}
