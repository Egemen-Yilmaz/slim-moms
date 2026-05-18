const jwt = require('jsonwebtoken');
const Session = require('../models/Session');

const generateTokens = async (userId) => {
  // 1. Kısa ömürlü Access Token üret (1 saatlik)
  const accessToken = jwt.sign(
    { id: userId }, 
    process.env.ACCESS_TOKEN_SECRET, 
    { expiresIn: '1h' }
  );

  // 2. Uzun ömürlü Refresh Token üret (30 günlük)
  const refreshToken = jwt.sign(
    { id: userId }, 
    process.env.REFRESH_TOKEN_SECRET, 
    { expiresIn: '30d' }
  );

  // 3. İsterlerdeki "Gelişmiş Sürüm" kuralı: Oturumu (Session) veritabanına kaydet
  // Eğer kullanıcının eski bir oturumu varsa temizleyebilir veya yanına ekleyebiliriz. 
  // Biz şimdilik her girişte yeni bir session satırı oluşturalım.
  await Session.create({
    uid: userId,
    refreshToken: refreshToken
  });

  return { accessToken, refreshToken };
};

module.exports = {
  generateTokens
};