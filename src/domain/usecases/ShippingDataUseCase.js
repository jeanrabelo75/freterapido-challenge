import ShippingData from '../ShippingData.js';

export class ShippingDataUseCase {
  async consumeData(dataToConsume) {
    const shippingData = new ShippingData();
    shippingData.fillData(dataToConsume);

    return shippingData;
  }
}
