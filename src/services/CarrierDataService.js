import CarrierDataRepository from '../repositories/CarrierDataRepository.js';

export class CarrierDataService {
  constructor() {
    this.carrierDataRepository = new CarrierDataRepository();
  }

  async saveCarrierData(carrierData) {
    try {
      await this.carrierDataRepository.saveCarrierData(carrierData);
    } catch (error) {
      throw new Error('Error saving carrier data: ' + error.message);
    }
  }
}
