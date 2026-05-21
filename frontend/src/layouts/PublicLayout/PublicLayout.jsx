import { Outlet } from "react-router-dom";
import Header from "../../components/Header/Header.jsx";

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
