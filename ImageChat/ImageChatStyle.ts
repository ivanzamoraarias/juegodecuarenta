import {StyleSheet} from "react-native";

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

export default styles;