import React, { useState } from "react";

import { Input } from "@/components/Forms/Input";
import { Button } from "@/components/Forms/Button";
import { TransactionTypeButton } from "@/components/Forms/TransactionTypeButton";
import { CategorySelectButton } from "@/components/Forms/CategorySelectButton";
import { CategorySelect } from "../CategorySelect";

import {
  Container,
  Fields,
  Header,
  InputForm,
  ModalSelect,
  Title,
  TransactionsTypes,
} from "./styles";

export function Register() {
  const [transactionType, setTransactionType] = useState("");
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [category, setCategory] = useState({
    key: "category",
    name: "Categoria",
  });

  function handleTransactionTypeSelect(type: "up" | "down") {
    setTransactionType(type);
  }

  function handleOpenSelectCategoryModal() {
    setCategoryModalOpen(false);
  }
  function handleCloseSelectCategoryModal() {
    setCategoryModalOpen(true);
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

          <CategorySelectButton
            title="Categoria"
            onPress={() => handleCloseSelectCategoryModal()}
          />
        </Fields>

        <Button title="Enviar" />
      </InputForm>

      <ModalSelect visible={categoryModalOpen}>
        <CategorySelect
          category={category}
          setCategory={setCategory}
          closeSelectCategory={() => handleOpenSelectCategoryModal()}
        />
      </ModalSelect>
    </Container>
  );
}
