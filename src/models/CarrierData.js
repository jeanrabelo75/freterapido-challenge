import mongoose from 'mongoose';

const carrierDataSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  service: {
    type: String,
    required: true,
  },
  deadline: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

const CarrierDataModel = mongoose.model('CarrierData', carrierDataSchema);

export default CarrierDataModel;
