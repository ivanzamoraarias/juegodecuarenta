import React, {useEffect, useState} from "react";
import {Image, View, StyleSheet, Text, TextInput, TouchableHighlight, ScrollView} from "react-native";
import {WebView} from "react-native-webview";
import {FirebaseService} from "../Firebase/Firebase";
import MemoryService from "../Storage/Memory/MemoryService";


const imageUri: string = "https://i.pinimg.com/originals/ed/83/7a/ed837acb91e3ee1a42c46538b509b504.jpg";
//https://1.bp.blogspot.com/-slPQMdRIiE0/XchjiHQcOgI/AAAAAAAALm8/OK-GsqynYm4qhL7DuCvnyzN24etS76jOACKgBGAsYHg/s1600/IMG_20191028_130922.jpg

let algo: string = "";
const ImageChat = (props:any) => {

    useEffect(() => {
        MemoryService.addMemoryKey("messages");
    }, []);

    //todo create a reducer for this part
    const [ownMessage, setOwnMessage] = useState("");
    const [messages, setMessages] = useState([""]);
    const [partnerName, setPartnerName] = useState("");
    const [ownName, setOwnName] = useState("");
    const [partnerMessage, setPartnerMessage] = useState("");


    useEffect(() => {
        FirebaseService
            .initializeInstance();
        FirebaseService
            .disconnectFirebase();
        FirebaseService
            .listenNewPartnerMessage(
                partnerName,
                updateFromFirebase);

    }, [partnerName])

    useEffect(() => {
        setMessages([...MemoryService.getElementByKey("messages")]);
    }, [partnerMessage]);

    const updateFromFirebase = (value: { lastOne: string }) => {
        if (!value)
            return;

        setPartnerMessage(value.lastOne);
        MemoryService.pushElementToKey("messages", `${value.lastOne}`);
    }


    const appendMessage = (message: string) => {
        setOwnMessage(message);
    }
    const addMessages = () => {
        const newMessage: string = `${ownMessage}`;

        FirebaseService.storeNewOwnMessage(ownName, ownMessage);
        MemoryService.pushElementToKey("messages", newMessage);
        setMessages([...MemoryService.getElementByKey("messages")]);


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
                        {messages.map((m: string) => `\n${m}`)}
                    </Text>
                </ScrollView>

            </View>
            <View style={styles.userTextInput}>
                <TextInput
                    style={styles.textToSend}
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
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
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
        height: '20%'
    },
    text: {

        fontSize: 20,
        fontWeight: "bold"
    },
    userTextInput:{
        flex:1,
        flexDirection: 'row',
        textAlign: 'center',
        height:"30%"
    },
    textToSend: {
        width:"60%",
        padding: 1,
        height:"30%",
        justifyContent: "space-between"
    },
    button: {
        backgroundColor: "#F194FF",
        borderRadius: 20,
        padding: 1,
        marginTop:5,
        elevation: 2,
        width:"30%",
        height:"30%",
        textAlign:"center",
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    messagesContainer: {
        height: '40%'
    }
});

export default ImageChat;