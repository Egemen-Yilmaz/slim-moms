const Joi = require('joi');

const publicCalorieSchema = Joi.object({
  height: Joi.number().min(100).max(250).required().messages({
    'number.base': 'Boy bir sayı olmalıdır.',
    'any.required': 'Boy alanı zorunludur.',
    'number.min': 'Boy en az 100 cm olmalıdır.'
  }),
  age: Joi.number().min(18).max(100).required().messages({
    'number.base': 'Yaş bir sayı olmalıdır.',
    'any.required': 'Yaş alanı zorunludur.',
    'number.min': 'Bu uygulama 18 yaş ve üzeri için uygundur.'
  }),
  weight: Joi.number().min(30).max(300).required().messages({
    'number.base': 'Mevcut kilo bir sayı olmalıdır.',
    'any.required': 'Mevcut kilo alanı zorunludur.'
  }),
  targetWeight: Joi.number().min(30).max(300).required().messages({
    'number.base': 'Hedef kilo bir sayı olmalıdır.',
    'any.required': 'Hedef kilo alanı zorunludur.'
  }),
  bloodType: Joi.number().valid(1, 2, 3, 4).required().messages({
    'any.only': 'Kan grubu 1, 2, 3 veya 4 olmalıdır.',
    'any.required': 'Kan grubu alanı zorunludur.'
  })
});

module.exports = {
  publicCalorieSchema,
};