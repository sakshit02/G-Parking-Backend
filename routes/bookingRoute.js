import express from "express";
const bookingRouter =express.Router();
import { authMiddleware } from "../middlewares/authMiddleware.js";

import { createBooking, cancelBooking, currentBooking, myBookings } from "../controller/bookingController.js";

bookingRouter.get('/', authMiddleware, currentBooking );
bookingRouter.post('/', authMiddleware, createBooking );
bookingRouter.delete('/:id',  authMiddleware  ,  cancelBooking );
bookingRouter.get('/my-booking',authMiddleware, myBookings );



export {bookingRouter};