import Joi from "joi";

const username = Joi.string().alphanum().min(5).max(30);
const password = Joi.string().min(5).max(30);

export const updateSchema = Joi.object({
  username: username,
  password: password
});

export const signUpSchema = Joi.object({
  username: username.required(),
  password: password.required()
});


export const loginSchema = Joi.object({
  username: Joi.string().required(),
  password: password.required()
});
