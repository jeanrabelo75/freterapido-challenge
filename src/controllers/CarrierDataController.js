import CarrierDataUseCase from '../domain/usecases/CarrierDataUseCase.js';

async function processCarrierData(req, res) {
  try {
    const carrierDataUseCase = new CarrierDataUseCase();
    const response = await carrierDataUseCase.processData(req.body);
    return res.status(200).json(response);
  } catch (error) {
    console.error('Error:', error.message);
    return res.status(error.status || 500).json({ error: error.message });
  }
}

export { processCarrierData };
