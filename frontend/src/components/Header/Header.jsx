import { useState } from "react";

import Logo from "./Logo";
import Navigation from "./Navigation";
import BurgerMenu from "./BurgerMenu";

import css from "./Header.module.css";

export default function Header() {
  const isLoggedIn = Boolean(localStorage.getItem("token"));

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className={css.header}>
      <div className={css.left}>
        <Logo />
      </div>

      <div className={css.right}>
        <Navigation isLoggedIn={isLoggedIn} />

        {isLoggedIn && (
          <button
            className={css.burger}
            onClick={() => setIsMenuOpen((p) => !p)}
          >
            ☰
          </button>
        )}
      </div>

      {isLoggedIn && isMenuOpen && (
        <BurgerMenu closeMenu={() => setIsMenuOpen(false)} />
      )}
    </header>
  );
}
