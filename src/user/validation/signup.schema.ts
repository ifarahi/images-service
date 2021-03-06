import * as Joi from 'joi';

export const signupSchema = Joi.object({
  email: Joi.string().email().required(),
  username: Joi.string().min(6).max(32).required(),
  password: Joi.string().min(6).max(32).required(),
});
