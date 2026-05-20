const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    categories: { 
      type: Array, 
      required: true 
    },
    weight: { 
      type: Number, 
      required: true, 
      default: 100 
    },
    title: { 
      type: Object, // Çok dilli aramayı desteklemek için nesne yapıyoruz: { en: "...", ua: "..." }
      required: true 
    },
    calories: { 
      type: Number, 
      required: true 
    },
    groupBloodNotAllowed: { 
      type: Array, 
      required: true // [null, true, false, false, true] formatındaki kan grubu yasak dizisi
    }
  },
  { collection: 'products', versionKey: false } // MongoDB'deki fiziksel koleksiyon adını 'products' olarak sabitliyoruz
);

module.exports = mongoose.model('Product', productSchema);