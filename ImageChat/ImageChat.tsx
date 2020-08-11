import React, {useEffect, useState} from "react";
import {Image, View, StyleSheet, Text, TextInput, TouchableHighlight, ScrollView} from "react-native";
import {WebView} from "react-native-webview";
import {FirebaseService} from "../Firebase/Firebase";

const imageUri: string = "https://i.pinimg.com/originals/ed/83/7a/ed837acb91e3ee1a42c46538b509b504.jpg";
//https://1.bp.blogspot.com/-slPQMdRIiE0/XchjiHQcOgI/AAAAAAAALm8/OK-GsqynYm4qhL7DuCvnyzN24etS76jOACKgBGAsYHg/s1600/IMG_20191028_130922.jpg

const ImageChat = () => {
    const [ownMessage, setOwnMessage] = useState("");
    const [messages, setMessages] = useState([""]);
    const [partnerName, setPartnerName] = useState("");
    const [ownName, setOwnName] = useState("");

    useEffect(() => {
        FirebaseService.initializeInstance();
        FirebaseService
            .disconnectFirebase();
        FirebaseService
            .listenNewPartnerMessage(
                partnerName,
                (value: { lastOne: string }) => {
                    if(!value)
                        return;
                    // @ts-ignore
                    let array: string [] = [...messages];
                    array.push(`${value.lastOne}`);


                    setMessages(array);
                });

    }, [partnerName])


    const appendMessage = (message: string) => {
        setOwnMessage(message);
    }
    const addMessages = () => {
        const newMessage:string = `${ownMessage}`;
        // @ts-ignore
        setMessages([...messages, newMessage]);
        FirebaseService.storeNewOwnMessage(ownName, ownMessage);
    }
    const getMessagesStringAsStack = () => {
        let result: string = "";

        messages.forEach((m: string) => {
            result = `${result}\n${m}`;
        });
        return result;
    }
    return (
        <View style={styles.container}>
            <TextInput
                placeholder={"Tu amigo"}
                onChangeText={(val: string) => setPartnerName(val)}
                value={partnerName}
            />
            <TextInput
                placeholder={"Tu nombre"}
                onChangeText={(val: string) => setOwnName(val)}
                value={ownName}
            />
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
            <TouchableHighlight
                style={styles.button}
                onPress={addMessages}
            >
                <Text>
                    {"Enviar"}
                </Text>
            </TouchableHighlight>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 10,
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
    messagesContainer: {
        height: '50%'
    }
});

export default ImageChat;