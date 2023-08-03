import CarrierDataModel from '../models/CarrierData.js';

class CarrierDataRepository {
  async saveCarrierData(carrierData) {
    try {
      const newCarrierData = await CarrierDataModel.create(carrierData.carrier);
      await newCarrierData.save();

      console.log('CarrierData saved successfully.');
    } catch (error) {
      throw new Error('Error saving CarrierData to the database: ' + error.message);
    }
  }
}

export default CarrierDataRepository;
