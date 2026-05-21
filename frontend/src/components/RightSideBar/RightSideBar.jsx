import UserInfo from "../UserInfo/UserInfo";
import css from "./RightSideBar.module.css";

export default function RightSideBar({ summary, selectedDate }) {
  // Eğer henüz veri yüklenmediyse varsayılan boş şablon gösterilsin
  const {
    dailyCalorieIntake = 0,
    totalEatenCalories = 0,
    kcalLeft = 0,
    notAllowedProducts = [],
  } = summary || {};

  // Tüketim yüzdesi hesabı
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

      <h3>Summary</h3>
      <p>Summary for: {selectedDate || "Select a date"}</p>

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

      <hr />

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
    </aside>
  );
}
