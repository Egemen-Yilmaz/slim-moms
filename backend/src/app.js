const express = require('express');
const cors = require('cors');
require('dotenv').config();
const swaggerUi = require('swagger-ui-express');
const diaryRouter = require('./routes/diary');

const app = express();

const swaggerDocument = {
  openapi: "3.0.0",
  info: {
    title: "Slim Moms API",
    version: "1.0.0",
    description: "Slim Moms Sağlıklı Beslenme ve Kalori Takip Uygulaması API Dökümantasyonu"
  },
  servers: [
    {
      url: "http://localhost:8080",
      description: "Lokal Geliştirme Sunucusu"
    }
  ],
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
        responses: {
          "201": { description: "Kullanıcı başarıyla oluşturuldu ve tokenlar döndü." }
        }
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
        responses: {
          "200": { description: "Giriş başarılı." },
          "401": { description: "Hatalı e-posta veya şifre." }
        }
      }
    },
    "/api/products/public-calorie": {
      post: {
        summary: "Giriş Yapmadan Kalori Hesaplama",
        tags: ["Products"],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["height", "age", "weight", "targetWeight", "bloodType"],
                properties: {
                  height: { type: "number", example: 170 },
                  age: { type: "number", example: 28 },
                  weight: { type: "number", example: 75 },
                  targetWeight: { type: "number", example: 65 },
                  bloodType: { type: "number", example: 2 }
                }
              }
            }
          }
        },
        responses: {
          "200": { description: "Hesaplama başarılı." }
        }
      }
    }
  }
};

// 1. ÖNCE MIDDLEWARE'LER (JSON okuyucu mutlaka rotalardan üstte olmalı!)
app.use(cors());
app.use(express.json()); 

// 📝 Swagger API Dökümantasyon Rotası (Görsel arayüz için middleware'lerin hemen altında)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// 2. SONRA ROTALAR
const authRouter = require('./routes/auth');
const productsRouter = require('./routes/products');

app.use('/api/auth', authRouter);
app.use('/api/products', productsRouter);
app.use('/api/diary', diaryRouter);

// Test Endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: "success", message: "Server çalışıyor ve sağlıklı!" });
});

// 🔍 3. 404 HATA YÖNETİMİ (Eğer istek yukarıdaki hiçbir rotaya eşleşmediyse buraya düşer)
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