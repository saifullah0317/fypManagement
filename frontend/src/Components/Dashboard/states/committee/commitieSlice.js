import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'


const initialState = {
    isChanged: false,
    isLoading: false,
    commitie: [{}],
}

export const getCommitie = createAsyncThunk(
    '/getCommitie',
    async (thunkAPI) => {
        try {
            const resp = await axios.get('http://localhost:8080/getcommities');
            return resp.data;
        } catch (error) {
            return thunkAPI.rejectWithValue('something went wrong');
        }
    }
)


const post = async (commitie) => {
    try {
        const res = await axios.post('http://localhost:8080/postcommitie', commitie);
        return res.data;
    } catch (error) {
        console.log('something went wrong');
    }
}

const delCommitie = async (id) => {
    try {
        await axios.delete(`http://localhost:8080/deletecommitie/${id}`);
    } catch (error) {
        console.log('something went wrong');
    }
}

const updtCommitie = async (commitie) => {
    const data = {
        NoOfMembers: commitie.NoOfMembers,
        CommitieMembers: commitie.CommitieMembers,
        name: commitie.name
    }
    console.log(commitie);
    try {
        const resp = await axios.put(`http://localhost:8080/updatecommitie/${commitie.id}`, data);
        return resp.data;
    } catch (error) {
        console.log('something went wrong');
    }
}




const commitieSlice = createSlice({
    name: 'commitie',
    initialState,
    reducers: {
        postCommitie: (state, action) => {
            post(action.payload)
            state.isChanged = !state.isChanged
        },
        deleteCommitie: (state, action) => {
            delCommitie(action.payload)
            state.commitie = state.commitie.filter(commitie => commitie._id !== action.payload)
        },
        updateCommitie: (state, action) => {
            updtCommitie(action.payload)
            state.commitie = state.commitie.map(commitie => commitie._id === action.payload.id ? action.payload : commitie)
        },
    },
    extraReducers: (builder) => {

        builder
            .addCase(getCommitie.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getCommitie.fulfilled, (state, action) => {
                state.isLoading = false;
                state.commitie = action.payload.map((comm) => comm)

            })
            .addCase(getCommitie.rejected, (state, action) => {
                state.isLoading = false;
            });
    }

}
)

export const { postCommitie, deleteCommitie, updateCommitie } = commitieSlice.actions

export default commitieSlice.reducer


