const Product = require('../models/Product');
const Diary = require('../models/Diary');
const { addProductToDiarySchema, getDiaryByDateSchema } = require('../validation/diary');
const { HTTP_STATUS } = require('../utils/constants');

// 1. QUERY-STRING İLE ÜRÜN ARAMA (GET /api/products?search=banana)
const searchProducts = async (req, res, next) => {
  try {
    const { search } = req.query;

    if (!search) {
      return res.status(HTTP_STATUS.OK).json({ status: 'success', data: [] });
    }

    // "search" kelimesini içeren ürünleri bul (Büyük/küçük harf duyarsız yapıyoruz: 'i')
    // Başlık objesinin (title) içindeki dillerde (en, ua, ru vb.) arama yapabilmesi için regex kullanıyoruz
    const products = await Product.find({
      $or: [
        { 'title.en': { $regex: search, $options: 'i' } },
        { 'title.ua': { $regex: search, $options: 'i' } },
        { 'title.ru': { $regex: search, $options: 'i' } }
      ]
    }).limit(20); // Performans için maksimum 20 sonuç dönüyoruz

    return res.status(HTTP_STATUS.OK).json({
      status: 'success',
      data: products
    });
  } catch (err) {
    next(err);
  }
};

// 2. GÜNLÜĞE ÜRÜN EKLEME (POST /api/diary)
const addProductToDiary = async (req, res, next) => {
  try {
    // Gelen veriyi kontrol et
    const { error, value } = addProductToDiarySchema.validate(req.body);
    if (error) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({ status: 'fail', message: error.details[0].message });
    }

    const { date, productId, weight } = value;

    // Ürünün varlığını ve kalorisini kontrol et
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({ status: 'fail', message: 'Ekienecek ürün bulunamadı.' });
    }

    // 100 gram üzerinden kalori oranlama hesabı yapıyoruz: (Ürün Kalorisi / 100) * Yenilen Gram
    const calculatedCalories = Math.round((product.calories / 100) * weight);

    // Yeni eklenecek ürün objesi
    const newEatenProduct = {
      productId: product._id,
      title: product.title,
      weight,
      calories: calculatedCalories
    };

    // Kullanıcının o güne ait günlüğünü bul, yoksa yeni oluştur (upsert)
    // $push operatörü ile yenilen ürünler dizisine yeni ürünü ekliyoruz
    const diary = await Diary.findOneAndUpdate(
      { uid: req.user.id, date },
      { 
        $push: { eatenProducts: newEatenProduct } 
      },
      { upsert: true, new: true }
    );

    return res.status(HTTP_STATUS.CREATED).json({
      status: 'success',
      data: diary
    });
  } catch (err) {
    next(err);
  }
};

// 3. GÜNLÜKTEN ÜRÜN SİLME (DELETE /api/diary/:diaryId/product/:productId)
// Not: Kolaylık olması için dökümanın içindeki spesifik alt ürün ID'sine göre sileceğiz
const removeProductFromDiary = async (req, res, next) => {
  try {
    const { diaryId, productId } = req.params;

    // $pull operatörü yardımıyla ilgili dökümandaki eşleşen alt ürünü diziden söküp atıyoruz
    const updatedDiary = await Diary.findOneAndUpdate(
      { _id: diaryId, uid: req.user.id },
      { $pull: { eatenProducts: { _id: productId } } },
      { new: true }
    );

    if (!updatedDiary) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({ status: 'fail', message: 'Günlük kaydı veya ürün bulunamadı.' });
    }

    return res.status(HTTP_STATUS.OK).json({
      status: 'success',
      data: updatedDiary
    });
  } catch (err) {
    next(err);
  }
};

// 4. BELİRLİ BİR GÜNE AİT BİLGİLERİ GETİRME (GET /api/diary/:date)
const getDiaryByDate = async (req, res, next) => {
  try {
    const { date } = req.params;

    // Tarih formatını doğrula
    const { error } = getDiaryByDateSchema.validate({ date });
    if (error) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({ status: 'fail', message: error.details[0].message });
    }

    const diary = await Diary.findOne({ uid: req.user.id, date });

    // Eğer o gün henüz hiçbir şey yememişse, frontend'in çökmemesi için boş bir şablon dönüyoruz
    if (!diary) {
      return res.status(HTTP_STATUS.OK).json({
        status: 'success',
        data: {
          date,
          eatenProducts: []
        }
      });
    }

    return res.status(HTTP_STATUS.OK).json({
      status: 'success',
      data: diary
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  searchProducts,
  addProductToDiary,
  removeProductFromDiary,
  getDiaryByDate
};