import mongoose from "mongoose"

const schema = mongoose.Schema

const commitie = new schema({
    name: {
        type: String,
        required: true
    },
    NoOfMembers: {
        type: Number,
        required: true
    },
    CommitieMembers: {
        type: [String],
        required: true
    },
},)

const commitieModal = mongoose.model('Commitie', commitie)
export default commitieModal