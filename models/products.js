const mongoose = require('mongoose');

const addproduct = new mongoose.Schema({
    imageurl: {
        required: true,
        type: String
    },
    productname: {
        required: true,
        type: String
    },
    size: {
        required: true,
        type: String
    },
    
    stock: {
        required: true,
        type: Number
    },
    price: {
        required: true,
        type: Number
    },
    description: {
        required: true,
        type: String
    },
    category:{
        required:true,
        type: String
    },
    recipe_id:{
        required:true,
        type: String
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
    },
    discount:{
        type: Number,
        required:true,
        default:0
    }
})
module.exports = mongoose.model('productlisting', addproduct)