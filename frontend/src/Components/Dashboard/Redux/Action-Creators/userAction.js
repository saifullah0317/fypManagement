const getUserInfo = (userId, userType, userEmail) => {
    return(dispatch) => {
        dispatch({
            type: 'Get_User_Info',
            payload: {
                user_id: userId,
                user_type: userType,
                user_email: userEmail
            }
        })
    }
};

export default getUserInfo;