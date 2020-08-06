import React, {useState} from 'react';
import {Button, Text, TextInput, View, StyleSheet, ScrollView, FlatList} from "react-native";
// @ts-ignore
import {v4} from 'uuid';
import RuleItem from "./Components/RuleItem";
import RuleInput from "./Components/RuleInput";

export default function Cuarenta() {
    const [rules, setRules] = useState([]);
    const [isRuleModalVisible, setIsRuleModalVisible] = useState(false);



    const addRuleHandler = (newRule: string) => {
        //const newKey: string = v4(); // not supported -_-
        const newKey:string=Math.random().toString();
        // @ts-ignore
        setRules([
            ...rules,
            {key: newKey, value: newRule}
        ]);
        setIsRuleModalVisible(false);
    }

    const deleteRuleHandler = (ruleId: any) =>{
        // @ts-ignore
        setRules(rule=> rules.filter((item)=>item.id != ruleId))
    }


    return (
        <View>
            <View>
                <Text>{"Please add the rules for the game that you want to design"}</Text>
                <Button
                    title={"Add A Rule"}
                    onPress={() => {setIsRuleModalVisible(true)}}
                />
            </View>
            <View>
                <RuleInput
                    isVisible={isRuleModalVisible}
                    onAddRule={addRuleHandler}
                />
                <FlatList data={rules} renderItem={
                    itemData => (
                        // @ts-ignore
                        <RuleItem key={itemData.item.key} deleteHandler={deleteRuleHandler} ruleName={itemData.item.value}/>
                    )
                }/>
                {/*<ScrollView>
                    {rules.map((rule) =>
                        <View style={styles.ruleItem} key={rule}>
                            <Text>{rule}</Text>
                        </View>)}
                </ScrollView>*/}

            </View>

            <View>
                <Text>{"This rules are added to the Game Bile"}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        padding: 50
    }

});