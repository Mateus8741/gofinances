import React, { useState } from "react";

import { CategorySelect } from "../CategorySelect";

import { Alert, Keyboard } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

import uuid from "react-native-uuid";

import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { Button } from "@/components/Forms/Button";
import { TransactionTypeButton } from "@/components/Forms/TransactionTypeButton";
import { CategorySelectButton } from "@/components/Forms/CategorySelectButton";
import { InputForm } from "@/components/Forms/InputForm";

import {
  Container,
  Fields,
  Header,
  Form,
  ModalSelect,
  Title,
  TransactionsTypes,
  WithoutFeedback,
} from "./styles";
import { useAuth } from "@/hooks/auth";

interface FormData {
  name: string;
  amount: number;
}

const schema = Yup.object().shape({
  name: Yup.string().required("Campo obrigatório"),
  amount: Yup.number()
    .required("Campo obrigatório")
    .typeError("Informe um valor numérico")
    .positive("Informe um valor positivo"),
});

export function Register() {
  const navigation = useNavigation<any>();

  const [transactionType, setTransactionType] = useState("");
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);

  const [category, setCategory] = useState({
    key: "category",
    name: "Categoria",
  });

  const { user } = useAuth();

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  function handleTransactionTypeSelect(type: "positive" | "negative") {
    setTransactionType(type);
  }

  function handleOpenSelectCategoryModal() {
    setCategoryModalOpen(true);
  }
  function handleCloseSelectCategoryModal() {
    setCategoryModalOpen(false);
  }

  async function handleRegister(form: FormData) {
    if (!transactionType) return Alert.alert("Selecione o tipo de transação");
    if (category.key === "category")
      return Alert.alert("Selecione a categoria da transação");

    const newTransaction = {
      id: String(uuid.v4()),
      name: form.name,
      amount: form.amount,
      type: transactionType,
      category: category.name,
      date: new Date(),
    };

    try {
      const dataKey = `@gofinances:transactions_user:${user.id}`;
      const data = await AsyncStorage.getItem(dataKey);
      const currentData = data ? JSON.parse(data) : [];

      const dataFormated = [...currentData, newTransaction];

      await AsyncStorage.setItem(dataKey, JSON.stringify(dataFormated));

      Keyboard.dismiss();
      setTransactionType("");
      setCategory({ key: "category", name: "Categoria" });
      reset();
      navigation.navigate("Listagem");
    } catch (error) {
      console.log(error);
      Alert.alert("Erro ao cadastrar transação");
    }
  }

  return (
    <WithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <Container>
        <Header>
          <Title>Cadastro</Title>
        </Header>

        <Form>
          <Fields>
            <InputForm
              name="name"
              placeholder="Nome"
              control={control}
              autoCapitalize="sentences"
              autoCorrect={false}
              error={errors.name && errors.name.message}
            />
            <InputForm
              name="amount"
              placeholder="Valor"
              control={control}
              keyboardType="numeric"
              error={errors.amount && errors.amount.message}
            />

            <TransactionsTypes>
              <TransactionTypeButton
                type="up"
                title="Income"
                onPress={() => handleTransactionTypeSelect("positive")}
                isActive={transactionType === "positive"}
              />
              <TransactionTypeButton
                type="down"
                title="Outcome"
                onPress={() => handleTransactionTypeSelect("negative")}
                isActive={transactionType === "negative"}
              />
            </TransactionsTypes>

            <CategorySelectButton
              title={category.name}
              onPress={() => handleOpenSelectCategoryModal()}
            />
          </Fields>

          <Button title="Enviar" onPress={handleSubmit(handleRegister)} />
        </Form>

        <ModalSelect visible={categoryModalOpen}>
          <CategorySelect
            category={category}
            setCategory={setCategory}
            closeSelectCategory={() => handleCloseSelectCategoryModal()}
          />
        </ModalSelect>
      </Container>
    </WithoutFeedback>
  );
}
