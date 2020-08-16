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
    },
    usersNamesContainer:{
        width:'100%',
        height:'20%'
    },
    userNameInputContainer: {
        flex:1,
        flexDirection: 'row',
        height:'50%'
    },
    userNameInput:{
        marginTop:'3%',
        borderColor:'black',
        backgroundColor:'white',
        borderRadius:10,
        width:'60%',
        height:'60%',
        flexDirection: 'row',

    },
    userNameTitle:{
        marginTop:'5%',
        fontSize: 18,
        fontWeight: "200",
        textAlign:"center",
        marginRight:'5%'
    }
});

export default styles;