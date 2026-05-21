import { useState, useEffect } from "react";
import DiaryDateCalendar from "../../components/diary/DiaryDateCalendar/DiaryDateCalendar";
import DiaryAddProductForm from "../../components/forms/DiaryAddProductForm/DiaryAddProductForm";
import DiaryProductsList from "../../components/diary/DiaryProductsList/DiaryProductsList";
import RightSideBar from "../../components/RightSideBar/RightSideBar";
import { getDiaryByDate, addProductToDiary, removeProductFromDiary } from "../../api/diary";
import styles from "./DiaryPage.module.css";

export default function DiaryPage() {
  const today = new Date().toISOString().split("T")[0];
  const [selectedDate, setSelectedDate] = useState(today);
  
  const [eatenProducts, setEatenProducts] = useState([]);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // Verileri çeken güvenli useEffect
  useEffect(() => {
    const fetchDiaryData = async () => {
      setLoading(true);
      try {
        const res = await getDiaryByDate(selectedDate);
        if (res.data.status === "success" && res.data.data) {
          setEatenProducts(res.data.data.eatenProducts || []);
          setSummary(res.data.data.summary || null);
        } else {
          setEatenProducts([]);
          setSummary(null);
        }
      } catch (err) {
        console.error("Günlük verisi çekilirken hata oluştu:", err);
        setEatenProducts([]);
        setSummary(null);
      } finally {
        setLoading(false);
      }
    };

    fetchDiaryData();
  }, [selectedDate, refreshTrigger]);

  // Ürün ekleme operasyonu
  const handleAddProduct = async (productData) => {
    try {
      const payload = {
        date: selectedDate,
        productId: productData.productId,
        weight: productData.weight,
      };
      
      const res = await addProductToDiary(payload);
      if (res.data.status === "success") {
        setRefreshTrigger(prev => prev + 1);
      }
    } catch (err) {
      alert("Ürün eklenirken bir hata oluştu.");
      console.error("Ürün ekleme hatası:", err);
    }
  };

  // Ürün silme operasyonu (Doğrudan selectedDate ve ürünün listedeki benzersiz id'sini kullanır)
  const handleIdDeleteProduct = async (productRecordId) => {
    if (!selectedDate || !productRecordId) {
      console.warn("Silme işlemi için gerekli veriler eksik:", { selectedDate, productRecordId });
      return;
    }
    
    console.log("Backend'e DELETE isteği fırlatılıyor. Tarih:", selectedDate, "Ürün Kayıt ID:", productRecordId);
    
    try {
      const res = await removeProductFromDiary(selectedDate, productRecordId);
      if (res.data.status === "success") {
        setRefreshTrigger(prev => prev + 1);
      }
    } catch (err) {
      alert("Ürün silinirken bir hata oluştu.");
      console.error("Ürün silme hatası:", err.response?.data || err);
    }
  };

  return (
    <div className={styles.diaryPageContainer}>
      <div className={styles.leftColumn}>
        <DiaryDateCalendar 
          selectedDate={selectedDate} 
          onDateChange={setSelectedDate} 
        />
        
        <DiaryAddProductForm 
          onAddProduct={handleAddProduct} 
        />
        
        {loading ? (
          <p>Loading diary records...</p>
        ) : (
          <DiaryProductsList 
            eatenProducts={eatenProducts} 
            onDeleteProduct={handleIdDeleteProduct} 
          />
        )}
      </div>

      <div className={styles.rightColumn}>
        <RightSideBar 
          summary={summary} 
          selectedDate={selectedDate} 
        />
      </div>
    </div>
  );
}