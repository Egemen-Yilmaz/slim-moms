import { Outlet } from "react-router-dom";
import Header from "../../components/Header/Header";
import RightSideBar from "../../components/RightSideBar/RightSideBar";
import css from "./PrivateLayout.module.css";

export default function PrivateLayout() {
  return (
    <div className={css.wrapper}>
      {/* SOL Taraf: Header ve Altındaki Sayfa İçeriği */}
      <div className={css.layout}>
        <Header />

        <main className={css.main}>
          <Outlet />
        </main>
      </div>

      {/* SAĞ Taraf: En tepeden başlayan gri alan */}
      <aside className={css.sidebar}>
        <RightSideBar />
      </aside>
    </div>
  );
}
