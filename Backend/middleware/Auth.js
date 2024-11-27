import jwt from "jsonwebtoken"

export const Authcheck=async(req,res,next)=>{
    try {
        
        const token =req.headers["auth-token"];
        if(!token){
            return res.send({success:false,message:"invalid token"})
        }
        const decodevalue=await jwt.verify(token,"helloworldhowareyou");
        req.user=decodevalue;
        next();


    } catch (error) {
        console.log(error)
        return res.send({success:false,message:error.message})
        
    }
}