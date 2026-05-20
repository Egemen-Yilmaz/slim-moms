import { Link } from "react-router-dom";
import css from "./Logo.module.css";

export default function Logo() {
  return (
    <Link to="/" className={css.logo}>
      <img src="/slim-moms.svg" alt="Slim Moms" className={css.icon} />

      <div className={css.text}>
        <span className={css.slim}>Slim</span>
        <span className={css.mom}>Mom</span>
      </div>
    </Link>
  );
}
