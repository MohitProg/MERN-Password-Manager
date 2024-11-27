import dotenv from "dotenv"
dotenv.config()
import express, { urlencoded } from "express"
import DatabaseConnection from "./db/db.js";
import useRoute from "./Routes/userRoute.js"
import passwordRoute from './Routes/passwordRoute.js'
import cors from "cors"

const app=express();
let PORT=process.env.PORT||5000


//  middleware 
app.use(cors())
app.use(express.json());
app.use(express.json(urlencoded({extended:true})))

// route middlewere
app.use("/pwm/api/user",useRoute)
app.use("/pwm/api/password",passwordRoute)


// data base connection 
DatabaseConnection().then(()=>{
// server 
app.listen(PORT,()=>{
    console.log(` server is started on PORT : ${PORT}`)
})
})
