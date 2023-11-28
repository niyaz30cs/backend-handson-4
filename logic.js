const userRoute = require('express').Router();
const bcrypt = require('bcrypt');
const saltround=10;
const jwt = require ('jsonwebtoken')
// const secreatKey = process.env.secretKey
console.log(process.env.secretKey,"secretKey-2");
const DataArr=[]

userRoute.post('/signup', (req, res)=>{
   const ClientData = req.body;
   console.log(ClientData);

   const User = DataArr.find((ClientDetails)=>{
        if(ClientDetails.email == ClientData.email){
            return ClientDetails
        }
     })
     if (User) {
          return res.send("User already Register please try to login!! ")
     }

   const HashPassword = bcrypt.hashSync(ClientData.password, saltround)
   const ServerData = {
        name: ClientData.name,
        email : ClientData.email,
        password: HashPassword,
        mobile: ClientData.mobile
   }
   const token = jwt.sign({userEmail: ClientData.email}, process.env.secretKey,{expiresIn: '3600'})
   DataArr.push(ServerData);
   console.log(DataArr);
   return res.send({msg: "user Register", token: token});

})

userRoute.post('/login', (req,res)=>{
   const LoginPage = req.body;
   const User = DataArr.find((UserDetails)=>{
        if (UserDetails.email == LoginPage.email) {
            return UserDetails;
        }
   }) 
   if(!User){
        return res.send("You are not Register, Please Register First")
   }
   const Validate = bcrypt.compareSync(LoginPage.password, User.password)
   if(Validate){
     const logtoken = jwt.sign({userEmail: LoginPage.email}, process.env.secretKey, {expiresIn: '360m'})
     return res.send("User Login Successfully")
   }
   return res.send({mes: "user Register", token: logtoken}) 
})

module.exports = userRoute;