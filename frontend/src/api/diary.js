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
 * @param {string} diaryId - Günlük kaydının asıl _id değeri
 * @param {string} productId - Silinecek ürünün dizi içindeki _id değeri
 */
export const removeProductFromDiary = async (diaryId, productId) => {
  return api.delete(`/diary/${diaryId}/product/${productId}`);
};

/**
 * 4. Ürün ekleme formunda inputa yazılan kelimeye göre ürün arar
 * @param {string} query - Aranacak kelime (örn: banana)
 */
export const searchProducts = async (query) => {
  return api.get(`/products?search=${query}`);
};