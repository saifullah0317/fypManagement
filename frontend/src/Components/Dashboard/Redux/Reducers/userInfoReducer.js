const initial = {
    user_id: -1,
    user_type: 'Student',
    user_email: 'ahsan@gmail.com'
}
const userReducer = (state = initial, action) => {
    if (action.type === 'Get_User_Info') {
        return (state = action.payload);
    }
    return state;
}

export default userReducer;