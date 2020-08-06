import React from "react";
import {Text, View, StyleSheet, TouchableOpacity} from "react-native";

const RuleItem = (props: { key:string,ruleName: string, deleteHandler:(key:string)=>void }) => {
    return (
        <TouchableOpacity onPress={()=>props.deleteHandler(props.key)}>
            <View style={styles.ruleItem}>
                <Text>{
                    props.ruleName
                }</Text>
            </View>
        </TouchableOpacity>)
}

const styles = StyleSheet.create({
    ruleItem: {
        borderWidth: 1,
        padding: 10,
        backgroundColor: '#ccc',
        borderColor: 'black',
        marginVertical: 10
    }
})
export default RuleItem;