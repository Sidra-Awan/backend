const express = require("express");

const router = express.Router();
const userinfo = require("../models/loginuser");

router.post("/signup", (req, res) => {
  try {
    userinfo.findOne({ email: req.body.email }).then((user) => {
      if (user) {
        // let eror =[]
        // eror.push({text:('usuus')})
        res.status(400).json({ msg: "user already exist" });
      } else {
        console.log(req.body);
        const loginData = new userinfo({
          name: req.body.name,
          email: req.body.email,
          phone: req.body.phone,
          password: req.body.password,
        });
        console.log(loginData);
        try {
          const dataUser = loginData.save();
          res.status(200).json({ message: "registered successfully" });
        } catch (error) {
          res.status(400).json({ message: error.message });
        }
      }
    });
  } catch (error) {}
});

router.post("/login", async (req, res) => {
  try {
    
    if (!req.body.email || !req.body.password) {
      throw (error = {
        error: "04",
      });
    }
    let user = await userinfo.findOne({ email: req.body.email, password: req.body.password })

   // let { email, password } = req.body;
    //let user = await userinfo.findOne({ email: email, password: password }).select("-password");
    if (user) {
      res.send({ user: user, IsSuccess: true });
    } else {
      res.status(401).json({ msg: "user not exist", IsSuccess: false });
    }
  } catch (error) {
    res.status(400).json({ error: error });
  }
});

//Get all Method
// router.get('/signin', async(req, res) => {
//     try {
//         const data = await userinfo.find();
//         res.json(data);
//       } catch (error) {
//         res.status(500).json({ message: error.message });
//       }
// })
//Get by ID Method
// router.get('/getOne/:id', async(req, res) => {
//     try {
//         const data = await userinfo.findOne({name : req.params.id});
//         res.json(data);
//       } catch (error) {
//         res.status(500).json({ message: error.message });
//       }
// })
module.exports = router;
