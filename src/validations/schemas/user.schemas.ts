import Joi from "joi";

const registerUserSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  lastName: Joi.string().min(6).required(),
  firstName: Joi.string().min(6).required(),
  roles: Joi.array().items(Joi.number()).allow(null).optional(),
  birthdate: Joi.date().max('now').optional()
});

export default {
  register: registerUserSchema,
};
