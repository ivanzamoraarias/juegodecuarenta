import Actions from "./Actions";
import {actionEventType} from "./Interfaces";

class ImageEvents {
    public static GetEventForSetMessages(messagesArray:string[]):actionEventType {
        return {type:Actions.setMessages, arrayValue:messagesArray}
    }
    public static GetEventForSetPartnerMessage(value:string){
        return {type:Actions.setPartnerMessage,stringValue:value};
    }
    public static GetEventForSetOwnMessage(value:string){
        return {type:Actions.setOwnMessage, stringValue:value}
    }
    public static GetEventForEmptyOwnMessage(){
        return {type:Actions.setOwnMessage, stringValue:""}
    }
    public static GetEventForSetPartnerName(value:string){
        return {type:Actions.setPartnerName,stringValue:value}
    }
    public static GetEventForSetOwnName(value:string){
        return {type:Actions.setOwnName, stringValue:value}
    }

}

export default ImageEvents;