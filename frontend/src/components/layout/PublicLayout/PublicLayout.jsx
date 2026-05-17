import { Outlet } from "react-router-dom";

export default function PublicLayout() {
  return (
    <div>
      <header>PUBLIC HEADER (Login/Register)</header>
      <Outlet />
    </div>
  );
}
