import React, { useState, ReactComponentElement, FunctionComponent } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { StackNavigationProp } from "@react-navigation/stack";

type HomeProps = {
  navigation:StackNavigationProp<
  {Game:undefined},
  'Game'
>
}

const Home:FunctionComponent<HomeProps> = (props:HomeProps) => {
    const [titleText, setTitleText] = useState("Whar is my title");

    return(
    <View style={styles.container}>
        <View>
          <Text>{"Listo para jugar Cuarenta ? "}</Text>
        </View>
        <View style={styles.button}>
          <Button title="Continue" onPress={() => {
            setTitleText("Cuarenta");
          }} />
          <View style={styles.button}>
            <Button title="New Game" onPress={() => { 
              console.log("HOLAAANNNNENENENE")
              props.navigation.navigate('Game')
            }}></Button>
          </View>
          <View style={styles.button}>
            <Button title="Credits" onPress={() => { }}></Button>
          </View>
        </View>
      </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#9FA8DA',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      height: '100%'
  
    },
    button: {
      marginTop: 10,
      borderColor: "black"
  
    }
  });

  export default Home;