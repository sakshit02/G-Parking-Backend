import express from "express";
const vehicleRouter =express.Router();
import { getVehicle, getAllVehicle, deleteVehicle, updateVehicle, makePermanent, addVehicle } from "../controller/vehicleController.js";
import { authMiddleware, isAdmin } from "../middlewares/authMiddleware.js";


 vehicleRouter.post("/",authMiddleware, addVehicle );
 vehicleRouter.get("/",  authMiddleware, getAllVehicle );
 vehicleRouter.get("/:id", getVehicle );
 vehicleRouter.put("/:id",updateVehicle );
 vehicleRouter.delete("/:id",deleteVehicle );
 vehicleRouter.put("/mp/:id", authMiddleware, makePermanent );



export {vehicleRouter}