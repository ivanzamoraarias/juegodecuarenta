function Reducer(state:any, action:{type:string, value:string}) {
    switch (action.type) {
        case Actions.setOwnName:
            return state.ownName = action.value;
        case Actions.setPartnerName:
            return state.patnerName = action.value;
    }
    
}