import { NavLink } from "react-router-dom";
import css from "./Navigation.module.css";

export default function Navigation({ isLoggedIn }) {
  return (
    /* isLoggedIn durumuna göre nav elementine ekstra bir class veriyoruz */
    <nav className={`${css.nav} ${isLoggedIn ? css.authNav : ""}`}>
      {!isLoggedIn ? (
        <>
          <NavLink to="/login">LOGIN</NavLink>
          <NavLink to="/register">REGISTRATION</NavLink>
        </>
      ) : (
        <>
          <NavLink to="/diary">DIARY</NavLink>
          <NavLink to="/calculator">CALCULATOR</NavLink>
        </>
      )}
    </nav>
  );
}
