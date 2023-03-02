import mongoose from "mongoose";


const committeeMemberModal = mongoose.model('committeeMemberModal', new mongoose.Schema({
    Committee_Id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'committeeModal',
        required: true,
    },
    Teacher_Id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'teacherModal',
        required: true
    }
}))

export default committeeMemberModal