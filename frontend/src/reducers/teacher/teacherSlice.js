import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'


const initialState = {
    isChanged: false,
    isLoading: false,
    teacher: [{
        firstname: '',
        lastname: '',
        cnic: '',
        departmentid: '',
        email: '',
        mobile: ''

    }]
}

export const getTeachers = createAsyncThunk(
    '/getTeachers',
    async (thunkAPI) => {
        try {
            const resp = await axios.get('http://localhost:4000/getteachers');
            if (resp.data.length === 0) {
                return thunkAPI.rejectWithValue('No data');
            }
            return resp.data;
        } catch (error) {
            return thunkAPI.rejectWithValue('something went wrong');
        }
    }
)


const post = async (teacher) => {
    try {
        const resp = await axios.post('http://localhost:4000/postteacher', teacher);
        return resp.state(200).json(resp.data)
    } catch (error) {
        console.log('something went wrong');
    }
}

const delTecher = async (id) => {
    try {
        await axios.delete(`http://localhost:4000/deleteteacher/${id}`);
    } catch (error) {
        console.log('something went wrong');
    }
}

const updtTeacher = async (id, data) => {
    try {
        await axios.put(`http://localhost:4000/updateteacher/${id}`, data);
    } catch (error) {
        console.log('something went wrong');
    }
}

const teacherSlice = createSlice({
    name: 'teacher',
    initialState,
    reducers: {
        postTeacher: (state, action) => {
            const data = {
                firstname: action.payload.firstname,
                lastname: action.payload.lastname,
                cnic: action.payload.cnic,
                departmentid: action.payload.departmentid,
                email: action.payload.email,
                mobile: action.payload.mobile
            }
            post(data)
            state.isChanged = !state.isChanged
        },
        deleteTeacher: (state, action) => {
            delTecher(action.payload)
            state.teacher = state.teacher.filter(teacher => teacher._id !== action.payload)
        },
        updateTeacher: (state, action) => {

            const data = {
                firstname: action.payload.firstname,
                lastname: action.payload.lastname,
                cnic: action.payload.cnic,
                departmentid: action.payload.departmentid,
                email: action.payload.email,
                mobile: action.payload.mobile
            }
            const data1 = {
                firstname: action.payload.firstname,
                lastname: action.payload.lastname,
                cnic: action.payload.cnic,
                departmentid: action.payload.departmentid,
                email: action.payload.email,
                mobile: action.payload.mobile,
                _id: action.payload.id
            }
            console.log(data1);
            updtTeacher(action.payload.id, data)
            state.teacher = state.teacher.map(teacher => teacher._id === action.payload.id ? data1 : teacher)
        }
    },
    extraReducers: (builder) => {

        builder
            .addCase(getTeachers.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getTeachers.fulfilled, (state, action) => {
                state.isLoading = false;
                state.teacher = action.payload.map((teacher) => teacher)
                console.log(state.teacher)
            })
            .addCase(getTeachers.rejected, (state, action) => {
                state.isLoading = false;
            });
    }
}
)

export const { postTeacher, deleteTeacher, updateTeacher } = teacherSlice.actions

export default teacherSlice.reducer


