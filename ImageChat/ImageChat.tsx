import React, {createRef, useEffect, useReducer} from "react";
import {Image, View, Text, TextInput, TouchableHighlight, ScrollView} from "react-native";
import {FirebaseService} from "../Firebase/Firebase";
import MemoryService from "../Storage/Memory/MemoryService";
import Reducer from "../Reducer/ImageChatReducer/Reducer";
import {initialState} from "../Reducer/ImageChatReducer/State";
import ImageEvents from "../Reducer/ImageChatReducer/Events";
import DatabaseEnum from "../Constants/DatabaseEnum";
import styles from "./ImageChatStyle";
import UIEnum from "../Constants/UIEnum";
import AssetsEnum from "../Constants/AssetsEnum";

const ImageChat = (props:any) => {
    const [state, dispatch] = useReducer(Reducer, initialState);
    const scrollViewRef = createRef<ScrollView>();

    useEffect(() => {
        MemoryService
            .addMemoryKey(DatabaseEnum.Messages);
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
                    MemoryService.getElementByKey(DatabaseEnum.Messages)
                )
        );
    }, [state.partnerMessage]);

    const updateFromFirebase = (value: { lastOne: string }) => {
        if (!value)
            return;

        dispatch(ImageEvents.GetEventForSetPartnerMessage(value.lastOne));
        MemoryService.pushElementToKey(DatabaseEnum.Messages, `${value.lastOne}`);
    }


    const appendMessage = (message: string) => {
        dispatch(
            ImageEvents.GetEventForSetOwnMessage(message)
        );
    }
    const addMessages = () => {
        const newMessage: string = `${state.ownMessage}`;

        FirebaseService.storeNewOwnMessage(state.ownName, state.ownMessage);
        MemoryService.pushElementToKey(DatabaseEnum.Messages, newMessage);
        dispatch(
            ImageEvents
                .GetEventForSetMessages(
                    MemoryService.getElementByKey(DatabaseEnum.Messages)
                )
        );

        dispatch(
            ImageEvents.GetEventForEmptyOwnMessage()
        );

    }

    const scrollToButton= ()=> {
        if(scrollViewRef.current === null)
            return;
        scrollViewRef.current.scrollToEnd({animated: true})
    }


    return (
        <View style={styles.container}>
            <TextInput
                placeholder={UIEnum.YourFriend}
                onChangeText={(val: string) => {
                    dispatch(ImageEvents.GetEventForSetPartnerName(val));
                }}
                value={state.partnerName}
            />
            <TextInput
                placeholder={UIEnum.YourName}
                onChangeText={(val: string) => {
                    dispatch(ImageEvents.GetEventForSetOwnName(val));
                }}
                value={state.ownName}
            />
            <Image
                style={styles.logo}
                source={{
                    uri: AssetsEnum.CatsImage
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
                    placeholder={UIEnum.WriteHere}
                    onChangeText={appendMessage}
                    value={state.ownMessage}

                />
                <TouchableHighlight
                    style={styles.button}
                    onPress={addMessages}
                >
                    <Text>
                        {UIEnum.Send}
                    </Text>
                </TouchableHighlight>
            </View>
        </View>
    )
}



export default ImageChat;