import mongoose from "mongoose"

const schema = mongoose.Schema

const teacher = new schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    cnic: {
        type: String,
        required: true
    },
    departmentid: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    email: {
        type: String,
        requiredd: true
    },
    mobile: {
        type: String,
        required: true
    }
},)

const teacherModal = mongoose.model('Teacher', teacher)
export default teacherModal