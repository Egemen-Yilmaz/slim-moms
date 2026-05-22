import RegistrationForm from "/src/components/forms/RegistrationForm/RegistrationForm.jsx";
import css from "./RegistrationPage.module.css";

export default function RegisterPage() {
  return (
    <div className={css.pageWrapper}>
      <div className={css.contentArea}>
        <h2 className={css.title}>Register</h2>

        {/* Formumuz bu alanın içine oturuyor */}
        <RegistrationForm />
      </div>

      {/* Büyük ekrandaki yan plan görselleri de genelde buraya konur */}
      <div className={css.backgroundDecoration}></div>
    </div>
  );
}
