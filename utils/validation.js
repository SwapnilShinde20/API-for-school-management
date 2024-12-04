import Joi from "joi"

const schoolSchema = Joi.object({
    name: Joi.string().min(1).required(),
    address: Joi.string().min(1).required(),
    latitude: Joi.number().required(),
    longitude: Joi.number().required(),
});

export default schoolSchema;