export const getRowsPerPage = (rowsPerPage) => {
    return(dispatch) => {
        dispatch({
            type: 'Get_DataGrid_Rows_Per_Page',
            payload: rowsPerPage
        })
    }
};

export const openPostIdea = () => {
    return(dispatch) => {
        dispatch({
            type: 'Is_Post_Idea_Page_Opened'
        })
    }
};

export const openViewIdea = () => {
    return(dispatch) => {
        dispatch({
            type: 'Is_View_Idea_Page_Opened'
        })
    }
};