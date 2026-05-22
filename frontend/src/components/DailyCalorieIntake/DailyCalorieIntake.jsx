import { Link } from "react-router-dom";

export default function DailyCalorieIntake({ data, showRegisterBtn }) {
  if (!data) return null;

  return (
    <div style={{ textAlign: "center" }}>
      <h2
        style={{
          color: "#212121",
          marginBottom: "20px",
          fontSize: "20px",
          fontFamily: "Verdana, sans-serif",
          fontWeight: "bold",
          lineHeight: 1.4,
        }}
      >
        Your recommended daily calorie intake is
      </h2>

      <p
        style={{
          fontSize: "44px",
          fontWeight: "bold",
          color: "#fc842c",
          margin: "20px 0",
        }}
      >
        {data.dailyCalorieIntake} <span style={{ fontSize: "18px" }}>kcal</span>
      </p>

      <hr
        style={{
          border: "0",
          borderTop: "1px solid #e0e0e0",
          margin: "20px 0",
        }}
      />

      <h3
        style={{
          fontSize: "16px",
          textAlign: "left",
          marginBottom: "12px",
          fontWeight: "bold",
          color: "#212121",
        }}
      >
        Food you should not eat
      </h3>

      <ul
        style={{
          textAlign: "left",
          maxHeight: "180px",
          overflowY: "auto",
          paddingLeft: "20px",
          color: "#9b9b9b",
          margin: 0,
        }}
      >
        {data.notAllowedProducts?.map((item, i) => (
          <li key={i} style={{ marginBottom: "6px", fontSize: "14px" }}>
            {item}
          </li>
        ))}
      </ul>

      {showRegisterBtn && (
        <div style={{ marginTop: "30px" }}>
          <Link to="/register" style={{ textDecoration: "none" }}>
            <button
              style={{
                width: "210px",
                height: "44px",
                borderRadius: "30px",
                background: "#fc842c",
                color: "white",
                border: "none",
                fontWeight: "bold",
                cursor: "pointer",
                boxShadow: "0px 4px 10px rgba(252, 132, 44, 0.2)",
                fontSize: "14px",
              }}
            >
              Start losing weight
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}
