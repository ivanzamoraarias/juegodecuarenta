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

    public static SetPartnerMessageHandler(
        state:ImageChatState,
        value:string)
        :ImageChatState {
        return {
            ...state,
            partnerMessage: value
        };
    }

    public static SetMessagesHandler(
        state:ImageChatState,
        value:string[])
        :ImageChatState{
        return {
            ...state,
            messages: [...value]
        };
    }
}