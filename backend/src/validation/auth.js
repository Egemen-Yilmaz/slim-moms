const Joi = require('joi');

const registerSchema = Joi.object({
  name: Joi.string().min(2).max(50).required().messages({
    'string.empty': 'İsim alanı boş bırakılamaz.',
    'string.min': 'İsim en az 2 karakter olmalıdır.',
    'any.required': 'İsim alanı zorunludur.'
  }),
  email: Joi.string().email().required().messages({
    'string.email': 'Lütfen geçerli bir e-posta adresi girin.',
    'string.empty': 'E-posta alanı boş bırakılamaz.',
    'any.required': 'E-posta alanı zorunludur.'
  }),
  password: Joi.string().min(6).required().messages({
    'string.min': 'Şifre en az 6 karakter olmalıdır.',
    'string.empty': 'Şifre alanı boş bırakılamaz.',
    'any.required': 'Şifre alanı zorunludur.'
  })
});

const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': 'Lütfen geçerli bir e-posta adresi girin.',
    'string.empty': 'E-posta alanı boş bırakılamaz.'
  }),
  password: Joi.string().required().messages({
    'string.empty': 'Şifre alanı boş bırakılamaz.'
  })
});

module.exports = {
  registerSchema,
  loginSchema
};