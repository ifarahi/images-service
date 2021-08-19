import * as Joi from 'joi';

export const loginSchema = Joi.object({
  username: Joi.string().min(6).max(32).required(),
  password: Joi.string().min(6).max(32),
});
