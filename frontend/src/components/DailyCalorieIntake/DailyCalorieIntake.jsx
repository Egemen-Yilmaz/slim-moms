import { Link } from "react-router-dom";

export default function DailyCalorieIntake({ data }) {
  if (!data) return null;

  return (
    <div>
      <h2>Your recommended daily calorie intake is</h2>

      <h1>{data.dailyCalorieIntake}</h1>

      <h3>Food you should not eat</h3>

      <ul>
        {data.notAllowedProducts?.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>

      <Link to="/register">
        <button>Start losing weight</button>
      </Link>
    </div>
  );
}
