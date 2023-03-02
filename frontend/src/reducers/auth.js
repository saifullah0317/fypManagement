export default (state = {authData: null}, action) =>{
    switch (action.type){
        case "AUTH":
            localStorage.setItem('userToken', action?.data.token )
            return {...state, authData: {
                token: action?.data.token,
                firstName: action?.data?.result?.firstName,
                lastName: action?.data?.result?.lastName,
                email: action?.data?.result?.email,
                phoneNumber: action?.data?.result?.phoneNumber,
                userType: action?.data?.result?.userType,
                department: action?.data?.result?.department,
                session: action?.data?.result?.session,
            } }
            
        case "LOGOUT": 
            return {...state, authData: null}
        default: 
        return state
    }
}
