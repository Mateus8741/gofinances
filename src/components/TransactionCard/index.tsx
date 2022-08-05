import React from "react";
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

interface CategoryProps {
  name: string;
  icon: string;
}

export interface TransactionCardProps {
  type: "positive" | "negative";
  title: string;
  amount: string;
  category: CategoryProps;
  date: string;
}

interface Props {
  data: TransactionCardProps;
}

export function TransactionCard({ data }: Props) {
  return (
    <Container>
      <Title>{data.title}</Title>
      {data.amount ? (
        <Amount type={data.type}>
          {data.type === "positive" ? "+" : "-"} R$ {data.amount}
        </Amount>
      ) : (
        <Amount>R$ 0,00</Amount>
      )}

      <Footer>
        <Category>
          <Icon name={data.category.icon} />
          <CategoryName>{data.category.name}</CategoryName>
        </Category>
        <Date>{data.date}</Date>
      </Footer>
    </Container>
  );
}
