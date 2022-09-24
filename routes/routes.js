const express = require("express");
//  import express from "express"
const router = express.Router();
const testData = require("../models/model");


router.post("/post", async (req, res) => {
  console.log(req.body);
  const data = new testData({
    name: req.body.name,
    age: req.body.age,
  });
  console.log(data);
  try {
    const dataToSave = data.save();
    res.status(200).json(dataToSave);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/getAll", async (req, res) => {
  try {
    const data = await testData.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Get by ID Method
router.get("/getOne/:id", async(req, res) => {
//   res.send(req.params.id);
  try {
    const data = await testData.findOne({name : req.params.id});
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
//Update by ID Method
router.patch("/update/:id", async(req,res)=>{
    try {
        const id= req.params.id;
        const updData=req.body;
        const opt={new:true};

        const result=await testData.findByIdAndUpdate(id, updData,opt)
        res.send(result)
    } catch (error) {
        res.status(400).json({message: error.message})        
    }

});
// //Delete by ID Method
router.delete('/delete/:id', async(req,res)=>{
    try {
        const id= req.params.id
        const del=await testData.findByIdAndDelete(id)
        res.send("Document with {data.name} has been deleted..")
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})


module.exports = router;
