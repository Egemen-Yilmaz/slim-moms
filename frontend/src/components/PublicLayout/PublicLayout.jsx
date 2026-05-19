import { Outlet } from "react-router-dom";

export default function PublicLayout() {
  return (
    <div style={{ background: "blue" }}>
      PUBLIC LAYOUT ÇALIŞIYOR
      <Outlet />
    </div>
  );
}
