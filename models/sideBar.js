import mongoose from "mongoose";
// Declare the Schema of the Mongo model
var sideSchema
 = new mongoose.Schema({
   name:{
    type:String,
    required:true
   }
   ,
   checks :[
   { type: mongoose.Schema.Types.ObjectId,
    ref: "Check"  } ]
   
},
{
    timestamps:true
   }
);

//Export the model
export const Side =mongoose.model("Side", sideSchema
);
