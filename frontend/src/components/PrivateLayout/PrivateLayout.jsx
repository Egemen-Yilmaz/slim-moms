import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import RightSideBar from "../RightSideBar/RightSideBar";
import "./PrivateLayout.module.css";

export default function PrivateLayout() {
  return (
    <div className="private-layout">
      <div className="left-side">
        <Header />
        <Outlet />
      </div>

      <RightSideBar />
    </div>
  );
}
