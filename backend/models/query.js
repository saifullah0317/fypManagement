import mongoose from "mongoose";

const querySchema = mongoose.Schema({
    userIdentity: {
        type: String,
        required: true,
      },
      firstName: {
        type: String,
        required: true,
      },
      lastName: {
        type: String,
        required: true,
      },
      query_id: {
        type: String,
        required: true,
      },
      query: {
        type: String,
        required: true,
      },
      replies: {
        type: Array
      },
      likes: {
        type: Number
      },
      dislikes: {
        type: Number
      }
 
});

const query = mongoose.model('Query', querySchema);

export default query;