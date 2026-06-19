const mongoose = require('mongoose');
require('dotenv').config();

const uri = process.env.MONGODB_URI;

module.exports.connect = async () => {
  if (!uri) {
    throw new Error("Testler başlatılamadı: .env dosyasında MONGODB_URI tanımlı değil!");
  }
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(uri);
  }
};

module.exports.closeDatabase = async () => {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  }
};

module.exports.clearDatabase = async () => {
  if (mongoose.connection.readyState !== 0) {
    const collections = mongoose.connection.collections;
    for (const key in collections) {
      const collection = collections[key];
      await collection.deleteMany({});
    }
  }
};