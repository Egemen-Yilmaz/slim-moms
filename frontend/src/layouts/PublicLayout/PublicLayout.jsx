import { Outlet } from "react-router-dom";
import Header from "../../components/Header/Header.jsx";

import leaf from "../../assets/images/leaf.svg";
import banana from "../../assets/images/banana.svg";
import strawberry from "../../assets/images/strawberry.svg";
import shape from "../../assets/images/background-shape.svg";

import css from "./PublicLayout.module.css";

export default function PublicLayout() {
  return (
    <div className={css.layout}>
      {/* BACKGROUND (decorative right-side system) */}
      <div className={css.hero}>
        <img src={leaf} className={css.leaf1} />
        <img src={banana} className={css.banana} />
        <img src={strawberry} className={css.strawberry} />
        <img src={shape} className={css.shape} />
      </div>

      <Header />

      {/* CONTENT WRAPPER (SOL HİZALI MERKEZSİZ SİSTEM) */}
      <main className={css.main}>
        <div className={css.container}>
          <Outlet />
        </div>
      </main>
    </div>
  );
}
