import { Router } from "express";
import { Authcheck } from "../middleware/Auth.js";
import { DeletePassword, Getpassword, PostPassword, UpdatePassword } from "../Controllers/passwordController.js";


let route=Router();

// get password 
route.get("/getpassword", Authcheck,Getpassword)
// post password
route.post("/postpassword", Authcheck,PostPassword)
//  delete password 
route.delete("/deletepassword/:id", Authcheck,DeletePassword)

//  update password 

route.put("/updatepassword/:id", Authcheck,UpdatePassword)


export default route