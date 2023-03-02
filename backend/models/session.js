import mongoose from "mongoose";


const schema = mongoose.Schema

const session = new schema({
    Session: {
        type: String,
        required: true
    },
    Dep_Id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Department',
        required: true
    },
    Members_Limit_In_Group: {
        type: Number,
        required: true
    },
    Year: {
        type: Number,
        required: true
    }
})

const sessionModal = mongoose.model('Session', session)
export default sessionModal