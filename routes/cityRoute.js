import express from "express";
import { createCity, getAllCity, getCity, updateCity } from "../controller/cityController.js";
import { authMiddleware, isAdmin } from "../middlewares/authMiddleware.js";
const cityRouter = express.Router();

cityRouter.post('/',authMiddleware, isAdmin,  createCity);
cityRouter.put('/:id',authMiddleware, isAdmin,  updateCity);
cityRouter.get('/:id',  getCity);
cityRouter.get('/',  getAllCity);



export {cityRouter};