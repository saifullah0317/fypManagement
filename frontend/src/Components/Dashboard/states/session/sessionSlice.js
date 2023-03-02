import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'

const initialState = {
    isChanged: false,
    isLoading: false,
    session: [{
        Session: '',
        Dep_Id: '',
        Members_Limit_In_Group: '',
        Year: ''
    }]
}

export const getSession = createAsyncThunk(
    '/getSession',
    async (thunkAPI) => {
        try {
            const resp = await axios.get('http://localhost:8080/getsessions');
            if (resp.data.length === 0) {
                return thunkAPI.rejectWithValue('No data');
            }
            return resp.data;
        } catch (error) {
            return thunkAPI.rejectWithValue('something went wrong');
        }
    }
)

const post = async (session) => {
    try {
        const resp = await axios.post('http://localhost:8080/postsession', session);
        return resp.state(200).json(resp.data)
    } catch (error) {
        console.log('something went wrong');
    }
}

const delSession = async (id) => {
    try {
        const resp = await axios.delete(`http://localhost:8080/deletesession/${id}`);
        return resp.state(200).json(resp.data)
    } catch (error) {
        console.log('something went wrong');
    }
}

const updSession = async (id, session) => {
    try {
        const resp = await axios.put(`http://localhost:8080/updatesession/${id}`, session);
        return resp.state(200).json(resp.data)
    } catch (error) {
        console.log('something went wrong');
    }
}


const sessionSlice = createSlice({
    name: 'session',
    initialState,
    reducers: {
        postSession: (state, action) => {
            const data = {
                Session: action.payload.Session,
                Dep_Id: action.payload.Dep_Id,
                Members_Limit_In_Group: action.payload.Members_Limit_In_Group,
                Year: action.payload.Year
            }

            post(data);
            state.isChanged = !state.isChanged;
        },
        deleteSession: (state, action) => {
            delSession(action.payload);
            state.session = state.session.filter((session) => session._id !== action.payload)
        },
        updateSession: (state, action) => {
            const data = {
                Session: action.payload.Session,
                Dep_Id: action.payload.Dep_Id,
                Members_Limit_In_Group: action.payload.Members_Limit_In_Group,
                Year: action.payload.Year
            }
            updSession(action.payload._id, data);
            state.session = state.session.map((session) => {
                if (session._id === action.payload._id) {
                    return {
                        ...session,
                        Session: action.payload.Session,
                        Dep_Id: action.payload.Dep_Id,
                        Members_Limit_In_Group: action.payload.Members_Limit_In_Group,
                        Year: action.payload.Year,
                        _id: action.payload._id
                    }
                }
                return session;
            })
        }

    },
    extraReducers: (builder) => {

        builder
            .addCase(getSession.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getSession.fulfilled, (state, action) => {
                state.isLoading = false;
                state.session = action.payload.map((session) => session)
            })
            .addCase(getSession.rejected, (state, action) => {
                state.isLoading = false;
            });
    }
})

export const { postSession, deleteSession, updateSession } = sessionSlice.actions
export default sessionSlice.reducer