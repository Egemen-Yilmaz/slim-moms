const Joi = require('joi');

const addProductToDiarySchema = Joi.object({
  date: Joi.string()
    .pattern(/^\d{4}-\d{2}-\d{2}$/)
    .required()
    .messages({
      'string.pattern.base': 'Tarih formatı YYYY-MM-DD şeklinde olmalıdır (Örn: 2026-05-19).'
    }),
  productId: Joi.string()
    .hex()
    .length(24)
    .required()
    .messages({
      'string.length': 'Geçersiz ürün ID formatı.'
    }),
  weight: Joi.number().positive().required().messages({
    'number.positive': 'Gramaj değeri 0\'dan büyük olmalıdır.'
  })
});

const getDiaryByDateSchema = Joi.object({
  date: Joi.string()
    .pattern(/^\d{4}-\d{2}-\d{2}$/)
    .required()
    .messages({
      'string.pattern.base': 'Tarih formatı YYYY-MM-DD şeklinde olmalıdır.'
    })
});

module.exports = {
  addProductToDiarySchema,
  getDiaryByDateSchema
};