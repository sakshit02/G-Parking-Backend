import mongoose, { Schema}from 'mongoose';
const gaurdSchema  = new Schema({
  
    name:{
        type:String, 
        required:true
    },
    parking:
    {

        type: mongoose.Schema.Types.ObjectId,
            ref: "Parking"
  },
  mobile:{
    type:Number,
    required:true
  },
  email:{
    type:String,
    required:true
  },
  password:{
    type:String,
    required:true
  }

 
});


 


// Export the model
export const Gaurd =mongoose.model("Gaurd", gaurdSchema
);
