import React, {useState} from "react";
import {Button, TextInput, View, StyleSheet, Modal} from "react-native";

const RuleInput = (props: any) => {
    const [goal, setGoal] = useState('');
    const ruleInputHandler = (value: string) => {
        setGoal(value);
    }
    return (
        <Modal visible={props.isVisible} animationType={"fade"}>
            <View style={styles.ruleInputContainer}>
                <TextInput
                    placeholder={"Rule"}
                    onChangeText={ruleInputHandler}
                    value={goal}
                    style={styles.input}
                />
                <Button title={"Add Rule"} onPress={() => {
                    props.onAddRule(goal)

                }}/>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    ruleInputContainer: {
        flex:1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    },
    input: {
        width: '80%',
        padding: 10,
        borderColor: 'black',
        borderWidth: 1,
        marginBottom:10
    }
})

export default RuleInput;