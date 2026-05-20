const mongoose = require('mongoose');

const diarySchema = new mongoose.Schema(
  {
    uid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    date: {
      type: String, // 'YYYY-MM-DD' formatında saklamak tarih sorgularını çok kolaylaştırır
      required: true
    },
    eatenProducts: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
        title: { type: Object, required: true }, // Kolay listeleme için ürün adını da burada tutuyoruz
        weight: { type: Number, required: true }, // Tüketilen gramaj (örn: 150g)
        calories: { type: Number, required: true } // Gramaja oranla hesaplanmış kalori
      }
    ]
  },
  { timestamps: true, versionKey: false }
);

// Bir kullanıcının aynı gün için sadece 1 tane diary dökümanı olsun, ürünler onun içindeki diziye (array) eklensin
diarySchema.index({ uid: 1, date: 1 }, { unique: true });

module.exports = mongoose.model('Diary', diarySchema);