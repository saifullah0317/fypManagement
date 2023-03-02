export default (state = {groupMembers: null}, action) =>{
    switch (action.type){
        case "LIST_MEMBERS":
            return {...state, groupMembers: action.data }
            

        default: 
        return state
    }
}