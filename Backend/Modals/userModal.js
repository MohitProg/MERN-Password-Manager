import mongoose from "mongoose";

const UserSchema= new mongoose.Schema({
    name:{
        type:String,
        unique:true
        
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    refreshtoken:{
        type:String,
        default:null
    }
},{timestamps:true})

export default mongoose.model("user",UserSchema)