import React, { FunctionComponent } from "react";
import { View, Button, Text } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";

type GameProps = {
    navigation:StackNavigationProp<
    {Home:undefined},
    'Home'
  >
  }
const GameScene:FunctionComponent<GameProps> = (props:GameProps)=> {
    return(
        <View>
            <Text>{"Holaaa"}</Text>
        </View>
    )
}

export default GameScene;