import { NavLink } from "react-router-dom";
import css from "./BurgerMenu.module.css";

export default function BurgerMenu({ closeMenu }) {
  return (
    <div className={css.overlay}>
      {/* Ekstra çarpı butonu buradan kaldırıldı */}
      <nav className={css.menu}>
        <NavLink to="/diary" onClick={closeMenu}>
          Diary
        </NavLink>

        <NavLink to="/calculator" onClick={closeMenu}>
          Calculator
        </NavLink>
      </nav>
    </div>
  );
}
