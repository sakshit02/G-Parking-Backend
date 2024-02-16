import jwt from "jsonwebtoken";
import { User } from "../models/userModel.js";


const authMiddleware =async(req,res, next) =>{
    let token;

    if(req?.headers?.authorization?.startsWith('Bearer')){
        
        token=req.headers.authorization.split(" ")[1];
        try{
            if(token)
            {
                const decoded =jwt.verify(token, "mysecret")
                const user =await User.findById(decoded?.id);
                req.user=user;
                next();
            }
            else{

            }

        }
        catch(error)
        {
            res.json({"error":"not authorized"})
        }
    }
    else{
        res.json({"error":"there is no token"})
    }
};



const isAdmin =async(req, res, next)=>{
   

    const {email} =req.user;
    const aUser= await User.findOne({email});
    if(aUser.role !== "admin")
    {
        res.json({"error":"You are not admin"});
    }
    else{
        next();
    }

   

}

export {authMiddleware, isAdmin};