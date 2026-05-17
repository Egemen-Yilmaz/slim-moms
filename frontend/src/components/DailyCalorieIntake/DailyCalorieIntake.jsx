import { Link } from "react-router-dom";

function DailyCalorieIntake() {
  return (
    <div>
      <h2>Your recommended daily calorie intake is</h2>

      <p>2800 kcal</p>

      <h3>Foods you should not eat</h3>

      <ul>
        <li>Banana</li>
        <li>Bread</li>
      </ul>

      <Link to="/register">
        <button type="button">Start losing weight</button>
      </Link>
    </div>
  );
}

export default DailyCalorieIntake;
