/**
 * Kadınlar için günlük kalori ihtiyacını hesaplar.
 * Formül: 10 * ağırlık + 6.25 * boy - 5 * yaş - 161 - 10 * (ağırlık - hedefAğırlık)
 */
const calculateDailyCalorie = (data) => {
  const { weight, height, age, targetWeight } = data;

  const calorieIntake =
    10 * weight +
    6.25 * height -
    5 * age -
    161 -
    10 * (weight - targetWeight);

  // Math.round ile virgülden kurtulup tam sayı olarak dönüyoruz
  return Math.round(calorieIntake);
};

module.exports = {
  calculateDailyCalorie,
};