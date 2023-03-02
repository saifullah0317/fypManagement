import mongoose from "mongoose";
import autoIncrement from 'mongoose-auto-increment';

const ideasSchema = mongoose.Schema({
    Idea_Title:{
        type: String,
        required: false
    },
    Description:{
        type: String,
        required: false
    },
    Posted_By:{
        type: Number,
        required: false
    },
    Lock:{
        type: Boolean,
        required: false
    },
    Group_Id:{
        type: Number,
        required: false
    },
    Status:{
        type: String,
        required: false
    },
    Supervisor:{
        type: String,
        required: false
    },
    Co_Supervisor:{
        type: String,
        required: false
    },
    Posted_On:{
        type: Date,
        required: false
    },
    Updated_By:{
        type: Number,
        required: false
    },
    Updated_On:{
        type: Date,
        required: false
    }
});

autoIncrement.initialize(mongoose.connection);
ideasSchema.plugin(autoIncrement.plugin, 'Ideas');

const ideas = mongoose.model('Idea', ideasSchema);

export default ideas;