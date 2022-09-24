const mongoose = require('mongoose');

const addrecipe = new mongoose.Schema({
    imageurl: {
        required: true,
        type: String
    },
    recipename: {
        required: true,
        type: String
    },
    serving: {
        required: true,
        type: String
    },
    ingredients: {
        required: true,
        type: [String]
    },
    review:{
         default:[],
        type: [{
            userid:{
                required:true,
                type: String
            },
            rating:{
                required:true,
                type: Number
            }
        }]
    }
})
module.exports = mongoose.model('recipe', addrecipe)