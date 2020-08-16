import React, {createRef, useEffect, useReducer, useRef, useState} from "react";
import {Image, View, StyleSheet, Text, TextInput, TouchableHighlight, ScrollView} from "react-native";
import {FirebaseService} from "../Firebase/Firebase";
import MemoryService from "../Storage/Memory/MemoryService";
import Reducer from "../Reducer/ImageChatReducer/Reducer";
import {initialState} from "../Reducer/ImageChatReducer/State";
import Actions from "../Reducer/ImageChatReducer/Actions";
import ImageEvents from "../Reducer/ImageChatReducer/Events";


const imageUri: string = "https://i.pinimg.com/originals/ed/83/7a/ed837acb91e3ee1a42c46538b509b504.jpg";

const ImageChat = (props:any) => {
    const [state, dispatch] = useReducer(Reducer, initialState);
    const scrollViewRef = createRef<ScrollView>();

    useEffect(() => {
        MemoryService
            .addMemoryKey("messages");
    }, []);


    useEffect(() => {
        FirebaseService
            .initializeInstance();
        FirebaseService
            .disconnectFirebase();
        FirebaseService
            .listenNewPartnerMessage(
                state.partnerName,
                updateFromFirebase);

    }, [state.partnerName])

    useEffect(() => {
        dispatch(
            ImageEvents
                .GetEventForSetMessages(
                    MemoryService.getElementByKey("messages")
                )
        );
    }, [state.partnerMessage]);

    const updateFromFirebase = (value: { lastOne: string }) => {
        if (!value)
            return;

        dispatch({type:Actions.setPartnerMessage,stringValue:value.lastOne});
        MemoryService.pushElementToKey("messages", `${value.lastOne}`);
    }


    const appendMessage = (message: string) => {
        //setOwnMessage(message);
        dispatch({type:Actions.setOwnMessage, stringValue:message});
    }
    const addMessages = () => {
        const newMessage: string = `${state.ownMessage}`;

        FirebaseService.storeNewOwnMessage(state.ownName, state.ownMessage);
        MemoryService.pushElementToKey("messages", newMessage);
        dispatch({type:Actions.setMessages, arrayValue:[...MemoryService.getElementByKey("messages")]})
        dispatch({type:Actions.setOwnMessage, stringValue:""});

    }

    const scrollToButton= ()=> {
        if(scrollViewRef.current === null)
            return;
        scrollViewRef.current.scrollToEnd({animated: true})
    }


    return (
        <View style={styles.container}>
            <TextInput
                placeholder={"Tu amigo"}
                onChangeText={(val: string) => {
                    dispatch({type:Actions.setPartnerName,stringValue:val});
                }}
                value={state.partnerName}
            />
            <TextInput
                placeholder={"Tu nombre"}
                onChangeText={(val: string) => {
                    dispatch({type:Actions.setOwnName, stringValue:val})
                }}
                value={state.ownName}
            />
            <Image
                style={styles.logo}
                source={{
                    uri: imageUri
                }}/>
            <View style={styles.messagesContainer}>
                <ScrollView
                    ref={scrollViewRef}
                    onContentSizeChange={scrollToButton}
                >
                    <Text style={styles.text}>
                        {state.messages.map((m: string) => `\n${m}`)}
                    </Text>
                </ScrollView>

            </View>
            <View style={styles.userTextInput}>
                <TextInput
                    style={styles.textToSend}
                    placeholder={"Escribe tu mensaje aqui"}
                    onChangeText={appendMessage}
                    value={state.ownMessage}

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