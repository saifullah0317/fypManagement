const getIdeaObj = (obj) => {
    return(dispatch) => {
        dispatch({
            type: 'Get_Idea_Obj',
            payload: obj
        })
    }
};

export default getIdeaObj;