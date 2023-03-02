import mongoose from "mongoose";

const groupSchema = mongoose.Schema({
  groupId: {
    type: String,
    required: true,
  },
  projectId: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  isGroupLead: {
    type: Boolean,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  // rollNo: { // Reg No 
  //   type: String,
  //   required: true,
  // },
 
});

export default mongoose.model('group',groupSchema)