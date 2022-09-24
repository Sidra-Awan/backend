const routes = require('./routes/routes');
const user = require('./routes/user');
const recipe = require('./routes/recipes');
const contactus= require('./routes/contact')
const purchasedProd = require('./routes/purchaseproduct')
const products= require('./routes/addproduct')
const saleinvoice =require('./routes/saleinvoice')
const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors")

const userinfo = require("./models/loginuser");
const PORT = process.env.PORT || 5000
const jwt = require('jsonwebtoken')
const app= express();

// const verifyy = (req,res,next)=>{
//  jwt.verify(req.headers.authorization, "mynameissidramakingroxmeatauthenticationkey" ,  async function(err, decoded) {
//   if (err)
//   return res.status(500).send({ auth: false, message: err }); 
//   const user =   await userinfo.findOne({_id:decoded._id})
//   if(user){
//     next();
//   }else{
//     return res.status(500).send({ auth: false, message: err }); 
//   }
  
  
// })
  


// }


app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ limit: "30mb", extended: true }));
// const upload = multer({storage: filestorage})
const LoggerMiddleware = (req,res,next) =>{
  console.log(`Logged  ${req.url}  ${req.method} -- ${new Date()}`)
  next();
}




//app.use(verifyy)


app.use('/api', routes)
app.use('/api', user)
app.use('/api', products)
app.use('/api', contactus)
app.use('/api', purchasedProd)
app.use('/api', recipe)
app.use('/api', saleinvoice)
mongoose.connect(

    `mongodb+srv://abcd:abcd@cluster0.jiti0m9.mongodb.net/test?retryWrites=true&w=majority`,  {
      useNewUrlParser: true,
    //   useFindAndModify: false,
      useUnifiedTopology: true
    }
  );
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})

app.listen(PORT,()=>{
    console.log("server started to ");
})
