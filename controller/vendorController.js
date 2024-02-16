import asyncHandler from 'express-async-handler'
import {Vendor} from '../models/VendorModel.js'


import { generateToken } from "../config/jwtTokens.js";
import { validateId } from "../utils/validateMongoDbId.js";
import { generateRefreshToken } from "../config/refreshToken.js";
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { ppid } from "process";


const sayHello =  async(req, res)=>{

   try{
    res.json({"msg":"hello world"})
   }
   catch(err){
    res.json(err)
   }
}
const createUser = async (req, res) => {
    try {
      const {   name,
        email,
        password,
        contact,
        address,
        parkings, 
        gaurds } = req.body;
  
      const existedUser = await Vendor.findOne({
        $or: [{ name }, { email }],
      });
  
      if (existedUser) {
        res.json({ error1: "error already registerd user " });
      }
  
      const user = await Vendor.create({
        name,
        email,
        password,
        contact,
        address,
        parkings, 
        gaurds
       
      });
  
      if (user) res.json({ user: user });
    } catch (error) {
      console.log("error");
    }
  };

  const getAll =  async(req, res)=>{

const vendors = await Vendor.find();
res.json(vendors)
    
}

const getparking =  async(req, res)=>{
   
    const {id} = req.params;
    const vendors = await Vendor.findById({_id:id});
    res.json({"data":vendors})
        
    }
  
const login = async (req, res) => {
    const { email, password } = req.body;
  console.log(email);
    const findUser = await Vendor.findOne({ email });
   try{
    if (findUser && (await findUser.isPassWordMatched(password))) {
        const refreshToken =await generateRefreshToken(findUser?._id);
         const updateuser =await Vendor.findOneAndUpdate(findUser?._id,{
          refreshToken:refreshToken,
         },
         {
          new :true
         }
         );
         res.cookie('refreshToken', refreshToken,{
          httpOnly:true,
          maxAge :72*60*60*1000,
         })
     console.log("ere")
     const data= {  _id: findUser?._id,
      name: findUser?.name,
      email: findUser?.email,
      token: generateToken(findUser?._id),}
        res.json( { "data": data });
      }
   }
   catch(err)
   {
   res.json(err)
   }
  };
  


export {sayHello, login, createUser,getparking,  getAll};