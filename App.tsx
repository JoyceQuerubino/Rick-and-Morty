import React from 'react';
import { StatusBar } from 'expo-status-bar';
import AppLoading from 'expo-app-loading';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from 'styled-components';

import theme from './src/global/theme';
import {
  useFonts, 
  Roboto_700Bold,
  Roboto_400Regular, 
} from '@expo-google-fonts/roboto';

import MainRoute from './src/routes';

export default function App() {

  const [fontsLoaded] = useFonts({
    Roboto_700Bold, 
    Roboto_400Regular, 
  });

  if(!fontsLoaded){
    return <AppLoading />
  }

  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <StatusBar style="light"/>
        <MainRoute />
      </NavigationContainer>
    </ThemeProvider>
  );
}
