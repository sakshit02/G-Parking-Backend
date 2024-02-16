import mongoose from 'mongoose';

const vehicleSchema = new mongoose.Schema({
  images: []
 ,
   type : {
    type: String,
default: "two wheeler",
enum: ["two wheeler" , "four wheeler"]
  },
   model : {
    type: String,
    required: false
  },
  number: {
    type: String,
    required: false
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User" 

  },
  permanent :{
    type:Boolean,
    default:false
  }
  ,
  colour: {
    type: String,
    required: false
  },

  
}, {
  timestamps: true
});

export const Vehicle = mongoose.model('Vehicle', vehicleSchema);

