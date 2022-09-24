const mongoose=require('mongoose')
const invoiceSchema= new mongoose.Schema({
    date: {
        
        type: Date,
        default: new Date()
    },
    invoiceNo:{
        type:String,
        required:true
    },
    totalprice: {
        required: true,
        type: String
    },
    newproducts:{
        default:[],
        type:[{
        product_id:{
            required:true,
            type: String
         },
    quantity:{
        required:true,
        type: Number
     },
        price:{
            required:true,
            type: Number
         },
        amount:{
            required:true,
            type: Number
         },
    }]
    }
})
module.exports=mongoose.model('saleinvoice',invoiceSchema)