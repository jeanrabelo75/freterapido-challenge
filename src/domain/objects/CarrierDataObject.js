import axios from 'axios';
import dotenv from 'dotenv';
import CarrierData from '../entities/CarrierData.js';
import { ShippingDataUseCase } from './ShippingDataObject.js';
import { CarrierDataService } from '../../services/CarrierDataService.js';
import { CarrierDataValidator } from '../../validators/CarrierDataValidator.js';
import { ValidationError, ApiError } from '../../middlewares/ErrorMiddleware.js';

dotenv.config();
const FRETE_RAPIDO_URL = process.env.FRETE_RAPIDO_URL;

export default class CarrierDataUseCase {
  async processData(data) {
    const shippingDataUseCase = new ShippingDataUseCase();
    const shippingData = await shippingDataUseCase.consumeData(data);

    try {
      const receivedData = await this.apiRequest(shippingData);
      const processedData = await this.treatData(receivedData);

      await this.saveDataToDatabase(processedData);
      return processedData;
    } catch (error) {
      throw error;
    }
  }

  async apiRequest(shippingData) {
    try {
      const response = await axios.post(FRETE_RAPIDO_URL, shippingData);
      const receivedData = response.data;

      return receivedData;
    } catch (error) {
      throw new ApiError(500, 'Error in the external API request: ' + error.message + ': ' + error.response.data.error);
    }
  }

  async saveDataToDatabase(receivedData) {
    const carrierDataService = new CarrierDataService();

    try {
      const { error, value } = CarrierDataValidator(receivedData);
      if (error) {
        throw new ValidationError('Invalid data: ' + error.details[0].message);
      }

      const promises = value.map(async (carrierItem) => {
        const carrierData = new CarrierData();
        carrierData.fillData(carrierItem);

        await carrierDataService.saveCarrierData(carrierData);
      });

      await Promise.all(promises);
    } catch (error) {
      throw new Error('Error saving data to the database');
    }
  }

  async treatData(dataToProcess) {
    const offers = dataToProcess.dispatchers[0].offers;

    if (offers && offers.length > 0) {
      const extractedData = offers.map((offer) => ({
        name: offer.carrier.name,
        service: offer.service,
        deadline: offer.original_delivery_time.estimated_date,
        price: offer.final_price,
      }));

      return extractedData;
    } else {
      throw new Error('Empty offers');
    }
  }
}
