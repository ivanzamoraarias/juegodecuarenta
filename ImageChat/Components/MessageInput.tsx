import React from "react";
import {Text, TextInput, TouchableHighlight, View} from "react-native";
import styles from "../Styles/ImageChatStyle";
import UIEnum from "../../Constants/UIEnum";

type MessageInputProps = {
    addMessages:()=>void;
    appendMessage:(message:string)=>void;
    value:string;
}
const MessageInput = (props:MessageInputProps) => {

    const addMessages = () => {
        props.addMessages();
    };
    const appendMessage = (message:string) => {
        props.appendMessage(message);
    }

    return(
        <View style={styles.userTextInput}>
            <TextInput
                style={styles.textToSend}
                placeholder={UIEnum.WriteHere}
                onChangeText={appendMessage}
                value={props.value}

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

    );
}

export default MessageInput;