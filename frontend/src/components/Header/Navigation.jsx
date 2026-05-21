import { NavLink } from "react-router-dom";
import css from "./Navigation.module.css";

export default function Navigation({ isLoggedIn }) {
  // Aktif olan linkin rengini turuncu yapan şık yardımcı fonksiyon
  const linkClassName = ({ isActive }) => 
    `${css.link} ${isActive ? css.activeLink : ""}`;

  return (
    <nav className={css.nav}>
      {!isLoggedIn ? (
        <>
          <NavLink to="/login" className={linkClassName}>Login</NavLink>
          <NavLink to="/register" className={linkClassName}>Registration</NavLink>
        </>
      ) : (
        <>
          <NavLink to="/diary" className={linkClassName}>Diary</NavLink>
          <NavLink to="/calculator" className={linkClassName}>Calculator</NavLink>
        </>
      )}
    </nav>
  );
}