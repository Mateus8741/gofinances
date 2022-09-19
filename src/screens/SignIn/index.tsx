import React, { useState } from "react";

import { RFValue } from "react-native-responsive-fontsize";

import { SigInSocialButton } from "@/components/SigInSocialButton";

import { useAuth } from "@/hooks/auth";
import { LoadingIndicator } from "../Dashboard/styles";

import AppleSVG from "@/assets/apple.svg";
import GoogleSVG from "@/assets/google.svg";
import LogoSVG from "@/assets/logo.svg";

import SkeletonPlaceholder from "react-native-skeleton-placeholder";

import {
  Container,
  Footer,
  FooterWrapper,
  Header,
  SignInTitle,
  Title,
  TitleWrapper,
} from "./styles";
import { Platform, View } from "react-native";

export function SignIn() {
  const { signInWithGoogle, signInWithApple } = useAuth();

  const [isLoading, setIsLoading] = useState(false);

  async function handleSignInWithGoogle() {
    try {
      setIsLoading(true);
      return await signInWithGoogle();
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }
  async function handleSignInWithApple() {
    try {
      setIsLoading(true);
      return await signInWithApple();
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }

  return (
    <>
      {isLoading ? (
        <SkeletonPlaceholder>
          <Header>
            <TitleWrapper>
              <LogoSVG width={RFValue(120)} height={RFValue(68)} />
            </TitleWrapper>
            <Title>
              Controle suas{`\n`}
              finanças de forma{`\n`}
              muito simples
            </Title>

            <SignInTitle>Faça seu login com uma das contas abaixo</SignInTitle>
          </Header>
        </SkeletonPlaceholder>
      ) : (
        <Container>
          <Header>
            <TitleWrapper>
              <LogoSVG width={RFValue(120)} height={RFValue(68)} />
            </TitleWrapper>
            <Title>
              Controle suas{`\n`}
              finanças de forma{`\n`}
              muito simples
            </Title>

            <SignInTitle>Faça seu login com uma das contas abaixo</SignInTitle>
          </Header>

          <Footer>
            <FooterWrapper>
              {Platform.OS === "android" ? (
                <SigInSocialButton
                  title={
                    isLoading ? <LoadingIndicator /> : "Entrar com o Google"
                  }
                  svg={GoogleSVG}
                  onPress={handleSignInWithGoogle}
                />
              ) : (
                <SigInSocialButton
                  title={
                    isLoading ? <LoadingIndicator /> : "Entrar com o Apple"
                  }
                  svg={AppleSVG}
                  onPress={handleSignInWithApple}
                />
              )}
            </FooterWrapper>
          </Footer>
        </Container>
      )}
    </>
  );
}
