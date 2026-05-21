import { useState, useEffect } from "react";
import UserInfo from "../UserInfo/UserInfo";
import { getDiaryByDate } from "../../api/diary";
import css from "./RightSideBar.module.css";

export default function RightSideBar() {
  const today = new Date().toISOString().split("T")[0];
  const [currentDate, setCurrentDate] = useState(today);
  const [summary, setSummary] = useState(null);

  const fetchSidebarData = async (date) => {
    try {
      const res = await getDiaryByDate(date);
      if (res.data && res.data.data) {
        setSummary(res.data.data);
      }
    } catch (err) {
      console.error("Sidebar veri hatası:", err);
    }
  };

  useEffect(() => {
    fetchSidebarData(currentDate);
  }, [currentDate]);

  useEffect(() => {
    const handleDiaryUpdate = (event) => {
      const updatedDate = event.detail || currentDate;
      setCurrentDate(updatedDate);
      fetchSidebarData(updatedDate);
    };

    window.addEventListener("diary-updated", handleDiaryUpdate);
    return () => {
      window.removeEventListener("diary-updated", handleDiaryUpdate);
    };
  }, [currentDate]);

  const dailyCalorieIntake =
    summary?.summary?.dailyCalorieIntake || summary?.dailyRate || 0;
  const totalEatenCalories =
    summary?.summary?.totalEatenCalories ||
    summary?.kcalConsumed ||
    summary?.totalEatenCalories ||
    0;
  const kcalLeft = summary?.summary?.kcalLeft || summary?.kcalLeft || 0;
  const notAllowedProducts =
    summary?.summary?.notAllowedProducts || summary?.notAllowedProducts || [];

  const normalPercentage =
    dailyCalorieIntake > 0
      ? Math.round((totalEatenCalories / dailyCalorieIntake) * 100)
      : 0;

  return (
    <aside className={css.sidebar}>
      {/* USER AREA */}
      <div className={css.userSection}>
        <UserInfo />
      </div>

      {/* İÇERİK SARMALAYICI: Tablette yan yana durmayı kolaylaştırır */}
      <div className={css.contentWrapper}>
        {/* SUMMARY BLOCK */}
        <div className={css.summaryBlock}>
          {/* Burası istediğin gibi birleştirildi, eski p etiketi silindi */}
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

        {/* FOOD BLOCK */}
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
