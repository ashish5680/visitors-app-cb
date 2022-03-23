
const mongoose = require("mongoose");

const formSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,

    },

    email:{
        type:String,
        required:true,
    },

    number:{
        type:Number,
    },

    status: {
        type: String,
        possibleValues: ['radio-1' , 'radio-2']
    }

});










const Form = mongoose.model('Form', formSchema);

module.exports = Form;