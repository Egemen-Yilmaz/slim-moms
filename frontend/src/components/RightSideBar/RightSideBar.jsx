import { useState, useEffect, useCallback } from "react";
import UserInfo from "../UserInfo/UserInfo";
import { getDiaryByDate } from "../../api/diary";
import css from "./RightSideBar.module.css";

export default function RightSideBar() {
  const today = new Date().toISOString().split("T")[0];
  const [currentDate, setCurrentDate] = useState(today);
  const [summary, setSummary] = useState(null);

  // Veri çekme fonksiyonunu useCallback ile sarmalayalım ki bağımlılık olarak güvenle kullanabilelim
  const fetchSidebarData = useCallback(async (date) => {
    try {
      const res = await getDiaryByDate(date);
      if (res.data && res.data.data) {
        setSummary(res.data.data);
      }
    } catch (err) {
      console.error("Sidebar veri hatası:", err);
    }
  }, []);

  // 1. İlk açılışta ve tarih değiştiğinde veriyi çek
  useEffect(() => {
    fetchSidebarData(currentDate);
  }, [currentDate, fetchSidebarData]);

  // 2. Sol taraftan (DiaryPage) gelen canlı güncellemeleri dinle
  useEffect(() => {
    const handleDiaryUpdate = (event) => {
      const updatedDate = event.detail || currentDate;
      setCurrentDate(updatedDate);
      fetchSidebarData(updatedDate); // Doğrudan güncel veriyi iste
    };

    window.addEventListener("diary-updated", handleDiaryUpdate);
    return () => {
      window.removeEventListener("diary-updated", handleDiaryUpdate);
    };
  }, [currentDate, fetchSidebarData]);

  // Veri eşitleme (Senin yazdığın güvenli map yapısı)
  const dailyCalorieIntake =
    summary?.summary?.dailyCalorieIntake || summary?.dailyRate || 0;
  const totalEatenCalories =
    summary?.summary?.totalEatenCalories || summary?.kcalConsumed || 0;
  const kcalLeft = summary?.summary?.kcalLeft || summary?.kcalLeft || 0;
  const notAllowedProducts =
    summary?.summary?.notAllowedProducts || summary?.notAllowedProducts || [];

  const normalPercentage =
    dailyCalorieIntake > 0
      ? Math.round((totalEatenCalories / dailyCalorieIntake) * 100)
      : 0;

  return (
    <aside className={css.sidebar}>
      <div className={css.userSection}>
        <UserInfo />
      </div>

      <div className={css.contentWrapper}>
        <div className={css.summaryBlock}>
          <h3>Summary for {currentDate}</h3>
          <ul>
            <li>
              <strong>Left:</strong> {kcalLeft} kcal
            </li>
            <li>
              <strong>Consumed:</strong> {totalEatenCalories} kcal
            </li>
            <li>
              <strong>Daily Rate:</strong> {dailyCalorieIntake} kcal
            </li>
            <li>
              <strong>Normal %:</strong> {normalPercentage}%
            </li>
          </ul>
        </div>

        <div className={css.foodBlock}>
          <h4>Food not recommended</h4>
          <ul>
            {notAllowedProducts.length > 0 ? (
              notAllowedProducts.map((product, index) => (
                <li key={index}>{product}</li>
              ))
            ) : (
              <li>Your diet is clear!</li>
            )}
          </ul>
        </div>
      </div>
    </aside>
  );
}
