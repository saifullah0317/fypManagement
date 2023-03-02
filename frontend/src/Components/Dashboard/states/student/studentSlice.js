import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'


const initialState = {
    isChanged: false,
    isLoading: false,
    student: [{}],
}

export const getStudents = createAsyncThunk(
    '/getStudents',
    async (thunkAPI) => {
        try {
            const resp = await axios.get('http://localhost:8080/getstudents');
            return resp.data;
        } catch (error) {
            return thunkAPI.rejectWithValue('something went wrong');
        }
    }
)

const post = async (student) => {
    try {
        const resp = await axios.post('http://localhost:8080/poststudent', student);
        return resp.data;
    } catch (error) {
        console.log('something went wrong');
    }
}

const delStudent = async (id) => {
    try {
        const resp = await axios.delete(`http://localhost:8080/deletestudent/${id}`);
        return resp.data;
    } catch (error) {
        console.log('something went wrong');
    }
}

const updtStudent = async (student) => {
    const data = {
        firstname: student.firstname,
        lastname: student.lastname,
        cnic: student.cnic,
        RegistrationNo: student.RegistrationNo,
        email: student.email,
        mobile: student.mobile,
        code: student.code,
        password: student.password,
    }
    console.log(data);
    try {
        const resp = await axios.put(`http://localhost:8080/updatestudent/${student.id}`, data);
        return resp.data;
    } catch (error) {
        console.log('something went wrong');
    }
}

const studentSlice = createSlice({
    name: 'student',
    initialState,
    reducers: {
        postStudent: (state, action) => {
            post(action.payload)
            state.isChanged = !state.isChanged
        },
        deleteStudent: (state, action) => {
            delStudent(action.payload)
            state.student = state.student.filter((temp) => temp._id !== action.payload)
        },
        updateStudent: (state, action) => {
            updtStudent(action.payload)
            state.student = state.student.map((temp) => {
                if (temp._id === action.payload.id) {
                    return action.payload
                }
                return temp
            })
            console.log(state.student);
        }
    },
    extraReducers: (builder) => {

        builder
            .addCase(getStudents.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getStudents.fulfilled, (state, action) => {
                state.isLoading = false;
                state.student = action.payload.map((temp) => temp)
            })
            .addCase(getStudents.rejected, (state, action) => {
                state.isLoading = false;
            });
    },


}
)

export const { postStudent, deleteStudent, updateStudent } = studentSlice.actions

export default studentSlice.reducer


