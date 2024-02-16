import { Parking } from "../models/parkingModel.js";
import { Address } from  "../models/addressModel.js";

import asyncHandler from "express-async-handler";
import slugify from "slugify";
import { uploadImg } from "../utils/cloudinary.js";
import path from "path";
import fs from 'fs'
const createParking = asyncHandler(async (req, res) => {
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }
    const newParking = await Parking.create(req.body);
    const {_id} =req.user;
    const createdBy = await Parking.findByIdAndUpdate(
      newParking?._id,
     {
      creator : _id
     },

      {
        new: true,
      }
    );

    res.json(createdBy);
  } catch (error) {
    throw new Error(error);
  }
});

const getParking = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const findParking = await Parking.findById(id).populate("address occupiedBy");
    res.json({"data": findParking});
  } catch (error) {
    throw new Error(error);
  }
});

const getAllParking = asyncHandler(async (req, res) => {
  try {
    const queryObj = { ...req.query };
    const excludeFields = ["page", "sort", "limit", "fields"];
    excludeFields.forEach((ele) => delete queryObj[ele]);
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    let query = Parking.find(JSON.parse(queryStr));



    //sorting

    if(req.query.sort){
    const sortBy =req.query.sort.split(",").join(" ");
    query =query.sort(sortBy);

    }
    else{
     query =query.sort("-createdAt");
    }


     //limiting the fields
     
     if(req.query.fields) {
            const fields =req.query.fields.split(",").join(" ");
            query=query.select(fields);

     }else{
        query=query.select("-__v");

     }


     //pagination
     const page =req.query.page;
     const limit =req.query.limit;
     const skip =(page-1) *limit;
     query =query.skip(skip).limit(limit);
     if(req.query.page){
        const productCount= await Parking.countDocuments();
        if(skip>=productCount)
        throw new Error('this page does not exist');
     }






    const parkings = await query.populate("address");
    res.json(parkings);

  } catch (error) {
    throw new Error(error);
  }
});

const updateParking = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }

    const updateParking = await Parking.findByIdAndUpdate(
      id,
      req.body,

      {
        new: true,
      }
    );
    res.json(updateParking);
  } catch (error) {}
});

const deleteParking = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const delParking = await Parking.findByIdAndDelete(id);
    res.json(delParking);
  } catch (error) {
    throw new Error(error);

  }
});



const uploadingImages = asyncHandler (async(req, res)=>{

 const {id} =req.params;
   try{
    const uploader = (path )  => uploadImg(path, "images");
    const urls = [];
    const files = req.files;
    for (const file of files){
      const {path} =file;
      const newpath = await uploader(path);
      urls.push(newpath);
     
     
    }
   

    const findParking = await Parking.findByIdAndUpdate(
      id, 
   {
    images:  urls.map((file) =>{
      return file ;
    }),
   },
  {
    new :true
  }
    );
    res.json(findParking);
}
   catch(error)
   {
    throw new Error(error);
   }

})

 const address = asyncHandler (async(req, res)=>{
 
    const {id} = req.params;
    try{
      const parking = Parking.findById(id);
    

      const newAddress = await Address.create(req.body);
   
      const updatedParking = await Parking.findByIdAndUpdate(
        id,
       { address : newAddress?._id,},
  
        {
          new: true,
        }
      ).populate("address");
        res.json(updatedParking);
     

   
    }
    catch(error)
    {
      throw new Error(error);
    }

 })



export {
  createParking,
  getParking,
  getAllParking,
  updateParking,
  deleteParking,
  uploadingImages,
  address
};
