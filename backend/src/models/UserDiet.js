const mongoose = require('mongoose');

const userDietSchema = new mongoose.Schema(
  {
    uid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    height: { type: Number, required: true },
    age: { type: Number, required: true },
    weight: { type: Number, required: true },
    targetWeight: { type: Number, required: true },
    bloodType: { type: String, required: true },
    dailyCalorieIntake: { type: Number, required: true },
    notAllowedProducts: { type: Array, required: true }
  },
  { collection: 'user_diets', versionKey: false }
);

module.exports = mongoose.model('UserDiet', userDietSchema);