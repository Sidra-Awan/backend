const express = require("express");
const router = express.Router();
const recipe = require("../models/recipes");

// router.post("/single", upload.single('image'),(req,res)=>{
//     console.log(req.file)
//     res.send("file upload")
// })

router.post("/recipe", async (req, res) => {
  console.log(req.body);
  const str = req.body.ingredients;
  const arr = str.split(",");
  console.log(arr);
  const data = new recipe({
    imageurl: req.body.imageurl,
    recipename: req.body.recipename,
    serving: req.body.serving,
    ingredients: arr,
  });
  try {
    const dataToSave = await data.save();
    res.status(200).json({ data: dataToSave, message: "successfull" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
router.get("/getallrecipes", async (req, res) => {
  try {
    const data = await recipe.find();
    //const data = await recipe.find({}, { recipename:1, imageurl:1 });
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/oneRecipe/:id", async (req, res) => {
  console.log(req.params);
  try {
    const data = await recipe.find({ _id: req.params.id });
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.delete("/recdelete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const del = await recipe.findByIdAndDelete(id);
    res.json({
      message: "Document with {recipe.recipename} has been deleted..",
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
router.patch("/recupdate/:id", async (req, res) => {
  console.log(req.body);
  console.log(req.params.id);
  try {
    const recid = req.params.id;
    const updrec = req.body;
    const opt = { new: true };

    const result = await recipe.findByIdAndUpdate(recid, updrec, opt);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.put("/reviewupdate/:id", async (req, res) => {
  try {
    let reci = await recipe.findOne({ _id: req.body?.recipeid });
    let reviews = [];
    let match = false;
    reci.review.map((val) => {
      if (val?.userid === req.body?.userid) {
        match = true;
        val.rating = req.body.rating;
      }
      reviews.push(val);
    });
    if (match) {
      const result = await recipe.findByIdAndUpdate(
        req.body.recipeid,
        {
          $set: { review: reviews },
        },
        {
          new: true,
        }
      );
    } else {
      const result = await recipe.findByIdAndUpdate(
        req.body.recipeid,
        {
          $push: {
            review: {
              rating: req.body?.rating,
              userid: req.body?.userid,
            },
          },
        },
        {
          new: true,
        }
      );
    }
    const data = await recipe.find();

    res.send(data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
