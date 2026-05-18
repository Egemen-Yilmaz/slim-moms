const express = require('express');
const router = express.Router();
const { getPublicDailyCalorie } = require('../controllers/products');

// Herkese açık kalori hesaplama endpoint'i (POST /api/products/public-calorie)
router.post('/public-calorie', getPublicDailyCalorie);

module.exports = router;