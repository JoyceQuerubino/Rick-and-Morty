import React from 'react';
import { StatusBar } from 'expo-status-bar';
import AppLoading from 'expo-app-loading';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from 'styled-components';
import theme from './src/global/theme';
import {Provider} from 'react-redux';

import {
  useFonts, 
  Roboto_700Bold, 
  Roboto_400Regular, 
} from '@expo-google-fonts/roboto';

import MainRoute from './src/routes';
import { Store } from './src/redux/store';

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
      <Provider store={Store}>
      <NavigationContainer>
        <StatusBar style="dark"/>
        <MainRoute />
      </NavigationContainer>
      </Provider>
    </ThemeProvider>
  );
}
