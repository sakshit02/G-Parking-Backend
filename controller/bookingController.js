import { Parking } from "../models/parkingModel.js";
import mongoose from "mongoose";

import { Address } from "../models/addressModel.js";
import asyncHandler from "express-async-handler";
import { Booking } from "../models/bookingModel.js";
import { User } from "../models/userModel.js";

const createBooking = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  try {
    const bookingsemi = await Booking.create(req.body);

    const booking = await Booking.findByIdAndUpdate(bookingsemi._id,{

          bookedBy:_id
    },
    {
      new:true
    })

    const user = await User.findOne({ _id });
    const updatedUser = await User.updateOne(
      { _id },
      {
        $push: { bookings: booking._id },
      },
      {
        new: true,
      }
    );

    const { parking } = req.body;
    const updatedParking = await Parking.updateOne(
      { _id: parking },
      { $push: { occupiedBy: booking._id } },
      { new: true }
    );

    res.json(booking);
  } catch (err) {
    throw new Error(err);
  }
});
const cancelBooking = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const booking = await Booking.findByIdAndUpdate(
      id,
      {
        status: "cancelled",
      },
      {
        new: true,
      }
    );

    res.json(booking);
  } catch (err) {
    throw new Error(err);
  }
});
const myBookings = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  try {
    const bookings = await User.findById(_id)
      .select("bookings")
      .populate("bookings");

    res.json({data:bookings});
  } catch (err) {
    throw new Error(err);
  }
});
const currentBooking = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  try {
    const currentDateTime = new Date();

    const userBookings = await User.aggregate([
      { $match: { _id: _id } },
      {
        $unwind: "$bookings",
      },
      {
        $match: {
          "bookings.status": "confirmed",
        },
      },
    ]);

    res.json(userBookings);
  } catch (err) {
    throw new Error(err);
  }
});

export { createBooking, cancelBooking, myBookings, currentBooking };
