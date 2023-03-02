import mongoose from "mongoose"

const schema = mongoose.Schema

const student = new schema({
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
    RegistrationNo: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
},)

const studentModal = mongoose.model('Student', student)
export default studentModal