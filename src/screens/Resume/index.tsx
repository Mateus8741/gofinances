import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { HistoryCard } from "@/components/HistoryCard";
import { Container, Content, Header, Title, Warning } from "./styles";
import { categories } from "@/utils/categories";

interface TransactionData {
  type: "positive" | "negative";
  name: string;
  amount: string;
  category: string;
  date: string;
}

interface CategoryData {
  key: string;
  name: string;
  total: string;
  color: string;
}

export function Resume() {
  const [totalByCategories, setTotalByCategories] = useState<CategoryData[]>(
    []
  );

  async function loadData() {
    const dataKey = "@gofinances:transactions";
    const response = await AsyncStorage.getItem(dataKey);
    const responseFormated = response ? JSON.parse(response) : [];

    const expensives = responseFormated.filter(
      (expensive: TransactionData) => expensive.type === "negative"
    );

    const totalByCategory = [];

    categories.forEach((category) => {
      let categorySum = 0;

      expensives.forEach((expensive: TransactionData) => {
        if (expensive.category === category.key) {
          categorySum += parseFloat(expensive.amount);
        }
      });

      if (categorySum > 0) {
        totalByCategory.push({
          key: category.key,
          name: category.name,
          total: categorySum
            .toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })
            .replace("R$", "R$ "),
          color: category.color,
        });
      }
    });

    setTotalByCategories(totalByCategory);
  }

  useEffect(() => {
    loadData();
  }, []);

  return (
    <Container>
      <Header>
        <Title>Resumo por categoria</Title>
      </Header>
      <Content>
        {totalByCategories.length === 0 ? (
          <Warning>Nenhuma transação cadastrada</Warning>
        ) : (
          totalByCategories.map((category: CategoryData, index) => (
            <HistoryCard
              key={category.key}
              title={category.name}
              amount={category.total}
              color={category.color}
            />
          ))
        )}
      </Content>
    </Container>
  );
}
