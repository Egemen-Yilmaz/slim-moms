import { useState, useEffect } from "react";
import Logo from "./Logo";
import Navigation from "./Navigation";
import UserInfo from "../UserInfo/UserInfo";
import BurgerMenu from "./BurgerMenu";
import css from "./Header.module.css";

export default function Header() {
  // Giriş durumunu dinamik bir state yapıyoruz ki login olunca anında menü değişsin
  const [isLoggedIn, setIsLoggedIn] = useState(Boolean(localStorage.getItem("token")));
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Token değişikliklerini (Giriş/Çıkış) canlı yakalamak için dinleyici ekliyoruz
  useEffect(() => {
    const handleStorageChange = () => {
      setIsLoggedIn(Boolean(localStorage.getItem("token")));
    };

    // Hem tarayıcı sekmeleri arası senkronizasyon hem de lokal tetiklemeler için
    window.addEventListener("storage", handleStorageChange);
    
    // Giriş yapıldığında tetiklenecek özel bir event (Custom Event) koruması
    window.addEventListener("auth-change", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("auth-change", handleStorageChange);
    };
  }, []);

  return (
    <>
      <header className={css.header}>
        {/* LEFT */}
        <div className={css.left}>
          <Logo />
        </div>

        {/* CENTER NAV (tablet + desktop) */}
        <div className={css.center}>
          <Navigation isLoggedIn={isLoggedIn} />
        </div>

        {/* RIGHT */}
        <div className={css.right}>
          {/* Sadece masaüstü modunda görünecek güvenli alan */}
          {isLoggedIn && (
            <div className={css.userDesktop}>
              <UserInfo />
            </div>
          )}

          {isLoggedIn && (
            <button
              className={css.burger}
              onClick={() => setIsMenuOpen((p) => !p)}
              aria-label="Toggle Menu"
            >
              {isMenuOpen ? "✕" : "☰"}
            </button>
          )}
        </div>
      </header>

      {/* MOBILE USER BAR (Çift görünme bug'ını engellemek için responsive kontrolü CSS'e devredilmeli) */}
      {isLoggedIn && (
        <div className={css.mobileUserBar}>
          <UserInfo />
        </div>
      )}

      {/* BURGER MENU OVERLAY (ESC tuşu ile kapanma desteği ekledik) */}
      {isLoggedIn && isMenuOpen && (
        <BurgerMenu closeMenu={() => setIsMenuOpen(false)} />
      )}
    </>
  );
}