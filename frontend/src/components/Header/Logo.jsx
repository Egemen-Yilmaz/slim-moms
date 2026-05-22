import { Link, useLocation } from "react-router-dom";
import css from "./Logo.module.css";

export default function Logo() {
  const location = useLocation();

  // Kullanıcı login veya register sayfasında mı kontrol ediyoruz
  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/register";

  return (
    <Link to="/" className={css.logo}>
      <img src="/slim-moms.svg" alt="Slim Moms Logo" className={css.icon} />

      {/* Eğer auth sayfasındaysak hideOnMobileAuth sınıfını da ekliyoruz */}
      <div className={`${css.text} ${isAuthPage ? css.hideOnMobileAuth : ""}`}>
        <span className={css.slim}>Slim</span>
        <span className={css.mom}>Mom</span>
      </div>
    </Link>
  );
}
