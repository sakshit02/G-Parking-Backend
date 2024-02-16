import { City } from "../models/cityModel.js";
import asyncHandler from 'express-async-handler'
import { validateId } from '../utils/validateMongoDbId.js'


const createCity = asyncHandler (async(req, res)=>{

    try{

        const newCity =await City.create(req.body);
        res.json(newCity);
    }
    catch(error)
    {
        throw new Error(error);
    }
})

const updateCity = asyncHandler (async(req, res)=>{

    const {id} =req.params;
    try{

        const updatedCity =await City.findByIdAndUpdate(id,req.body
            ,{
                new :true
            });
        res.json(updatedCity);
    }
    catch(error)
    {
        throw new Error(error);
    }
})

const getCity = asyncHandler (async(req, res)=>{

    const {id} =req.params;
    validateId(id);
    try{

        const getCity =await City.findById(id);
         
        res.json(getCity);
    }
    catch(error)
    {
        throw new Error(error);
    }
})
const getAllCity = asyncHandler (async(req, res)=>{

    try{

        const getAllCity =await City.find();
         
        res.json(getAllCity);
    }
    catch(error)
    {
        throw new Error(error);
    }
})


export {createCity, updateCity,getCity ,getAllCity};