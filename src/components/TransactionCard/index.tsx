import React from "react";
import { categories } from "@/utils/categories";
import {
  Amount,
  Category,
  CategoryName,
  Container,
  Footer,
  Icon,
  Title,
  Date,
} from "./styles";

export interface TransactionCardProps {
  type: "up" | "down";
  name: string;
  amount: string;
  category: string;
  date: string;
}

interface Props {
  data: TransactionCardProps;
}

export function TransactionCard({ data }: Props) {
  const [category] = categories.filter((item) => item.name === data.category);
  return (
    <Container>
      <Title>{data.name}</Title>
      {data.amount ? (
        <Amount type={data.type}>
          {data.type === "up" ? "+" : "-"} {data.amount}
        </Amount>
      ) : (
        <Amount>R$ 0,00</Amount>
      )}

      <Footer>
        <Category>
          <Icon name={category.icon} />
          <CategoryName>{category.name}</CategoryName>
        </Category>
        <Date>{data.date}</Date>
      </Footer>
    </Container>
  );
}
