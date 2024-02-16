import express from "express";
import { address, createParking, deleteParking, getAllParking, getParking, updateParking, uploadingImages } from "../controller/productController.js";
const parkingRouter =express.Router();
import { authMiddleware, isAdmin } from "../middlewares/authMiddleware.js";
import { dir, parkingImgResize, uploadPhoto } from "../middlewares/uploadImages.js";

parkingRouter.post("/createParking", authMiddleware,isAdmin,  createParking)
parkingRouter.put('/upload/:id', 
authMiddleware, isAdmin, uploadPhoto.array("images",10), parkingImgResize, uploadingImages);
parkingRouter.get("/:id", getParking)
parkingRouter.put("/:id", authMiddleware,isAdmin,  updateParking)
parkingRouter.delete("/:id", authMiddleware,isAdmin,  deleteParking)
parkingRouter.get("/", getAllParking)
parkingRouter.get("/dir", dir)

parkingRouter.put("/address/:id", address)




export {parkingRouter};