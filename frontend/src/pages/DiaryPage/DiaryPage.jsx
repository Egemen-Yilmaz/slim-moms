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

  useEffect(() => {
    fetchDiaryData(selectedDate);
  }, [selectedDate]);

  const fetchDiaryData = async (date) => {
    const res = await getDiaryByDate(date);
    setEatenProducts(res.data?.data?.eatenProducts || []);
  };

  const handleAddProduct = async (productData) => {
    await addProductToDiary({ date: selectedDate, ...productData });
    fetchDiaryData(selectedDate);
    setIsMobileFormOpen(false);
  };

  return (
    <div className={css.leftColumn}>
      {/* 1. Her zaman görünen Takvim */}
      <DiaryDateCalendar
        selectedDate={selectedDate}
        onDateChange={setSelectedDate}
      />

      {/* 2. Tek Form (Mobilde sınıfı değişir, masaüstünde sabit durur) */}
      <div
        className={isMobileFormOpen ? css.mobileFormWrapper : css.formContainer}
      >
        <DiaryAddProductForm
          onAddProduct={handleAddProduct}
          isMobileFormOpen={isMobileFormOpen}
        />
      </div>

      {/* 3. Liste (Mobilde form açılınca gizlenir) */}
      {!isMobileFormOpen && (
        <div className={css.listWrapper}>
          <DiaryProductsList
            eatenProducts={eatenProducts}
            onDeleteProduct={removeProductFromDiary}
          />
        </div>
      )}

      {/* 4. Sadece Mobildeki Artı Butonu */}
      {!isMobileFormOpen && (
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
