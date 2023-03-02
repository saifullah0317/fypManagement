import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'

const initialState = {
    isChanged: false,
    isLoading: false,
    comitteeMember: [{
        Committee_Id: '',
        Teacher_Id: '',
        _id: ''
    }]
}

export const getcommitteeMember = createAsyncThunk(
    '/getcommitteeMember',
    async (thunkAPI) => {
        try {
            const resp = await axios.get('http://localhost:8080/getcommitteemembers');
            if (resp.data.length === 0) {
                return thunkAPI.rejectWithValue('No data');
            }
            return resp.data;
        } catch (error) {
            return thunkAPI.rejectWithValue('something went wrong');
        }
    }
)

const post = async (section) => {
    try {
        const resp = await axios.post('http://localhost:8080/postcommitteemember', section);
        return resp.state(200).json(resp.data)
    } catch (error) {
        console.log('something went wrong');
    }
}

const delet = async (id) => {
    try {
        const resp = await axios.delete(`http://localhost:8080/deletecommitteemember/${id}`);
        return resp.state(200).json(resp.data)
    } catch (error) {
        console.log('something went wrong');
    }
}

const updat = async (id, session) => {
    try {
        const resp = await axios.put(`http://localhost:8080/updatecommitteemember/${id}`, session);
        return resp.state(200).json(resp.data)
    } catch (error) {
        console.log('something went wrong');
    }
}


const committeeMemberSlice = createSlice({
    name: 'committieeMember',
    initialState,
    reducers: {
        postMember: (state, action) => {
            const data = {
                Committee_Id: action.payload.Committee_Id,
                Teacher_Id: action.payload.Teacher_Id
            }

            post(data);
            state.isChanged = !state.isChanged;
        },
        deleteMember: (state, action) => {
            delet(action.payload);
            state.comitteeMember = state.comitteeMember.filter((session) => session._id !== action.payload)
        },
        updateMember: (state, action) => {
            console.log(action.payload);
            const data = {
                Committee_Id: action.payload.Committee_Id,
                Teacher_Id: action.payload.Teacher_Id
            }
            console.log(data);
            updat(action.payload.id, data);
            state.comitteeMember = state.comitteeMember.map((session) => {
                if (session._id === action.payload.id) {
                    return {
                        ...session,
                        Committee_Id: action.payload.Committee_Id,
                        Teacher_Id: action.payload.Teacher_Id,
                        _id: action.payload.id
                    }
                }
                return session;
            })
        }

    },
    extraReducers: (builder) => {

        builder
            .addCase(getcommitteeMember.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getcommitteeMember.fulfilled, (state, action) => {
                state.isLoading = false;
                state.comitteeMember = action.payload.map((session) => session)
            })
            .addCase(getcommitteeMember.rejected, (state, action) => {
                state.isLoading = false;
            });
    }
})

export const { postMember, deleteMember, updateMember } = committeeMemberSlice.actions
export default committeeMemberSlice.reducer