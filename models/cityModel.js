import mongoose from "mongoose";
// Declare the Schema of the Mongo model
var citySchema = new mongoose.Schema({
    cityName:{
        type:String,
        required:true,
        unique:true,
        index:true,
    },
   
},
{
    timestamps:true
   }
);

//Export the model
export const City =mongoose.model("City", citySchema);
