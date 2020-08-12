import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React, {useState} from 'react';
import Home from './Home/Home';
import GameScene from './GameScreen/GameScene'
import Tablero from "./TableroCartas/Tablero";
import Cuarenta from "./Cuarenta/Cuarenta";
import ImageChat from "./ImageChat/ImageChat"

type AppParams ={
    Home:undefined,
    Game:undefined,
    Tablero:undefined,
    Cuarenta:undefined,
    ImageChat:undefined
}

const Stack = createStackNavigator<AppParams>();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerStyle: {
                        backgroundColor: '#f41e9e',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                }}
            >
                <Stack.Screen
                    name='Home'
                    component={Home}
                    options={{title: 'Juego de Cuarenta'}}
                />
                <Stack.Screen
                    name='Cuarenta'
                    component={Cuarenta}

                />
                <Stack.Screen
                    name='Game'
                    component={GameScene}
                />
                <Stack.Screen
                    name='Tablero'
                    component={Tablero}
                />
                <Stack.Screen name='ImageChat'
                              component={ImageChat}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}



