const { publicCalorieSchema } = require('../validation/products');
const { calculateDailyCalorie } = require('../services/calorie');
const UserDiet = require('../models/UserDiet');

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

// 🔐 GİRİŞ YAPMIŞ KULLANICI İÇİN KALORİ HESAPLAMA VEYA GÜNCELLEME
const saveUserDailyCalorie = async (req, res, next) => {
  try {
    // 1. Gelen veriyi Joi ile doğrula (Aynı kurallar geçerli olduğu için mevcut şemayı kullanıyoruz)
    const { error, value } = publicCalorieSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ status: 'fail', message: error.details[0].message });
    }

    // 2. Kaloriyi servis fonksiyonumuzla hesapla
    const dailyCalorieIntake = calculateDailyCalorie(value);

    // 3. Hesaplanan veriyi bu kullanıcı adına DB'ye kaydet veya zaten varsa üzerine yaz (findOneAndUpdate)
    // req.user.id bilgisini bize yukarıda yazdığımız Auth Middleware (protect) sağlayacak!
    const userDietData = await UserDiet.findOneAndUpdate(
      { uid: req.user.id },
      {
        uid: req.user.id,
        ...value,
        dailyCalorieIntake,
        notAllowedProducts: [] // Şimdilik boş, filtreleme fazında burası canlanacak
      },
      { upsert: true, new: true } // upsert: yoksa döküman oluştur, varsa güncelle demek
    );

    return res.status(200).json({
      status: 'success',
      data: userDietData
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getPublicDailyCalorie,
  saveUserDailyCalorie
};