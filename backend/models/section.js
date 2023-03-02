import mongoose from "mongoose";

const sectionModal = mongoose.model('sectionModal', new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    Session_Id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'sessionModal',
        required: true,
    }
})
)

export default sectionModal