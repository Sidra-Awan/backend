const express = require("express");
const router = express.Router();
const userinfo = require("../models/loginuser");
const jwt = require('jsonwebtoken')






router.post('/signup', (req, res) => {
    userinfo.findOne({email:req.body.email})
    .then((user)=>{
        if(user){
  
             res.status(400).json({msg:"user already exist"})
        } else{
            console.log(req.body);
            const loginData = new userinfo({
              name: req.body.name,
              email: req.body.email,
              phone: req.body.phone,
              password: req.body.password,
          
            }); console.log(loginData);
            try {
              const dataUser = loginData.save();
              res.status(200).json({ message: "registered successfully" });
             
            } catch (error) {
              res.status(400).json({ message: error.message });
            } }
           
        
    })
   
})

router.post('/login', async(req, res) => {
    let user= await userinfo.findOne(req.body).select('-password');
    console.log(user)
    if(user){
        const token = jwt.sign ({_id:user?._id},'mynameissidramakingroxmeatauthenticationkey')
        console.log(token)
        res.send({user: user , IsSuccess : true})
    }
    else{
        res.status(401).json({msg:"user not exist", IsSuccess : false})
    }
    
}) 




module.exports= router;

