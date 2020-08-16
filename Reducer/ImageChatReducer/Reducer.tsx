import Actions from "./Actions";
import {actionEventType, ImageChatState} from "./Interfaces";
import {Handlers} from "./Handlers";



function Reducer(state:ImageChatState, action:actionEventType): ImageChatState {
    switch (action.type) {
        case Actions.setOwnName:
            return Handlers.SetOwnNameHandler(state,action.stringValue);

        case Actions.setPartnerName:
            return Handlers.SetPartnerNameHandler(state,action.stringValue);

        case Actions.setOwnMessage:
            return Handlers.SetOwnMessageHandler(state,action.stringValue);

        case Actions.setPartnerMessage:
            return Handlers.SetPartnerMessageHandler(state, action.stringValue);

        case Actions.setMessages:
            return Handlers.SetMessagesHandler(state, action.arrayValue);
    }

    return state;
    
}

export default Reducer;