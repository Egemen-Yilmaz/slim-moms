const express = require('express');
const router = express.Router();
const { getPublicDailyCalorie, saveUserDailyCalorie } = require('../controllers/products');
const { protect } = require('../middlewares/auth');

// Herkese açık kalori hesaplama endpoint'i (POST /api/products/public-calorie)
router.post('/public-calorie', getPublicDailyCalorie);

// Sadece Giriş Yapmış Kullanıcılara Özel Rota (Araya protect koyduk!)
router.post('/user-calorie', protect, saveUserDailyCalorie);

module.exports = router;