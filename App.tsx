import React from "react";

import theme from "@global/styles";

import { Routes } from "@/routes";

import { Text, Status, Container } from "./stylesApp";

import { LoadingIndicator } from "@/screens/Dashboard/styles";

import { GestureHandlerRootView } from "react-native-gesture-handler";

import { ThemeProvider } from "styled-components";

import { AuthProvider, useAuth } from "@/hooks/auth";

import { useColorScheme } from "react-native";

import "intl";
import "intl/locale-data/jsonp/pt-BR";

import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
  });

  const { storageLoading } = useAuth();

  const colorScheme = useColorScheme();

  const themes = theme[colorScheme] || theme.light;

  if (!fontsLoaded || storageLoading) {
    return (
      <Container>
        <Text>
          <LoadingIndicator />
        </Text>
      </Container>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider theme={themes}>
        <Status />
        <AuthProvider>
          <Routes />
        </AuthProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
