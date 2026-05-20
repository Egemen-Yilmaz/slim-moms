const express = require('express');
const cors = require('cors');
require('dotenv').config();
const swaggerUi = require('swagger-ui-express');

// Rota Tanımlamaları
const authRouter = require('./routes/auth');
const productsRouter = require('./routes/products');
const diaryRouter = require('./routes/diary'); // Egemen'in eklediği günlük rotası

const app = express();

// 📝 SWAGGER DÖKÜMANTASYON VERİSİ
const swaggerDocument = {
  openapi: "3.0.0",
  info: {
    title: "Slim Moms API",
    version: "1.0.0",
    description: "Slim Moms Sağlıklı Beslenme ve Kalori Takip Uygulaması API Dökümantasyonu"
  },
  servers: [{ url: "http://localhost:8080", description: "Lokal Geliştirme Sunucusu" }],
  paths: {
    "/api/auth/register": {
      post: {
        summary: "Yeni Kullanıcı Kaydı",
        tags: ["Auth"],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["name", "email", "password"],
                properties: {
                  name: { type: "string", example: "Egemen Yılmaz" },
                  email: { type: "string", example: "egemen@test.com" },
                  password: { type: "string", example: "123456" }
                }
              }
            }
          }
        },
        responses: { "201": { description: "Kullanıcı başarıyla oluşturuldu." } }
      }
    },
    "/api/auth/login": {
      post: {
        summary: "Kullanıcı Girişi",
        tags: ["Auth"],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["email", "password"],
                properties: {
                  email: { type: "string", example: "egemen@test.com" },
                  password: { type: "string", example: "123456" }
                }
              }
            }
          }
        },
        responses: { "200": { description: "Giriş başarılı." } }
      }
    }
  }
};

// 1. MIDDLEWARE'LER
// CORS'u en geniş ve esnek haliyle bırakıyoruz ki frontend portu (5173, 5174 vs.) ne olursa olsun engellenmesin!
app.use(cors({
  origin: '*', 
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json()); 

// 📝 Swagger UI Arayüzü (http://localhost:8080/api-docs adresinden bakabilirsin)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// 2. AKTİF ROTALAR
app.use('/api/auth', authRouter);
app.use('/api/products', productsRouter);
app.use('/api/diary', diaryRouter); // Günlük rotasını buraya bağladık

// Sağlık Kontrolü Endpoint'i
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: "success", message: "Server çalışıyor ve sağlıklı!" });
});

// 3. 404 HATA YÖNETİMİ
app.use((req, res) => {
  res.status(404).json({ status: 'fail', message: 'İstediğiniz rota bulunamadı.' });
});

// 4. GLOBAL HATA YAKALAMA
app.use((err, req, res, next) => {
  const statusCode = err.status || 500;
  res.status(statusCode).json({
    status: "error",
    message: err.message || "Sunucu içi bir hata oluştu."
  });
});

module.exports = app;