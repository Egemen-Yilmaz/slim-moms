const express = require('express');
const router = express.Router();
const { getPublicDailyCalorie, saveUserDailyCalorie, searchProducts } = require('../controllers/products');
const { protect } = require('../middlewares/auth');

// Herkese açık kalori hesaplama endpoint'i (POST /api/products/public-calorie)
router.post('/public-calorie', getPublicDailyCalorie);

// Sadece Giriş Yapmış Kullanıcılara Özel Rota (Araya protect koyduk!)
router.post('/user-calorie', protect, saveUserDailyCalorie);

// Korumalı Ürün Arama Rotası
router.get('/', protect, searchProducts);

module.exports = router;