import mongoose from "mongoose";
// Declare the Schema of the Mongo model
var bookingSchema = new mongoose.Schema({

  parking:{
    type: mongoose.Schema.Types.ObjectId,
    ref : "Parking"
  },
  timeIn:{
    type :Date,
    require:true

  },
  timeOut:{
    type :Date,
    require:true

  },
  amount:{
    type:Number,
    require:true
  },
  paymentIntent: {},
  status:{
    type:String,
    default :"not Booked",
    enum :[ "not Booked", "COD", "pending", "processing", "confirmed", "cancelled" ]
  },
  bookedBy:{
    type: mongoose.Schema.Types.ObjectId,
    ref:"User"
  }
},{
    timestamps:true
});

//Export the model
export const Booking =mongoose.model("booking", bookingSchema);
