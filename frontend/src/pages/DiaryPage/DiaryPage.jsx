import { useState, useEffect } from "react";
import DiaryDateCalendar from "../../components/diary/DiaryDateCalendar/DiaryDateCalendar";
import DiaryAddProductForm from "../../components/forms/DiaryAddProductForm/DiaryAddProductForm";
import DiaryProductsList from "../../components/diary/DiaryProductsList/DiaryProductsList";
import {
  addProductToDiary,
  removeProductFromDiary,
  getDiaryByDate,
} from "../../api/diary";
import css from "./DiaryPage.module.css";

export default function DiaryPage() {
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0],
  );
  const [eatenProducts, setEatenProducts] = useState([]);
  const [isMobileFormOpen, setIsMobileFormOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // 1. Ekran boyutunu takip edelim (Masaüstüne geçildiğinde formun kilitli kalmaması için)
  useEffect(() => {
    const handleResize = () => {
      const mobileStatus = window.innerWidth < 768;
      setIsMobile(mobileStatus);
      if (!mobileStatus) setIsMobileFormOpen(false); // Masaüstünde mobil modu sıfırla
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 2. Tarih her değiştiğinde günlüğü çek
  useEffect(() => {
    fetchDiaryData(selectedDate);
  }, [selectedDate]);

  const fetchDiaryData = async (date) => {
    try {
      const res = await getDiaryByDate(date);
      setEatenProducts(res.data?.data?.eatenProducts || []);

      // 🔥 Sağ barı (RightSideBar) tetikleyen custom event
      window.dispatchEvent(new CustomEvent("diary-updated", { detail: date }));
    } catch (err) {
      console.error("Diary veri çekme hatası:", err);
    }
  };

  const handleAddProduct = async (productData) => {
    try {
      await addProductToDiary({ date: selectedDate, ...productData });
      fetchDiaryData(selectedDate);
      setIsMobileFormOpen(false); // Ekleme sonrası mobil formu kapat
    } catch (err) {
      console.error("Ürün ekleme hatası:", err);
    }
  };

  // 🔥 Backend rotasıyla (date, productRecordId) uyuşan güvenli silme fonksiyonu
  const handleDeleteProduct = async (recordId) => {
    try {
      await removeProductFromDiary(selectedDate, recordId);
      fetchDiaryData(selectedDate);
    } catch (err) {
      console.error("Ürün silme hatası:", err);
    }
  };

  return (
    <div className={css.leftColumn}>
      {/* Mobilde form açıkken takvimi gizlemek alanı rahatlatır */}
      {(!isMobile || !isMobileFormOpen) && (
        <DiaryDateCalendar
          selectedDate={selectedDate}
          onDateChange={setSelectedDate}
        />
      )}

      {/* Form Alanı: Masaüstünde hep açık, mobilde butonla tetiklenir */}
      {(!isMobile || isMobileFormOpen) && (
        <div
          className={
            isMobileFormOpen ? css.mobileFormWrapper : css.formContainer
          }
        >
          {/* Mobilde formun içinden geri çıkabilmek için kapatma butonu */}
          {isMobileFormOpen && (
            <button
              type="button"
              className={css.mobileCloseBtn}
              onClick={() => setIsMobileFormOpen(false)}
              style={{
                position: "absolute",
                top: "20px",
                left: "20px",
                background: "none",
                border: "none",
                fontSize: "24px",
                cursor: "pointer",
              }}
            >
              ←
            </button>
          )}
          <DiaryAddProductForm
            onAddProduct={handleAddProduct}
            isMobileFormOpen={isMobileFormOpen}
          />
        </div>
      )}

      {/* Liste (Mobilde form açılınca gizlenir) */}
      {(!isMobile || !isMobileFormOpen) && (
        <div className={css.listWrapper}>
          <DiaryProductsList
            eatenProducts={eatenProducts}
            onDeleteProduct={handleDeleteProduct} // Yeni güvenli sarmalayıcı bağlandı
          />
        </div>
      )}

      {/* Sadece Mobildeki Artı Butonu */}
      {isMobile && !isMobileFormOpen && (
        <button
          className={css.mobileAddTrigger}
          onClick={() => setIsMobileFormOpen(true)}
        >
          +
        </button>
      )}
    </div>
  );
}
