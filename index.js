const express = require('express');

const cors = require('cors')

const dotenv = require('dotenv');
const userRoute = require('./logic');
dotenv.config()
console.log(process.env.secretKey,"secrectKey-1");

const App = express();

App.use(cors({origin: "*"}))

App.use(express.json())

App.use("/user", userRoute);

App.listen(4004, ()=>{
    try
    {
        console.log("Server Run on Port No-4004");
    }
    catch
    {
        console.log("Some Error on Port No-4004");
    }
})

