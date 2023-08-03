import dotenv from 'dotenv';

dotenv.config();
const TOKEN = process.env.FRETE_RAPIDO_TOKEN;

class ShippingData {
  constructor() {
    this.shipper = {
      registered_number: "25438296000158",
      token: TOKEN,
      platform_code: "5AKVkHqCn"
    };

    this.recipient = {
      type: 0,
      country: "BRA",
      zipcode: 0,
    };

    this.dispatchers = [{
      registered_number: "25438296000158",
      zipcode: 29161376,
      volumes: []
    }];

    this.simulation_type = [0];
  }

  fillData(shippingData) {
    this.recipient.zipcode = parseInt(shippingData.recipient.address.zipcode);
    
    shippingData.volumes.map(volume => {
      this.dispatchers[0].volumes.push(volume);
    });
  }
}

export default ShippingData;
