const express = require("express");
const router = express.Router();
const contactusinfo = require("../models/contactus");




router.post("/contactus" ,async (req, res) => {
    console.log(req.body);
    const data = new contactusinfo({
      name:req.body.name,
      email:req.body.email,
      phone:req.body.phone,
      message:req.body.message
    });
    console.log(data);
    try {
      const dataToSave = data.save();
      res.status(200).json(dataToSave);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
  router.get("/getallcontacts" , async(req,res)=>{
    try {
        const data = await contactusinfo.find();
        res.json(data);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
  })

module.exports= router;