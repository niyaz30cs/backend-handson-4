const jwt = require('jsonwebtoken');
const secretKey = process.env.seacreatKey

const authorization = (req, res ,next)=>{
   const token =  req.headers["authorization"] // token from client side or which is storedd in the local storagee
   if(token == null){
    return res.send({mes: "user not authoried"})
   }

   const validate = jwt.verify(token, process.env.seacreatKey)
   if (!validate) {
     return res.status(401).send({mes: "unauthorized person"})
   }

   next();
}

module.exports = authorization;