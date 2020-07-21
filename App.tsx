import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useState } from 'react';
import Home from './Home/Home';
import GameScene from './GameScreen/GameScene'

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name='Home'
          component={Home}
          options={{ title: 'Juego de Cuarenta' }}
        />
        <Stack.Screen
          name='Game'
          component={GameScene}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


