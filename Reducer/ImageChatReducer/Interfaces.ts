export interface ImageChatState {
    ownMessage:string,
    messages:string[],
    partnerName:string,
    ownName:string,
    partnerMessage:string
}

export interface actionEventType {
    type:string,
    stringValue?:string,
    arrayValue?:string[]
}