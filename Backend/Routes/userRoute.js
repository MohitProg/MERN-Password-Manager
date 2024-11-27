import { Router } from "express";
import { SignupUser,LoginUser, Logout } from "../Controllers/userController.js";
import { Authcheck } from "../middleware/Auth.js";


let route=Router();

//  login 
route.post("/login",LoginUser);
// sigup 
route.post("/signup",SignupUser);
route.get("/logout",Authcheck, Logout);


export default route