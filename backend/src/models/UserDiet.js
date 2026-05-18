const mongoose = require('mongoose');

const userDietSchema = new mongoose.Schema(
  {
    uid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true // Her kullanıcının sadece 1 adet güncel diyet/kalori kaydı olsun
    },
    height: { type: Number, required: true },
    age: { type: Number, required: true },
    weight: { type: Number, required: true },
    targetWeight: { type: Number, required: true },
    bloodType: { type: Number, required: true },
    dailyCalorieIntake: { type: Number, required: true },
    notAllowedProducts: { type: Array, default: [] } // Şimdilik boş dizi, 4. Fazda dolduracağız
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model('UserDiet', userDietSchema);