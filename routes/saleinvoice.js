const express = require('express')
const router =express.Router()
const saleinvoice = require("../models/saleinvoice")
const productlisting = require("../models/products")

router.post('/saleinvoice', async(req,res)=>{

    try{
      //console.log(req.body)
        let newprods= req.body.newproducts

        const data =new saleinvoice({
            date:req.body.date,
            invoiceNo:req.body.invoiceNo,
            totalprice:req.body.totalprice,
            newproducts:req.body.newproducts
        })
        console.log(data)
        for (const a of newprods){
            console.log(a.product_id);
            const newstock = await productlisting.findByIdAndUpdate(a.product_id,{$inc:{stock: +a.quantity}})
            const newprice = await productlisting.findByIdAndUpdate(a.product_id,{$set:{price: a.price}})
            console.log(newprice)
          }
           const dataToSave = data.save();
           
        
        res.status(200).json({Message : data});
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
    
})

router.get ("/productsreport/:product_id", async(req,res)=>{
  try {
    //search from nestedloop https://www.tutorialspoint.com/how-to-search-in-array-of-object-in-mongodb
    const data = await saleinvoice.find({newproducts:{$elemMatch:{product_id:req.params.product_id}}},{date:1,newproducts:1})
    
    const prodname = await productlisting.find({_id:req.params.product_id},{productname:1,_id:0})
    //to get the element inside array of object
    const pname = prodname.length>0 ? prodname[0].productname :{}

     console.log(prodname);
    const newarr=[]
    data.forEach((value,ind)=>{
      //newarr.push({date: val?.date})
      
      value?.newproducts.forEach((val,ind)=>{
        // (value?.date !==null )
        newarr.push( {productName:pname,date: value?.date, prodid:val?.product_id, quantity: val?.quantity, price:val?.price})

      })
    })
    
    
    res.status(200).json({ message:   newarr})
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
})
module.exports = router;