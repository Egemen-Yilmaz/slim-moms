const app = require('./app');
const connectDB = require('./db/connection');

const PORT = process.env.PORT || 8080;

const startServer = async () => {
  // Önce Veritabanına Bağlan
  await connectDB();

  // Sonra Sunucuyu Dinlemeye Başla
  app.listen(PORT, () => {
    console.log(`🚀 Sunucu ${PORT} portu üzerinde başarıyla başlatıldı!`);
  });
};

startServer();