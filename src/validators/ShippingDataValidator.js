import Joi from 'joi';

export function ShippingDataValidator(data) {
  const volumeSchema = Joi.object({
    amount: Joi.number().integer().required(),
    category: Joi.number().required(),
    sku: Joi.string().required(),
    height: Joi.number().required(),
    width: Joi.number().required(),
    length: Joi.number().required(),
    unitary_price: Joi.number().required(),
    unitary_weight: Joi.number().required(),
  });

  const shippingDataSchema = Joi.object({
    recipient: Joi.object({
      address: Joi.object({
        zipcode: Joi.number().required(),
      })
    }).required(),
    volumes: Joi.array().items(volumeSchema).required(),
  });

  return shippingDataSchema.validate(data);
}
