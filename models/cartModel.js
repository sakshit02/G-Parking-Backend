import mongoose from "mongoose";
// Declare the Schema of the Mongo model
var cartSchema = new mongoose.Schema({
  parkings:
    [ {
      type: mongoose.Schema.Types.ObjectId,
      ref : "Parking"
    }]
  ,
  helo:{
    type:String
  },

  bookedBy:{
    type: mongoose.Schema.Types.ObjectId,
    ref:"User"
  }

},{
    timestamps:true
});
 
//Export the model
export const Cart =mongoose.model("cart", cartSchema);
