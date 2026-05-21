import { useState } from "react";

import Logo from "./Logo";
import Navigation from "./Navigation";
import UserInfo from "../UserInfo/UserInfo";
import BurgerMenu from "./BurgerMenu";

import css from "./Header.module.css";

export default function Header() {
  const isLoggedIn = Boolean(localStorage.getItem("token"));

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <header className={css.header}>
        {/* LEFT */}
        <div className={css.left}>
          <Logo />
        </div>

        {/* CENTER NAV (tablet+ desktop) */}
        <div className={css.center}>
          <Navigation isLoggedIn={isLoggedIn} />
        </div>

        {/* RIGHT */}
        <div className={css.right}>
          {isLoggedIn && (
            <div className={css.userDesktop}>
              <UserInfo />
            </div>
          )}

          {isLoggedIn && (
            <button
              className={css.burger}
              onClick={() => setIsMenuOpen((p) => !p)}
            >
              ☰
            </button>
          )}
        </div>
      </header>

      {/* MOBILE USER BAR (HEADER ALTINDA GRİ BAR) */}
      {isLoggedIn && (
        <div className={css.mobileUserBar}>
          <UserInfo />
        </div>
      )}

      {/* BURGER MENU OVERLAY */}
      {isLoggedIn && isMenuOpen && (
        <BurgerMenu closeMenu={() => setIsMenuOpen(false)} />
      )}
    </>
  );
}
