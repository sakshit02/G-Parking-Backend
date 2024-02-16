import mongoose, { Schema}from 'mongoose';
const parkingSchema
 = new Schema({
    title: {
        type: String,
        required: true,
        index: true,
    },
    description: {
        type: String,
        required: true,
    },
    slug:
    {
        type:String
    },
    
    price: {
        type: Number,
        required: true,
    },
    address : {
           type: mongoose.Schema.Types.ObjectId,
            ref: "Address"
    },
    isAvailable: {
        type: Boolean,
        default :true
    },
 
    
    images: []
    ,
    VehiclesAllowed:{
        type:String, 
        default : "two wheeler",
        enum :["two wheeler", "four wheeler"]

    },
    gaurd:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Gaurd"
        
    }],
    creator:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"

    },
    occupiedBy:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "booking"
        
    }],
    ratings: [{
        star : Number,
        postedBy:{type: mongoose.Schema.Types.ObjectId,
        ref: "User"}
    }]

   
},
{
    timestamps:true
}
);


 


// Export the model
export const Parking =mongoose.model("Parking", parkingSchema
);
