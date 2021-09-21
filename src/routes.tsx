import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './views/Home';
import CharacterScreen from './views/CharacterScreen';

const Stack = createNativeStackNavigator();

const MainRoute = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Personagens" component={CharacterScreen} />
    </Stack.Navigator>
  );
}

export default MainRoute;
