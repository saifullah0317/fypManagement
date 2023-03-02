import mongoose from "mongoose";

const departmentModal = mongoose.model('departmentModal', new mongoose.Schema({
    name: {
        type: String,
        required: true,
    }
})
)

export default departmentModal