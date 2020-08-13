import {ImageChatState} from "./Interfaces";

export class Handlers {
    public static SetOwnNameHandler(
        state:ImageChatState,
        value:string)
        :ImageChatState {
        return {
            ...state,
            ownName:value
        }
    }

    public static SetPartnerNameHandler(
        state:ImageChatState,
        value:string)
        :ImageChatState {
        return {
            ...state,
            partnerName:value
        }
    }

    public static SetOwnMessageHandler(
        state:ImageChatState,
        value:string)
        :ImageChatState {
        return {
            ...state,
            ownMessage: value
        }
    }
}