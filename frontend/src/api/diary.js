import { api } from "./axios";

/**
 * 1. Belirlenmiş tarihteki günlük verilerini ve sağ bar özetini çeker
 * @param {string} date - YYYY-MM-DD formatında tarih
 */
export const getDiaryByDate = async (date) => {
  return api.get(`/diary/${date}`);
};

/**
 * 2. Günlüğe yeni tüketilen gıda/ürün ekler
 * @param {Object} data - { date, productId, weight }
 */
export const addProductToDiary = async (data) => {
  return api.post("/diary", data);
};

/**
 * 3. Günlükten eklenmiş olan bir ürünü siler
 * @param {string} date - (Uyum için gönderiliyor)
 * @param {string} productRecordId - Ürünün o günkü listedeki benzersiz _id değeri
 */
export const removeProductFromDiary = async (date, productRecordId) => {
  // Yeni backend rota: DELETE /api/diary/:date/product/:productId
  return api.delete(`/diary/${date}/product/${productRecordId}`);
};

/**
 * 4. Ürün ekleme formunda inputa yazılan kelimeye göre ürün arar
 * @param {string} query - Aranacak kelime (örn: banana)
 */
export const searchProducts = async (query) => {
  return api.get(`/products?search=${query}`);
};

/**
 * Giriş yapmış kullanıcının kalori ihtiyacını hesaplar ve veri tabanına kaydeder
 * @param {Object} userData - { height, age, currentWeight, desiredWeight, bloodType }
 */
export const calculateUserDiet = async (userData) => {
  // Backend'deki diyet hesaplama/kaydetme endpoint'ine POST isteği atıyoruz
  const response = await api.post('/diet', userData);
  return response.data;
};