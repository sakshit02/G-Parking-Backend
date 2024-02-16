import express from "express";
const parkingRoute =express.Router();
import { getparkings, getparking, createparking } from "../controller/parkingdetailController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
parkingRoute.get("/getparkings", getparkings)
parkingRoute.post("/createparking", createparking)
parkingRoute.get("/parking/:id", getparking)



export {parkingRoute}