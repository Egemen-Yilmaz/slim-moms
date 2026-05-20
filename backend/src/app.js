const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

// 1. ÖNCE MIDDLEWARE'LER (JSON okuyucu mutlaka rotalardan üstte olmalı!)

app.use(
  cors({
    origin: "http://localhost:5174", // Tarayıcında ne görüyorsan NOKTA ATIŞI onu yaz (5173 veya 5174)
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);
app.use(express.json());

// 2. SONRA ROTALAR
const authRouter = require("./routes/auth");
const productsRouter = require("./routes/products");

app.use("/api/auth", authRouter);
app.use("/api/products", productsRouter);

// Test Endpoint
app.get("/api/health", (req, res) => {
  res
    .status(200)
    .json({ status: "success", message: "Server çalışıyor ve sağlıklı!" });
});

// Global Hata Yakalama
app.use((err, req, res, next) => {
  const statusCode = err.status || 500;
  res.status(statusCode).json({
    status: "error",
    message: err.message || "Sunucu içi bir hata oluştu.",
  });
});

module.exports = app;
