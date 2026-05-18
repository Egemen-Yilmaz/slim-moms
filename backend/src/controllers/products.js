const { publicCalorieSchema } = require('../validation/products');
const { calculateDailyCalorie } = require('../services/calorie');

const getPublicDailyCalorie = async (req, res, next) => {
  try {
    console.log("1. Gelen Raw Body:", req.body); // Terminalde ne çıkıyor?
    // 1. Gelen veriyi Joi ile doğrula
    const { error, value } = publicCalorieSchema.validate(req.body);

    console.log("2. Joi'den Geçen Value:", value); // Terminalde ne çıkıyor?
    
    if (error) {
      return res.status(400).json({
        status: 'fail',
        message: error.details[0].message,
      });
    }

    // 2. Kalori hesaplamasını yap 
    // KRİTİK NOKTA: Fonksiyona Joi'den dönen temizlenmiş "value" değerini gönderiyoruz!
    const dailyCalorieIntake = calculateDailyCalorie(value);

    // 3. Yanıtı dön
    return res.status(200).json({
      status: 'success',
      data: {
        dailyCalorieIntake,
        notAllowedProducts: [],
      },
    });
  } catch (err) {
    next(err); // Hatayı global hata yakalayıcıya (app.js) fırlatır ve 500 basar
  }
};

module.exports = {
  getPublicDailyCalorie,
};