import React, { useState } from "react";

import { Input } from "@/components/Forms/Input";
import { Button } from "@/components/Forms/Button";
import { TransactionTypeButton } from "@/components/Forms/TransactionTypeButton";

import {
  Container,
  Fields,
  Header,
  InputForm,
  Title,
  TransactionsTypes,
} from "./styles";
import { CategorySelect } from "@/components/Forms/CategorySelect";

export function Register() {
  const [transactionType, setTransactionType] = useState("");

  function handleTransactionTypeSelect(type: "up" | "down") {
    setTransactionType(type);
  }

  return (
    <Container>
      <Header>
        <Title>Cadastro</Title>
      </Header>

      <InputForm>
        <Fields>
          <Input placeholder="Nome" />
          <Input placeholder="Nome" />

          <TransactionsTypes>
            <TransactionTypeButton
              type="up"
              title="Income"
              onPress={() => handleTransactionTypeSelect("up")}
              isActive={transactionType === "up"}
            />
            <TransactionTypeButton
              type="down"
              title="Outcome"
              onPress={() => handleTransactionTypeSelect("down")}
              isActive={transactionType === "down"}
            />
          </TransactionsTypes>

          <CategorySelect title="Categoria" />
        </Fields>

        <Button title="Enviar" />
      </InputForm>
    </Container>
  );
}
