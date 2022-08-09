import React, { useCallback, useEffect, useState } from "react";

import { HighLightCard } from "@/components/HighLightCard";
import { TransactionCard } from "@/components/TransactionCard";

import { TransactionCardProps } from "@/components/TransactionCard";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { useFocusEffect } from "@react-navigation/native";

import { useNavigation } from "@react-navigation/native";

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
  const navigation = useNavigation();

  const [data, setData] = useState<DataListProps | any>([]);

  async function loadTransactions() {
    const dataKey = "@gofinances:transactions";

    const reponse = await AsyncStorage.getItem(dataKey);
    const transactions = reponse ? JSON.parse(reponse) : [];

    const transactionsFormated: DataListProps[] = transactions.map(
      (transaction: DataListProps) => {
        const amount = Number(transaction.amount).toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        });
        const date = Intl.DateTimeFormat("pt-BR", {
          day: "2-digit",
          month: "2-digit",
          year: "2-digit",
        }).format(new Date(transaction.date));

        return {
          id: transaction.id,
          name: transaction.name,
          amount,
          type: transaction.type,
          category: transaction.category,
          date,
        };
      }
    );
    setData(transactionsFormated);
  }

  useEffect(() => {
    loadTransactions();
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadTransactions();
    }, [])
  );

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
          data={data.sort((a, b) => {
            return a.date < b.date ? 1 : -1;
          })}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <TransactionCard data={item} />}
        />
      </Transactions>
    </Container>
  );
}
