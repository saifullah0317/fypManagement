import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'


const initialState = {
    isChanged: false,
    isLoading: false,
    department: [{
        name: '',
        id: ''
    }],
}

export const getDepartment = createAsyncThunk(
    '/getDepartment',
    async (thunkAPI) => {
        try {
            const resp = await axios.get('http://localhost:8080/getdepartments');
            if (resp.data.length === 0) {
                return thunkAPI.rejectWithValue('No data');
            }
            return resp.data;
        } catch (error) {
            return thunkAPI.rejectWithValue('something went wrong');
        }
    }
)

const post = async (department) => {
    try {
        await axios.post('http://localhost:8080/postdepartment', department);
    } catch (error) {
        console.log('something went wrong');
    }
}

const delDepartment = async (id) => {
    try {
        const resp = await axios.delete(`http://localhost:8080/deletedepartment/${id}`);
        return resp.data;
    } catch (error) {
        console.log('something went wrong');
    }
}

const updtDepartment = async (department) => {
    const data = {
        name: department.name,
    }
    console.log(data);
    try {
        const resp = await axios.put(`http://localhost:8080/updatedepartment/${department.id}`, data);
        return resp.data;
    } catch (error) {
        console.log('something went wrong');
    }
}

const departmentSlice = createSlice({
    name: 'department',
    initialState,
    reducers: {
        postDepartment: (state, action) => {
            post(action.payload)
            state.isChanged = !state.isChanged
        },
        deleteDeparatment: (state, action) => {
            delDepartment(action.payload)
            state.department = state.department.filter((temp) => temp._id !== action.payload)
        },
        updateDepartment: (state, action) => {
            updtDepartment(action.payload)
            state.department = state.department.map((temp) => {
                if (temp._id === action.payload.id) {
                    return action.payload
                }
                return temp
            })
        }
    },
    extraReducers: (builder) => {

        builder
            .addCase(getDepartment.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getDepartment.fulfilled, (state, action) => {
                state.isLoading = false;
                state.department = action.payload.map((temp) => temp)
            })
            .addCase(getDepartment.rejected, (state, action) => {
                state.isLoading = false;
            });
    },


}
)

export const { postDepartment, deleteDeparatment, updateDepartment } = departmentSlice.actions

export default departmentSlice.reducer


