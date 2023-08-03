import Joi from 'joi';

export function CarrierDataValidator(data) {
  const carrierSchema = Joi.object({
    name: Joi.string().required(),
    service: Joi.string().required(),
    deadline: Joi.string().required(),
    price: Joi.number().required(),
  });

  const carrierDataSchema = Joi.array().items(carrierSchema).required();

  return carrierDataSchema.validate(data);
}