import userReducer from './userInfoReducer';
import ideaObjReducer from './ideaObjReducer';
import { getRowsPerPageReducer, checkIsPostIdeaOpened } from './componentsReducers';
import {combineReducers} from 'redux';

const reducers = combineReducers({
    user: userReducer,
    datagridRowsPerPage: getRowsPerPageReducer,
    isIdeaPageOpened: checkIsPostIdeaOpened,
    ideaObject: ideaObjReducer
})

export default reducers;