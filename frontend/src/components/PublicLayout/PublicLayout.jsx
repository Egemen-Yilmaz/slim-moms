import { Outlet } from "react-router-dom";
import Header from "../Header/Header";

import css from "./PublicLayout.module.css";

export default function PublicLayout() {
  return (
    <div className={css.layout}>
      <Header />

      <main className={css.main}>
        <Outlet />
      </main>
    </div>
  );
}
