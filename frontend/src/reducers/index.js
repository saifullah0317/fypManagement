import { combineReducers } from "redux";
// import { configureStore } from "@reduxjs/toolkit";
import auth from "./auth";
import groups from "./groups";
// import Ideas from  "./Ideas";

import teacherSlice from "../Components/Dashboard/states/teacher/teacherSlice";
import commitieSlice from "../Components/Dashboard/states/committee/commitieSlice";
import studentSlice from "../Components/Dashboard/states/student/studentSlice";
import departmentSlice from "../Components/Dashboard/states/department/departmentSlice";
import sessionSlice from "../Components/Dashboard/states/session/sessionSlice";
import sectionSlice from "../Components/Dashboard/states/section/sectionSlice";
import committeeMemberSlice from "../Components/Dashboard/states/comitteeMember/committeeMemberSlice";

// const store = configureStore({
//   reducer: {
//     teacherReducer: teacherSlice,
//     commitieReducer: commitieSlice,
//     studentReducer: studentSlice,
//     departmentReducer: departmentSlice,
//     sessionReducer: sessionSlice,
//     sectionReducer: sectionSlice,
//     committieMemberReducer: committeeMemberSlice,
//     authReducer: auth,
//     groupsReducer: groups,
//   },
// });

export default combineReducers({
    auth, groups,teacherSlice,commitieSlice,studentSlice,departmentSlice,sessionSlice,sectionSlice,committeeMemberSlice
})
// const reducer = combineReducers({
//   auth,
//   groups,
//   teacherSlice,
//   commitieSlice,
//   studentSlice,
//   departmentSlice,
//   sessionSlice,
//   sectionSlice,
//   committeeMemberSlice,
// });
// const store = configureStore({
//   reducer,
// });
// export default store;
