const rowsPerPageInitial = 6;
const initialFlag = false;
export const getRowsPerPageReducer = (state = rowsPerPageInitial, action) => {
    if(action.type === 'Get_DataGrid_Rows_Per_Page'){
        return (state = action.payload);
    }
    return state;
};


export const checkIsPostIdeaOpened = (state = initialFlag, action) => {
    if(action.type === 'Is_Post_Idea_Page_Opened'){
        return true;
    }
    else if(action.type === 'Is_View_Idea_Page_Opened'){
        return false;
    }
    return state;
}