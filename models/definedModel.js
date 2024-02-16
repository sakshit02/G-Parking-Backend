import mongoose from "mongoose";
// Declare the Schema of the Mongo model
var defineSchema = new mongoose.Schema({
    tcode:{
        type:String,
    } 
    ,
    form: mongoose.Schema.Types.Mixed, 
},
{
    timestamps:true
   }
);

//Export the model
export const Define =mongoose.model("Define", defineSchema);
