import { useSelector } from "react-redux";
import css from "./Loader.module.css";

export default function Loader() {
  // Redux store'dan küresel yüklenme durumunu çekiyoruz
  const isLoading = useSelector((state) => state.loader.isLoading);

  // Eğer arka planda bir yükleme yoksa ekrana hiçbir şey basma
  if (!isLoading) return null;

  return (
    <div className={css.overlay}>
      <div className={css.spinner} aria-label="Loading..."></div>
    </div>
  );
}