import { configureStore } from '@reduxjs/toolkit'
import teacherSlice from './teacher/teacherSlice'
import commitieSlice from './committee/commitieSlice'
import studentSlice from './student/studentSlice'
import departmentSlice from './department/departmentSlice'
import sessionSlice from './session/sessionSlice'
import sectionSlice from './section/sectionSlice'
import committeeMemberSlice from './comitteeMember/committeeMemberSlice'

const store = configureStore({
    reducer: {
        teacherReducer: teacherSlice,
        commitieReducer: commitieSlice,
        studentReducer: studentSlice,
        departmentReducer: departmentSlice,
        sessionReducer: sessionSlice,
        sectionReducer: sectionSlice,
        committieMemberReducer: committeeMemberSlice
    }
})

export default store