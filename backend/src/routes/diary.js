const express = require('express');
const router = express.Router();
const { addProductToDiary, removeProductFromDiary, getDiaryByDate } = require('../controllers/diary');
const { protect } = require('../middlewares/auth');

// Tüm günlük rotaları korumalıdır (Giriş zorunlu)
router.use(protect);

router.post('/', addProductToDiary); // Günlüğe ürün ekle
router.get('/:date', getDiaryByDate); // Belirli bir günün günlüğünü getir
router.delete('/:date/product/:productId', removeProductFromDiary); // Günlükten ürün sil (date ile uyumlu)

module.exports = router;