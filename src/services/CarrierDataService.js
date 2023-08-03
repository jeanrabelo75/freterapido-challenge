import CarrierDataRepository from '../repositories/CarrierDataRepository.js';

class CarrierDataService {
  constructor() {
    this.carrierDataRepository = new CarrierDataRepository();
  }

  async saveCarrierData(carrierData) {
    try {
      await this.carrierDataRepository.saveCarrierData(carrierData);
    } catch (error) {
      throw new Error('Error while processing carrier data: ' + error.message);
    }
  }
}

export default CarrierDataService;
