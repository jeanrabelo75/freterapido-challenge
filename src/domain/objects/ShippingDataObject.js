import ShippingData from '../entities/ShippingData.js';

export class ShippingDataUseCase {
  async consumeData(dataToConsume) {
    const shippingData = new ShippingData();
    shippingData.fillData(dataToConsume);

    return shippingData;
  }
}
