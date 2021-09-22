import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './views/Home';
import CharacterScreen from './views/Character';
import FavoritesScreen from './views/Favorites'; 

const Stack = createNativeStackNavigator();

const MainRoute = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Characters" component={CharacterScreen} />
      <Stack.Screen name="Favorites" component={FavoritesScreen} />
    </Stack.Navigator>
  );
}

export default MainRoute;
