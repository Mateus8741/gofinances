import React, { useCallback, useEffect, useState } from "react";

import { HighLightCard } from "@/components/HighLightCard";
import { TransactionCard } from "@/components/TransactionCard";

import { TransactionCardProps } from "@/components/TransactionCard";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { useFocusEffect } from "@react-navigation/native";

import { useAuth } from "@/hooks/auth";

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
  Warning,
} from "./styles";

export interface DataListProps extends TransactionCardProps {
  id: string;
}

interface Props {
  total: string;
  lastTransaction: string;
}

interface CardData {
  entries: Props;
  expensive: Props;
  totalAmount: Props;
}

export function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);

  const [data, setData] = useState<DataListProps[]>([]);
  const [highlightCard, setHighlightCard] = useState<CardData>({} as CardData);

  const { signOut, user } = useAuth();

  function getLasttransactionDate(
    collection: DataListProps[],
    type: "positive" | "negative"
  ) {
    const lastTransaction = Math.max.apply(
      Math,
      collection
        .filter((transaction) => transaction.type === type)
        .map((transaction) => new Date(transaction.date).getTime())
    );
    const T = new Date(lastTransaction).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "long",
    });
    return T;
  }

  async function loadTransactions() {
    const dataKey = `@gofinances:transactions_user:${user.id}`;

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

    const lastTransactionsEntries = getLasttransactionDate(
      transactions,
      "positive"
    );
    const lastTransactionsExpensive = getLasttransactionDate(
      transactions,
      "negative"
    );
    const totalInterval = `${Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "long",
    }).format(new Date(transactions[0].date))} - ${
      lastTransactionsExpensive === "Invalid Date"
        ? "Hoje"
        : lastTransactionsExpensive
    }`;

    setHighlightCard({
      entries: {
        total: entriesTotal.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
        lastTransaction:
          lastTransactionsEntries === "Invalid Date"
            ? "Nenhuma"
            : `Última saída dia ${lastTransactionsEntries}`,
      },
      expensive: {
        total: expensiveTotal.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
        lastTransaction:
          lastTransactionsExpensive === "Invalid Date"
            ? "Nenhuma"
            : `Última saída dia ${lastTransactionsExpensive}`,
      },
      totalAmount: {
        total: (entriesTotal - expensiveTotal).toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
        lastTransaction: totalInterval,
      },
    });
    setIsLoading(false);
  }

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
            <Photo source={{ uri: user.photo }} />
            <User>
              <UserGreeting>Olá,</UserGreeting>
              <UserName>{user.name}</UserName>
            </User>
          </UserInfo>
          <LogoutButton onPress={signOut}>
            <Icon name="power" />
          </LogoutButton>
        </UserWraper>
      </Header>
      {isLoading ? (
        <Warning>Sem transações até agora 😢</Warning>
      ) : (
        <>
          <HighLightCards>
            {isLoading ? (
              <LoadingIndicator />
            ) : (
              <HighLightCard
                type="up"
                title="Entrada"
                amount={highlightCard.entries.total}
                lastTransaction={highlightCard.entries.lastTransaction}
              />
            )}
            {isLoading ? (
              <LoadingIndicator />
            ) : (
              <HighLightCard
                type="down"
                title="Saida"
                amount={highlightCard.expensive.total}
                lastTransaction={
                  highlightCard.expensive.lastTransaction.length === 0
                    ? "Nenhuma saída"
                    : highlightCard.expensive.lastTransaction
                }
              />
            )}
            {isLoading ? (
              <LoadingIndicator />
            ) : (
              <HighLightCard
                type="total"
                title="Total"
                amount={highlightCard.totalAmount.total}
                lastTransaction={highlightCard.totalAmount.lastTransaction}
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
        </>
      )}
    </Container>
  );
}
