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
            return {
                ...state,
                partnerMessage: action.stringValue
            };
        case Actions.setMessages:
            return {
                ...state,
                messages: [...action.arrayValue]
            };
    }

    return state;
    
}

export default Reducer;