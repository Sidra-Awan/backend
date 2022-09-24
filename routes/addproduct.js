const express = require("express");
const { findOne } = require("../models/products");
const router = express.Router();
const productlisting = require("../models/products");
const recipe = require("../models/recipes");

router.post("/products", async (req, res) => {
  console.log(req.body);
  const data = new productlisting({
    imageurl: req.body.imageurl,
    productname: req.body.productname,
    size: req.body.size,
    
    price: req.body.price,
    description: req.body.description,
    category: req.body.category,
    recipe_id: req.body.recipe_id,
  });
  try {
    const dataToSave = data.save();
    res.status(200).json(dataToSave);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
router.get("/getallproducts", async (req, res) => {
  try {
    const data = await productlisting.find()
    //   // console.log(data);

    //   let products = data.map(async(prod) => {
        
    //     let reci = await recipe.findOne({ _id: prod?.recipe_id }).then((recip) => {
    //       // console.log(recip)
    //       let obj = {
    //         ...prod?._doc , 
    //         recipe : recip
    //       }
    //       return obj;
    //     });
    //     return reci
    //   });
    //   console.log(products)
    //   return products;
    // });
if(!data || data.length < 1) return
    let newArr = []
    for(const val of data){
          let reci = await recipe.findOne({ _id: val?.recipe_id });

          let obj = {
            ...val?._doc , 
            recipe : reci
          }
          console.log(obj)
          newArr.push(obj)
    }
    // for (let index = 0; index < data.length; index++) {
    //   const element = data[index];
    //   let reci = await recipe.findOne({ _id: element?.recipe_id });
    //   console.log(reci)
    //   element.recip = reci
    //   newArr.push(element)
    // }

    // await data.map(async (val) => {
    //   let reci = await recipe.findOne({ _id: val?.recipe_id });
    //   console.log(reci)
    //   val.recip = reci
    //   // console.log(val)
    //   return val;
    // });

    res.status(200).json({ data: newArr });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/getOneProd/:id", async (req, res) => {
  try {
    const data = await productlisting.findOne({ _id: req.params.id });
    const reciinfo = await recipe.findOne({ _id: data?.recipe_id });
    res.status(200).json({
      data: {
        ...data,
        recipe: reciinfo,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// const reciinfo = await recipe.findOne({ _id: req.params.recipe_id });

// let recipedt = [];
// recipe.map((val) => {
//   if (val._id === req.body?.recipe_id) {
//     recipedt.push(req.body);
//   }
//   console.log(recipedt);

// router.patch('/reviewupdate/:id', async(req,res)=>{
//   try{
//     // const id= req.params.id
//     // const reviewProd =req.body
//     // const reviews =req.params.review

//     // const reviewupd =req.body.review
//     // const newrating = req.body.rating
//     // const opt={new:true}

//     if(data.userid===id){
//       const newrating =await productlisting.findByIdAndUpdate(id, {
//         $push:{rating: {newrating}} } ,opt)
//       res.json(newrating);
//     }else{
//       const result=await productlisting.findByIdAndUpdate(id, {
//       $push:{rating: {newrating}} } ,opt)
//       // const ress = await productlisting.aggregate([{avgrat:{$avg:'$review'}}])
//       res.status(200).json(result)
//     }

//   } catch (error) {
//       res.status(400).json({message: error.message})
//   }
// })

router.get("/categorys/:category", async (req, res) => {
  console.log(req.params);
  try {
    const data = await productlisting.find(
      { category: req.params.category },
      { productname: 1, price: 1, imageurl: 1 }
    );

    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.get("/oneCategory/:id", async (req, res) => {
  console.log(req.params);
  try {
    const data = await productlisting.findOne({ _id: req.params.id });
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.patch("/updateproduct/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updData = req.body;
    const opt = { new: true };

    const result = await productlisting.findByIdAndUpdate(id, updData, opt);
    res.send(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
router.delete("/productdel/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const del = await productlisting.findByIdAndDelete(id);
    res.json({ message: "Document  has been deleted.." });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
router.put('/productreview/:id', async(req,res)=>{
  try{
    let product= await productlisting.findOne({_id: req.body?.productid})
    let userreview=[]
    let match=false
    product.review.map((val)=>{
      if(val?.userid===req.body?.userid){
        match=true
        val.rating=req.body.rating
      }
      userreview.push(val)  
    })
    console.log(userreview)
    if(match){
      const result= await productlisting.findByIdAndUpdate(
        req.body.productid,{
          $set:{review:userreview}
        },
        { new:true}
      )
    }
    else{
      const res=  await productlisting.findByIdAndUpdate(
        req.body.productid, {
          $push:{
            review:{userid: req.body.userid,
             rating: req.body.rating}
          }
          
        },{ new:true}
      )
    }
    const data = await productlisting.find();

  res.status(200).json({data:data})
  } catch (error) {
  res.status(400).json({ message: error.message });
}

})

module.exports = router;
