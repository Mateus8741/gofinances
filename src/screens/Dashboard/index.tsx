import React from "react";

import { HighLightCard } from "@/components/HighLightCard";
import { TransactionCard } from "@/components/TransactionCard";

import { TransactionCardProps } from "@/components/TransactionCard";

import {
  Container,
  Header,
  HighLightCards,
  Icon,
  LogoutButton,
  Photo,
  Title,
  Transactions,
  TransactionsList,
  User,
  UserGreeting,
  UserInfo,
  UserName,
  UserWraper,
} from "./styles";

export interface DataListProps extends TransactionCardProps {
  id: string;
}

export function Dashboard() {
  const data = [
    {
      id: 1,
      type: "positive",
      title: "Desenvolvimento de site",
      amount: "12.000,00",
      category: { name: "Vendas", icon: "dollar-sign" },
      date: "13/04/2022",
    },
    {
      id: 2,
      type: "negative",
      title: "Hamburgueria Pizzy",
      amount: "59,00",
      category: { name: "Alimentação", icon: "coffee" },
      date: "10/04/2022",
    },
    {
      id: 3,
      type: "negative",
      title: "Aluguel do apartamento",
      amount: "12.000,00",
      category: { name: "Casa", icon: "shopping-bag" },
      date: "12/04/2022",
    },
  ];

  return (
    <Container>
      <Header>
        <UserWraper>
          <UserInfo>
            <Photo
              source={{
                uri: "https://avatars.githubusercontent.com/u/62652109?v=4",
              }}
            />
            <User>
              <UserGreeting>Olá,</UserGreeting>
              <UserName>Mateus</UserName>
            </User>
          </UserInfo>
          <LogoutButton onPress={() => {}}>
            <Icon name="power" />
          </LogoutButton>
        </UserWraper>
      </Header>
      <HighLightCards>
        <HighLightCard
          type="up"
          title="Entrada"
          amount="17.400,00"
          lastTransaction="Última entrada dia 13 de abril"
        />
      </HighLightCards>
      <Transactions>
        <Title>Listagem</Title>
        <TransactionsList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <TransactionCard data={item} />}
        />
      </Transactions>
    </Container>
  );
}
