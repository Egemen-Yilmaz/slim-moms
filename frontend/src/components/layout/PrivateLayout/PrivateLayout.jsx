import { Outlet } from "react-router-dom";

export default function PrivateLayout() {
  return (
    <div style={{ display: "flex" }}>
      <div style={{ width: "70%" }}>
        LEFT AREA (Diary / Calculator)
        <Outlet />
      </div>

      <div style={{ width: "30%", background: "#eee" }}>RIGHT SIDEBAR</div>
    </div>
  );
}
