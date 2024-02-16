import mongoose from 'mongoose';

const addressSchema = new mongoose.Schema({
  street: {
    type: String,
    required: true
  },
 
  city: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: false
  },
  postalCode: {
    type: String,
    required: false
  },
  country: {
    type: String,
    required: true
  },
  coordinates: {
    latitude: {
      type: Number,
      required: true
    },
    longitude: {
      type: Number,
      required: true
    }
  },
  formattedAddress: {
    type: String,
    required: false
  },
  landmarks: {
    type: String,
    required: false
  },
  
}, {
  timestamps: true
});

export const Address = mongoose.model('Address', addressSchema);

