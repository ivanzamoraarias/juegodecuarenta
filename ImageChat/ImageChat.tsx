import React, {createRef, useEffect, useReducer} from "react";
import {Image, View, Text, TextInput, TouchableHighlight, ScrollView} from "react-native";
import {FirebaseService} from "../Firebase/Firebase";
import MemoryService from "../Storage/Memory/MemoryService";
import Reducer from "../Reducer/ImageChatReducer/Reducer";
import {initialState} from "../Reducer/ImageChatReducer/State";
import ImageEvents from "../Reducer/ImageChatReducer/Events";
import DatabaseEnum from "../Constants/DatabaseEnum";
import styles from "./Styles/ImageChatStyle";
import UIEnum from "../Constants/UIEnum";
import AssetsEnum from "../Constants/AssetsEnum";
import MessageInput from "./Components/MessageInput";
import UsersNameInput from "./Components/UsersNameInput";

const ImageChat = (props: any) => {
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

    const scrollToButton = () => {
        if (scrollViewRef.current === null)
            return;
        scrollViewRef.current.scrollToEnd({animated: true})
    }


    return (
        <View style={styles.container}>
            <UsersNameInput
                friendPlaceholder={UIEnum.YourFriend}
                userPlaceholder={UIEnum.YourName}
                partnerName={state.partnerName}
                ownName={state.ownName}
                onFriendUpdate={(val: string) => {
                    dispatch(ImageEvents.GetEventForSetPartnerName(val));
                }}
                onUserUpdate={(val: string) => {
                    dispatch(ImageEvents.GetEventForSetOwnName(val));
                }}
            />

            <Image
                style={styles.logo}
                source={{uri: AssetsEnum.CatsImage}}
            />
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
            <MessageInput
                addMessages={addMessages}
                appendMessage={appendMessage}
                value={state.ownMessage}
            />

        </View>
    )
}


export default ImageChat;