const Product = require('../models/Product');
const Diary = require('../models/Diary');
const UserDiet = require('../models/UserDiet'); // 👈 UserDiet modelini ekledik
const { addProductToDiarySchema, getDiaryByDateSchema } = require('../validation/diary');
const { HTTP_STATUS } = require('../utils/constants');

// Yardımcı Fonksiyon: Günlük ve Diyet verilerinden ortak özet üretir
const calculateDiarySummary = async (userId, diary, targetDate) => {
  const userDiet = await UserDiet.findOne({ uid: userId });
  const dailyLimit = userDiet ? userDiet.dailyCalorieIntake : 0;
  const notAllowedProducts = userDiet ? userDiet.notAllowedProducts : [];

  if (!diary || !diary.eatenProducts || diary.eatenProducts.length === 0) {
    return {
      dailyCalorieIntake: dailyLimit,
      totalEatenCalories: 0,
      kcalLeft: dailyLimit,
      notAllowedProducts
    };
  }

  const totalEatenCalories = diary.eatenProducts.reduce((sum, item) => sum + (item.calories || 0), 0);
  const kcalLeft = dailyLimit - totalEatenCalories;

  return {
    dailyCalorieIntake: dailyLimit,
    totalEatenCalories: Math.round(totalEatenCalories),
    kcalLeft: Math.round(kcalLeft),
    notAllowedProducts
  };
};

// 1. QUERY-STRING İLE ÜRÜN ARAMA (GET /api/products?search=banana)
const searchProducts = async (req, res, next) => {
  try {
    const { search } = req.query;
    if (!search) {
      return res.status(HTTP_STATUS.OK).json({ status: 'success', data: [] });
    }

    const products = await Product.find({
      $or: [
        { 'title.en': { $regex: search, $options: 'i' } },
        { 'title.ua': { $regex: search, $options: 'i' } },
        { 'title.ru': { $regex: search, $options: 'i' } }
      ]
    }).limit(20);

    return res.status(HTTP_STATUS.OK).json({ status: 'success', data: products });
  } catch (err) {
    next(err);
  }
};

// 2. GÜNLÜĞE ÜRÜN EKLEME (POST /api/diary)
const addProductToDiary = async (req, res, next) => {
  try {
    const { error, value } = addProductToDiarySchema.validate(req.body);
    if (error) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({ status: 'fail', message: error.details[0].message });
    }

    const { date, productId, weight } = value;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({ status: 'fail', message: 'Eklenecek ürün bulunamadı.' });
    }

    const calculatedCalories = Math.round((product.calories / 100) * weight);

    const newEatenProduct = {
      productId: product._id,
      title: product.title,
      weight,
      calories: calculatedCalories
    };

    const diary = await Diary.findOneAndUpdate(
      { uid: req.user.id, date },
      { $push: { eatenProducts: newEatenProduct } },
      { upsert: true, new: true }
    );

    // 🔥 Dinamik Özet Hesaplama
    const summary = await calculateDiarySummary(req.user.id, diary, date);

    return res.status(HTTP_STATUS.CREATED).json({
      status: 'success',
      data: {
        _id: diary._id,
        uid: diary.uid,
        date: diary.date,
        eatenProducts: diary.eatenProducts,
        summary // 👈 Frontend ekleme yaptıktan sonra sağ barı anında güncelleyebilecek!
      }
    });
  } catch (err) {
    next(err);
  }
};

// 3. GÜNLÜKTEN ÜRÜN SİLME (DELETE /api/diary/:diaryId/product/:productId)
const removeProductFromDiary = async (req, res, next) => {
  try {
    const { diaryId, productId } = req.params;

    const updatedDiary = await Diary.findOneAndUpdate(
      { _id: diaryId, uid: req.user.id },
      { $pull: { eatenProducts: { _id: productId } } },
      { new: true }
    );

    if (!updatedDiary) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({ status: 'fail', message: 'Günlük kaydı veya ürün bulunamadı.' });
    }

    // 🔥 Dinamik Özet Hesaplama
    const summary = await calculateDiarySummary(req.user.id, updatedDiary, updatedDiary.date);

    return res.status(HTTP_STATUS.OK).json({
      status: 'success',
      data: {
        _id: updatedDiary._id,
        uid: updatedDiary.uid,
        date: updatedDiary.date,
        eatenProducts: updatedDiary.eatenProducts,
        summary // 👈 Frontend silme yaptıktan sonra sağ barı anında güncelleyebilecek!
      }
    });
  } catch (err) {
    next(err);
  }
};

// 4. BELİRLİ BİR GÜNE AİT BİLGİLERİ GETİRME (GET /api/diary/:date)
const getDiaryByDate = async (req, res, next) => {
  try {
    const { date } = req.params;

    const { error } = getDiaryByDateSchema.validate({ date });
    if (error) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({ status: 'fail', message: error.details[0].message });
    }

    const diary = await Diary.findOne({ uid: req.user.id, date });
    const summary = await calculateDiarySummary(req.user.id, diary, date);

    return res.status(HTTP_STATUS.OK).json({
      status: 'success',
      data: {
        date,
        eatenProducts: diary ? diary.eatenProducts : [],
        summary
      }
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