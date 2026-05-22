const { userCalorieSchema } = require("../validation/products");
const { calculateDailyCalorie } = require("../services/calorie");
const UserDiet = require("../models/UserDiet");
const Product = require("../models/Product");
const productsService = require("../services/products");

// Kan grubunu array indeksine dönüştüren harita (0:1, A:2, B:3, AB:4)
const bloodTypeMapper = { 0: 1, A: 2, B: 3, AB: 4 };

const getPublicDailyCalorie = async (req, res, next) => {
  try {
    const { error, value } = userCalorieSchema.validate(req.body);
    if (error) {
      return res
        .status(400)
        .json({ status: "fail", message: error.details[0].message });
    }

    const dailyCalorieIntake = calculateDailyCalorie(value);

    // Kan grubuna göre MongoDB indeksini bul
    const bloodIndex = bloodTypeMapper[value.bloodType];

    // İlgili kan grubuna true (yasak) olan benzersiz kategorileri MongoDB'den çekiyoruz
    const queryKey = `groupBloodNotAllowed.${bloodIndex}`;
    const bannedProducts = await Product.find({ [queryKey]: true }).distinct(
      "categories",
    );

    return res.status(200).json({
      status: "success",
      data: {
        dailyCalorieIntake,
        notAllowedProducts: bannedProducts,
      },
    });
  } catch (err) {
    next(err);
  }
};

const saveUserDailyCalorie = async (req, res, next) => {
  try {
    const { error, value } = userCalorieSchema.validate(req.body);
    if (error) {
      return res
        .status(400)
        .json({ status: "fail", message: error.details[0].message });
    }

    const dailyCalorieIntake = calculateDailyCalorie(value);
    const bloodIndex = bloodTypeMapper[value.bloodType];

    const queryKey = `groupBloodNotAllowed.${bloodIndex}`;
    const bannedProducts = await Product.find({ [queryKey]: true }).distinct(
      "categories",
    );

    const userDietData = await UserDiet.findOneAndUpdate(
      { uid: req.user.id },
      {
        uid: req.user.id,
        ...value,
        dailyCalorieIntake,
        notAllowedProducts: bannedProducts,
      },
      { upsert: true, new: true },
    );

    return res.status(200).json({
      status: "success",
      data: userDietData,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getPublicDailyCalorie,
  saveUserDailyCalorie,
};

// Ürün arama handler'ı (controller katmanı)
const searchProducts = async (req, res, next) => {
  try {
    const { search } = req.query;
    const products = await productsService.searchProducts(search);

    return res.status(200).json({ status: "success", data: products });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getPublicDailyCalorie,
  saveUserDailyCalorie,
  searchProducts,
};
