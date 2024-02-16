import mongoose, { Schema}from 'mongoose';
import  bcrypt, { genSaltSync } from 'bcrypt';
import crypto from 'crypto';
// Declare the Schema of the Mongo model
const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        index: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phone: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    bookings:[{
             type: mongoose.Schema.Types.ObjectId,
             ref: "booking" 
    
    
    
    }],
    
    
    role: {
        type: String,
        required: true,
    },  
    refreshToken:{
        type:String
    },
    passwordChangedAt:Date,
    passwordResetToken:String,
    passwordResetExpires:Date
},
{
    timestamps:true
}
);


 
userSchema.pre("save", async function (next){
    
    if(!this.isModified('password')){
        next();
    }
    const salt =await genSaltSync(10);
    this.password =await bcrypt.hash(this.password, salt);
})


userSchema.methods.isPassWordMatched =async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
}

userSchema.methods.createPasswordResetToken =async function(){
    const resetToken = crypto.randomBytes(32).toString("hex");
    this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    this.passwordResetExpires=Date.now()+30*60*1000; //10minutes
    return resetToken;
 }

// Export the model
export const User =mongoose.model("User", userSchema);
