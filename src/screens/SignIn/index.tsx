import React, { useContext } from "react";

import { RFValue } from "react-native-responsive-fontsize";

import { SigInSocialButton } from "@/components/SigInSocialButton";

import AppleSVG from "@/assets/apple.svg";
import GoogleSVG from "@/assets/google.svg";
import LogoSVG from "@/assets/logo.svg";

import {
  Container,
  Footer,
  FooterWrapper,
  Header,
  SignInTitle,
  Title,
  TitleWrapper,
} from "./styles";
import { useAuth } from "@/hooks/auth";

export function SignIn() {
  const { signInWithGoogle } = useAuth();

  async function handleSignInWithGoogle() {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.log(error);
    }
  }

  return (
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
          <SigInSocialButton
            title="Entrar com Google"
            svg={GoogleSVG}
            onPress={handleSignInWithGoogle}
          />
          <SigInSocialButton title="Entrar com Apple" svg={AppleSVG} />
        </FooterWrapper>
      </Footer>
    </Container>
  );
}
