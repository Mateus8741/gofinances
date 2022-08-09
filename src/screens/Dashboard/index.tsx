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
  LoadingIndicator,
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

interface Props {
  total: string;
}

interface CardData {
  entries: Props;
  expensive: Props;
  totalAmount: Props;
}

export function Dashboard() {
  const navigation = useNavigation();

  const [isLoading, setIsLoading] = useState(true);

  const [data, setData] = useState<DataListProps | any>([]);
  const [highlightCard, setHighlightCard] = useState<CardData>({} as CardData);

  async function loadTransactions() {
    const dataKey = "@gofinances:transactions";

    const reponse = await AsyncStorage.getItem(dataKey);
    const transactions = reponse ? JSON.parse(reponse) : [];

    let entriesTotal = 0;
    let expensiveTotal = 0;

    const transactionsFormated: DataListProps[] = transactions.map(
      (transaction: DataListProps) => {
        if (transaction.type === "positive") {
          entriesTotal += Number(transaction.amount);
        } else {
          expensiveTotal += Number(transaction.amount);
        }

        const amount = Number(transaction.amount)
          .toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })
          .replace("R$", "R$ ");
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
    setHighlightCard({
      entries: {
        total: entriesTotal.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
      },
      expensive: {
        total: expensiveTotal.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
      },
      totalAmount: {
        total: (entriesTotal - expensiveTotal).toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
      },
    });
    setIsLoading(false);
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
        {isLoading ? (
          <LoadingIndicator />
        ) : (
          <HighLightCard
            type="up"
            title="Entrada"
            amount={highlightCard.entries.total}
            lastTransaction="Última entrada dia 13 de abril"
          />
        )}
        {isLoading ? (
          <LoadingIndicator />
        ) : (
          <HighLightCard
            type="down"
            title="Saida"
            amount={highlightCard?.expensive?.total}
            lastTransaction="Última entrada dia 13 de abril"
          />
        )}
        {isLoading ? (
          <LoadingIndicator />
        ) : (
          <HighLightCard
            type="total"
            title="Total"
            amount={highlightCard?.totalAmount?.total}
            lastTransaction="Última entrada dia 13 de abril"
          />
        )}
      </HighLightCards>
      <Transactions>
        <Title>Listagem</Title>
        {isLoading ? (
          <LoadingIndicator />
        ) : (
          <TransactionsList
            data={data}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <TransactionCard data={item} />}
          />
        )}
      </Transactions>
    </Container>
  );
}
