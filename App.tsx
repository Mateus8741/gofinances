import React, { useCallback, useEffect, useState } from 'react';

import * as SplashScreen from 'expo-splash-screen';
import theme from '@global/styles/theme';

import { ThemeProvider } from 'styled-components';
import { useFonts, Poppins_400Regular, Poppins_500Medium, Poppins_700Bold } from '@expo-google-fonts/poppins';


import { Container } from './stylesApp';
import { Register } from '@/screens/Register';




export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
  })

  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
        fontsLoaded;
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayout = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
      fontsLoaded;
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <Container onLayout={onLayout}>
      <ThemeProvider theme={theme} >
        <Register />
      </ThemeProvider>
    </Container>
  );
}