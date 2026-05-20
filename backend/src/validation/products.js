const Joi = require('joi');

const calorieSchema = Joi.object({
  height: Joi.number().min(100).max(250).required().messages({
    'number.base': 'Boy bir sayı olmalıdır.',
    'number.min': 'Boy en az 100 cm olmalıdır.',
    'number.max': 'Boy en fazla 250 cm olabilir.',
    'any.required': 'Boy alanı zorunludur.'
  }),
  age: Joi.number().min(18).max(100).required().messages({
    'number.base': 'Yaş bir sayı olmalıdır.',
    'number.min': 'Bu uygulama 18 yaş ve üzeri için uygundur.',
    'number.max': 'Yaş en fazla 100 olabilir.',
    'any.required': 'Yaş alanı zorunludur.'
  }),
  weight: Joi.number().min(30).max(300).required().messages({
    'number.base': 'Mevcut kilo bir sayı olmalıdır.',
    'number.min': 'Mevcut kilo en az 30 kg olmalıdır.',
    'number.max': 'Mevcut kilo en fazla 300 kg olabilir.',
    'any.required': 'Mevcut kilo alanı zorunludur.'
  }),
  targetWeight: Joi.number().min(30).max(300).required().messages({
    'number.base': 'Hedef kilo bir sayı olmalıdır.',
    'number.min': 'Hedef kilo en az 30 kg olmalıdır.',
    'number.max': 'Hedef kilo en fazla 300 kg olabilir.',
    'any.required': 'Hedef kilo alanı zorunludur.'
  }),
  bloodType: Joi.string().valid('0', 'A', 'B', 'AB').required().messages({
    'any.only': 'Kan grubu sadece "0", "A", "B" veya "AB" değerlerini alabilir.',
    'any.required': 'Kan grubu alanı zorunludur.'
  })
});

module.exports = {
  publicCalorieSchema: calorieSchema,
  userCalorieSchema: calorieSchema 
};