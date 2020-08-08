import React, {useState} from "react";
import {Button, TextInput, View, StyleSheet, Modal, TouchableHighlight, Text} from "react-native";

const RuleInput = (props: any) => {
    const [goal, setGoal] = useState('');
    const ruleInputHandler = (value: string) => {
        setGoal(value);
    }
    const addRule = () => {
        props.onAddRule(goal);
        setGoal('');
    }
    return (
        <Modal
            visible={props.isVisible}
            animationType={"slide"}
            transparent={true}
        >
            <View style={styles.ruleInputContainer}>
                <TextInput
                    placeholder={"Rule"}
                    onChangeText={ruleInputHandler}
                    value={goal}
                    style={styles.input}
                />
                <View style={styles.buttonLayoutContainer}>
                    <View style={styles.buttonContainer}>
                        <TouchableHighlight
                            style={{ ...styles.button, backgroundColor: "#2196F3" }}
                            onPress={addRule}
                        >
                            <Text style={styles.textStyle}>
                                Add Rule
                            </Text>
                        </TouchableHighlight>

                    </View>
                    <View style={styles.buttonContainer}>
                        <TouchableHighlight
                            style={styles.button}
                            onPress={() => props.onCancel()}
                        >
                            <Text style={styles.textStyle}>
                                Cancel
                            </Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    ruleInputContainer: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 20
    },
    input: {
        width: '80%',
        padding: 10,
        borderColor: 'black',
        borderWidth: 1,
        marginBottom: 10,
        borderRadius: 20
    },
    buttonLayoutContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "50%",
        borderRadius: 20
    },
    buttonContainer:{
        width: "50%"
    },
    button: {
        backgroundColor: "#F194FF",
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    }
})

export default RuleInput;