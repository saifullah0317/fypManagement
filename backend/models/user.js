import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  userType: {
    type: String,
    required: true,
  },
  userIdentity: { // Reg No or Teacher ID
    type: String,
    required: true,
  },
  cnic: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  session: {
    type: Number,
  },
  section: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  isEmailVerified: {
    type: Boolean,
    required: true,
  },

});

export default mongoose.model('User',userSchema)