const mongoose = require('mongoose');

const purProduct = new mongoose.Schema({
   
    userid: {
        required:true,
        type: String
     },
     subtotal:{
        required:true,
        type: Number
     },
     purchasing:{
     default:[],
     type: [{
            product_id:{
                required: true,
                type: String
    },
            quantity:{
                required:true,
                type: Number
            }
        }]
       
    },
    date:{
        required: true,
        type: Date
    }
   
    
})
module.exports = mongoose.model('purchaseproduct', purProduct)