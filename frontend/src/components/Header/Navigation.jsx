import { NavLink } from "react-router-dom";
import css from "./Navigation.module.css";

export default function Navigation({ isLoggedIn }) {
  return (
    <nav className={css.nav}>
      {!isLoggedIn ? (
        <>
          <NavLink to="/login">Login</NavLink>
          <NavLink to="/register">Registration</NavLink>
        </>
      ) : (
        <>
          <NavLink to="/diary">Diary</NavLink>
          <NavLink to="/calculator">Calculator</NavLink>
        </>
      )}
    </nav>
  );
}
