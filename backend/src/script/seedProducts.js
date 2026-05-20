const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

// 1. ADIM: .env dosyasını tam yol vererek yüklemeyi garantiye alalım
const envPath = path.join(__dirname, '../../.env');
console.log('🔍 .env dosyası aranıyor:', envPath);
dotenv.config({ path: envPath });

let Product = require('../models/Product');
// Eğer model bir şekilde nesne içinde sarılı geldiyse onu açalım:
if (Product.Product) {
  Product = Product.Product;
}

const DB_URI = process.env.MONGODB_URI;
console.log('🌐 MongoDB URI Değeri:', DB_URI ? 'Bulundu (Gizli tutuluyor)' : '❌ BULUNAMADI!');

const seedData = async () => {
  console.log('🚀 seedData fonksiyonu tetiklendi, işlemler başlıyor...');
  
  if (!DB_URI) {
    console.error('❌ HATA: .env dosyasında MONGODB_URI tanımlı değil!');
    process.exit(1);
  }

  try {
    // 2. ADIM: Bağlantı denemesi
    console.log('⏳ MongoDB\'ye bağlanılmaya çalışılıyor...');
    await mongoose.connect(DB_URI);
    console.log('🔌 MongoDB bağlantısı başarılı.');

    // 3. ADIM: Dosya kontrolü
    const filePath = path.join(__dirname, '../../../data/products.json');
    console.log('📂 JSON dosyası okunuyor:', filePath);
    
    if (!fs.existsSync(filePath)) {
      console.error('❌ HATA: data/products.json dosyası belirtilen yolda bulunamadı!');
      process.exit(1);
    }

    const rawData = fs.readFileSync(filePath, 'utf-8');
    const productsJson = JSON.parse(rawData);
    console.log(`📋 JSON dosyasında ${productsJson.length} adet ham ürün bulundu.`);

    // 4. ADIM: Temizlik
    console.log('🧹 Eski ürün listesi temizleniyor...');
    await Product.deleteMany({});
    console.log('✨ Eski veriler temizlendi.');

    // 5. ADIM: Formatlama
    console.log('🔄 Veriler yeni şema yapısına dönüştürülüyor...');
    const formattedProducts = productsJson
      .filter(prod => prod.calories !== undefined && prod.calories !== null) // <-- KALORİSİ OLMAYAN HATALI ÜRÜNLERİ ELİYORUZ!
      .map((prod) => {
        const formattedTitle = typeof prod.title === 'string' 
          ? { en: prod.title, ua: prod.title, ru: prod.title } 
          : prod.title;

        return {
          _id: prod._id && prod._id.$oid ? prod._id.$oid : undefined,
          categories: Array.isArray(prod.categories) ? prod.categories : [prod.categories],
          weight: Number(prod.weight) || 100,
          title: formattedTitle,
          calories: Number(prod.calories), // Sayı tipine zorluyoruz (Garantici yaklaşım)
          groupBloodNotAllowed: Array.isArray(prod.groupBloodNotAllowed) ? prod.groupBloodNotAllowed : [null, false, false, false, false]
        };
      });

    console.log(`🧹 Filtreleme sonrası ${formattedProducts.length} geçerli ürün formatlandı.`);

    // 6. ADIM: Yükleme
    console.log(`📤 ${formattedProducts.length} adet ürün MongoDB'ye yazılıyor...`);
    await Product.insertMany(formattedProducts);

    console.log('✅ Ürünler başarıyla MongoDB içine yüklendi!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Yükleme sırasında kritik bir hata oluştu:', error);
    process.exit(1);
  }
};

// Fonksiyonun çalıştığından emin olmak için bir log daha atalım
console.log('🎬 Script dosyası yüklendi, ana fonksiyon çağrılıyor...');
seedData();