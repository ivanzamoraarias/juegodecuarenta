import React from "react";
import {TextInput, View, Text} from "react-native";
import styles from "../Styles/ImageChatStyle";

type UsersNameInputProps = {
    friendPlaceholder: string;
    onFriendUpdate: (val: string) => void;
    partnerName: string;
    userPlaceholder: string;
    onUserUpdate: (val: string) => void;
    ownName: string;

}
const UsersNameInput = (props: UsersNameInputProps) => {

    const onFriendUpdate = (val: string) => {
        props.onFriendUpdate(val);
    }
    const onUserUpdate = (val: string) => {
        props.onUserUpdate(val);
    }
    return (
        <View style={styles.usersNamesContainer}>
            <View style={styles.userNameInputContainer}>
                <Text style={styles.userNameTitle}>{"Friend"}</Text>
                <TextInput
                    style={styles.userNameInput}
                    placeholder={props.friendPlaceholder}
                    onChangeText={onFriendUpdate}
                    value={props.partnerName}
                />
            </View>
            <View style={styles.userNameInputContainer}>
                <Text style={styles.userNameTitle}>{"You"}</Text>
                <TextInput
                    style={styles.userNameInput}
                    placeholder={props.userPlaceholder}
                    onChangeText={onUserUpdate}
                    value={props.ownName}
                />
            </View>
        </View>

    );

}

export default UsersNameInput;