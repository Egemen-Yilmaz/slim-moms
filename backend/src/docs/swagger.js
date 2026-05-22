// Centralized swagger document for the API
module.exports = {
  openapi: "3.0.0",
  info: {
    title: "Slim Moms API",
    version: "1.0.0",
    description: "Slim Moms Sağlıklı Beslenme ve Kalori Takip Uygulaması API Dökümantasyonu"
  },
  servers: [{ url: "http://localhost:8080", description: "Lokal Geliştirme Sunucusu" }],
  components: {
    securitySchemes: {
      BearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
        description: "Giriş yaptıktan sonra aldığınız token değerini buraya giriniz."
      }
    }
  },
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
