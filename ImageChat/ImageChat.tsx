import React, {useState} from "react";
import {Image, View, StyleSheet, Text, TextInput, TouchableHighlight, ScrollView} from "react-native";
import {WebView} from "react-native-webview";
import {storeNewOwnMessage} from "../Firebase/Firebase";

const imageUri: string ="https://i.pinimg.com/originals/ed/83/7a/ed837acb91e3ee1a42c46538b509b504.jpg";
//https://1.bp.blogspot.com/-slPQMdRIiE0/XchjiHQcOgI/AAAAAAAALm8/OK-GsqynYm4qhL7DuCvnyzN24etS76jOACKgBGAsYHg/s1600/IMG_20191028_130922.jpg

const ImageChat = () => {
    const [ownMessage, setOwnMessage] = useState("");
    const [messages, setMessages] = useState(["test"]);

    const appendMessage = (message: string) => {
        setOwnMessage(message);
    }
    const addMessages = () => {

        // @ts-ignore
        setMessages([...messages, ownMessage]);
        storeNewOwnMessage("ivan", ownMessage);
    }
    const getMessagesStringAsStack = () => {
        let result: string = "";

        messages.forEach((m: string) => {
            result = `${result}\n${m}`;
        });
        console.log(result);
        return result;
    }
    return (
        <View style={styles.container}>

            <Image
                style={styles.logo}
                source={{
                    uri: imageUri
                }}/>
            <View style={styles.messagesContainer}>
                <ScrollView>
                    <Text style={styles.text}>
                        {getMessagesStringAsStack()}
                    </Text>
                </ScrollView>
            </View>

            <TextInput
                placeholder={"Escribe tu mensaje aqui"}
                onChangeText={appendMessage}
                value={ownMessage}

            />
            <TouchableHighlight style={styles.button} onPress={addMessages}>
                <Text>{"Enviar"}</Text>
            </TouchableHighlight>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 50,
        paddingLeft: 50,
        paddingRight: 50
    },
    tinyLogo: {
        width: 50,
        height: 50,
    },
    photoContainer: {
        flex: 1,
        width: '100%',
        height: '40%'
    },
    logo: {
        width: '100%',
        height: '30%'
    },
    text: {

        fontSize: 20,
        fontWeight: "bold"
    },
    button: {
        backgroundColor: "#F194FF",
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    messagesContainer:{
        height:'50%'
    }
});

export default ImageChat;