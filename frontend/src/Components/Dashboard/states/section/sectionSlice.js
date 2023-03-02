import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'

const initialState = {
    isChanged: false,
    isLoading: false,
    section: [{
        name: '',
        Session_Id: '',
        _id: ''
    }]
}

export const getSection = createAsyncThunk(
    '/getSection',
    async (thunkAPI) => {
        try {
            const resp = await axios.get('http://localhost:8080/getsections');
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
        const resp = await axios.post('http://localhost:8080/postsection', section);
        return resp.state(200).json(resp.data)
    } catch (error) {
        console.log('something went wrong');
    }
}

const delet = async (id) => {
    try {
        const resp = await axios.delete(`http://localhost:8080/deletesection/${id}`);
        return resp.state(200).json(resp.data)
    } catch (error) {
        console.log('something went wrong');
    }
}

const updat = async (id, session) => {
    try {
        const resp = await axios.put(`http://localhost:8080/updatesection/${id}`, session);
        return resp.state(200).json(resp.data)
    } catch (error) {
        console.log('something went wrong');
    }
}


const sectionSlice = createSlice({
    name: 'session',
    initialState,
    reducers: {
        postSection: (state, action) => {
            const data = {
                name: action.payload.name,
                Session_Id: action.payload.Session_Id
            }

            post(data);
            state.isChanged = !state.isChanged;
        },
        deleteSection: (state, action) => {
            delet(action.payload);
            state.section = state.section.filter((session) => session._id !== action.payload)
        },
        updateSection: (state, action) => {
            const data = {
                name: action.payload.name,
                Session_Id: action.payload.Session_Id
            }
            console.log(data);
            updat(action.payload._id, data);
            state.section = state.section.map((session) => {
                if (session._id === action.payload._id) {
                    return {
                        ...session,
                        name: action.payload.name,
                        Session_Id: action.payload.Session_Id,
                        _id: action.payload._id
                    }
                }
                return session;
            })
        }

    },
    extraReducers: (builder) => {

        builder
            .addCase(getSection.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getSection.fulfilled, (state, action) => {
                state.isLoading = false;
                state.section = action.payload.map((session) => session)
            })
            .addCase(getSection.rejected, (state, action) => {
                state.isLoading = false;
            });
    }
})

export const { postSection, deleteSection, updateSection } = sectionSlice.actions
export default sectionSlice.reducer