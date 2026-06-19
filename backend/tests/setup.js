const mongoose = require('mongoose');

module.exports.connect = async () => {
  const uri = process.env.MONGO_URI_TEST || 'mongodb+srv://egemenylmz01_db_user:uoc9B26S7etROoQX@cluster-slim-mom.uvzvxcs.mongodb.net/slim-moms-test?appName=Cluster-slim-mom';
  
  await mongoose.connect(uri);
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