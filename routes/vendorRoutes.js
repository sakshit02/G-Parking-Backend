import express from "express";
const vendorRoute =express.Router();
import { sayHello, login , getparking ,createUser, getAll } from "../controller/vendorController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
vendorRoute.get("/hello", sayHello)
vendorRoute.get("/getparking/:id", getparking)

vendorRoute.post("/login", login)

vendorRoute.post("/register", createUser)
vendorRoute.get('/get', authMiddleware,  getAll)

export {vendorRoute}