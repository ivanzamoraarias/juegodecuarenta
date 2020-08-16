import Actions from "./Actions";
import {actionEventType} from "./Interfaces";

class ImageEvents {
    public static GetEventForSetMessages(messagesArray:string[]):actionEventType {
        return {type:Actions.setMessages, arrayValue:messagesArray}
    }
    public static GetEventForSetPartnerMessage(value:string){
        return {type:Actions.setPartnerMessage,stringValue:value};
    }
}

export default ImageEvents;