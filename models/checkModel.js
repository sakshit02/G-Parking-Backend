import mongoose from "mongoose";
// Declare the Schema of the Mongo model
var checkSchema = new mongoose.Schema({
    tcode:{
        type:String,
        required:true,
        unique:true,
        index:true,
    },
    name:{
        type:String,
        required:true
    },
    new:{
        type:Boolean,
        default:false
    },
    edit:{
        type:Boolean,
        default:false
    },
    delete:{
        type:Boolean,
        default:false
    },
    read:{
        type:Boolean,
        default:false
    }
   
},
{
    timestamps:true
   }
);

//Export the model
export const Check =mongoose.model("Check", checkSchema);
