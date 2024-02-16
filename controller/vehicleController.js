import { Parking } from "../models/parkingModel.js";
import { Address } from  "../models/addressModel.js";
import { User } from "../models/userModel.js";
import { Vehicle } from "../models/vehicleModel.js";
import asyncHandler from "express-async-handler";


const addVehicle =asyncHandler (async(req, res) =>{

    try{
        const { _id} =req.user;

        const vehicle = await Vehicle.create(req.body);
        const newVehicle = await Vehicle.findByIdAndUpdate( vehicle?._id, {
            owner: _id
        },
        {
            new:true
        })
        
        res.json({"data":newVehicle})

    }
    catch(error)
    {
        throw new Error(error);
    }

})

const updateVehicle =asyncHandler (async(req, res) =>{
    try{
        const {id} =req.params;
        const vehicle = await Vehicle.findOneAndUpdate({_id:id}, 
            req.body,
            {
                new :true
            })

          res.json({data:vehicle});  

    }
    catch(error)
    {
        throw new Error(error);
    }
    
})


const deleteVehicle =asyncHandler (async(req, res) =>{
    try{

        const {id}= req.params;
        const vehicle = await Vehicle.findOneAndDelete({_id:id});
        res.json({"data":vehicle})

    }
    catch(error)
    {
        throw new Error(error);
    }
    
})


const getVehicle =asyncHandler (async(req, res) =>{
    try{

 const {id}= req.params;
 const vehicle = await Vehicle.findById(id);
 res.json({data:vehicle});

    }
    catch(error)
    {
        throw new Error(error);
    }
    
})


const getAllVehicle =asyncHandler (async(req, res) =>{
    try{

        Vehicle.find({ owner: req.user._id })
  .exec()
  .then((vehicles) => {
    res.json({data:vehicles})
  })

    }
    catch(error)
    {
        throw new Error(error);
    }
    
})

const makePermanent =asyncHandler (async(req, res) =>{
    try{

        const {id}= req.params;
        const vehicle = await Vehicle.findByIdAndUpdate(id,
            {
                permanent:true
            },
            {
                new:true
            })
        res.json({data:vehicle})

    }
    catch(error)
    {
        throw new Error(error);
    }
    
})






export {
    getAllVehicle, getVehicle, updateVehicle, addVehicle, makePermanent, deleteVehicle

}