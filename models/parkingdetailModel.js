import mongoose from 'mongoose';

// Define parking detail schema
const parkingDetailSchema = new mongoose.Schema({
    parkingName: {
        type: String,
        required: true
    },
    parkingArea: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: String,
    country: {
        type: String,
        required: true
    },
    pincode: {
        type: Number,
        required: true
    },
    landmark: String,
    capacity: {
        type: Number,
        required: true
    },
    openingTime: {
        type: Date,
        required: true
    },
    closingTime: {
        type: Date,
        required: true
    },
    latitude: {
        type: Number,
        required: true
    },
    longitude: {
        type: Number,
        required: true
    },
    associateGuard: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Guard' // Reference to the Guard model if needed
    },
    associateAccount: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account' // Reference to the Account model
    },
    image: [String]
});

// Create ParkingDetail model
export const ParkingDetail = mongoose.model("ParkingDetail", parkingDetailSchema);
