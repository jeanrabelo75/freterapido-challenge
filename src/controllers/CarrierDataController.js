import axios from 'axios';
import dotenv from 'dotenv';
import CarrierData from '../domain/CarrierData.js';
import ShippingData from '../domain/ShippingData.js';
import CarrierDataService from '../services/CarrierDataService.js';
import { CarrierDataValidator } from '../validators/CarrierDataValidator.js';
import { ShippingDataValidator } from '../validators/ShippingDataValidator.js';

dotenv.config();
const FRETE_RAPIDO_URL = process.env.FRETE_RAPIDO_URL;

async function processData(req, res) {
  try {
    const jsonToProcess = req.body;
    const { error } = ShippingDataValidator(jsonToProcess);

    if (error) {
      return res.status(400).send('Invalid Shipping Data');
    }

    const shippingData = await consumeData(jsonToProcess);
    const response = await saveData(shippingData);

    return res.status(200).send(response);
  } catch (error) {
    return res.status(500).send('Error processing the request: ' + error.message);
  }
}

async function consumeData(dataToConsume) {
  const shippingData = new ShippingData();
  shippingData.fillData(dataToConsume);

  return shippingData;
}

async function apiRequest(shippingData) {
  try {
    const response = await axios.post(FRETE_RAPIDO_URL, shippingData);
    const receivedData = response.data;

    return receivedData;
  } catch (error) {
    throw new Error('Error in the external API request.');
  }
}

async function saveDataToDatabase(receivedData) {
  try {
    const { error, value } = CarrierDataValidator(receivedData);
    if (error) {
      throw new Error('Invalid data: ' + error.details[0].message);
    }

    const promises = value.map(async (carrierItem) => {
      const carrierData = new CarrierData();
      const carrierService = new CarrierDataService();

      carrierData.fillData(carrierItem);
      await carrierService.saveCarrierData(carrierData);
    });

    await Promise.all(promises);
  } catch (error) {
    throw new Error('Error saving data to the database');
  }
}


async function saveData(shippingData) {
  try {
    const receivedData = await apiRequest(shippingData);
    const processedData = await treatData(receivedData);

    await saveDataToDatabase(processedData);
    return processedData;
  } catch (error) {
    throw new Error(error.message);
  }
}

async function treatData(dataToProcess) {
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
    throw new Error("Empty offers");
  }
}

export default { processData };
