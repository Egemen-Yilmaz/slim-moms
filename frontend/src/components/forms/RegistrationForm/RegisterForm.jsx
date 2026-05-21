import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../../api/auth"; // API klasöründeki register fonksiyonunuzun adı
import { showLoader, hideLoader } from "../../../redux/loader/loaderSlice";
import css from "./RegistrationForm.module.css";

const RegistrationForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    const name = e.target.name.value.trim();
    const email = e.target.email.value.trim();
    const password = e.target.password.value;

    // KRİTER: Form Doğrulama (Validation) Kontrolleri
    if (!name || !email || !password) {
      setErrorMsg("All fields are required!");
      return;
    }

    if (name.length < 2) {
      setErrorMsg("Name must be at least 2 characters long!");
      return;
    }

    if (password.length < 6) {
      setErrorMsg("Password must be at least 6 characters long!");
      return;
    }

    const data = { name, email, password };

    try {
      // Loader'ı başlat
      dispatch(showLoader());

      // KRİTER: Kayıt işlemi operation/API çağrısı
      await registerUser(data);

      // Kayıt başarılı olunca kullanıcıyı doğrudan giriş sayfasına pasla
      navigate("/login");
    } catch (err) {
      console.error(err.response?.data);
      setErrorMsg(err.response?.data?.message || "Registration failed. Email might be in use.");
    } finally {
      // Loader'ı kapat
      dispatch(hideLoader());
    }
  };

  return (
    <div className={css.container}>
      <h2 className={css.title}>REGISTER</h2>
      <form onSubmit={handleSubmit} className={css.form} noValidate>
        <div className={css.inputGroup}>
          <input 
            type="text" 
            name="name" 
            placeholder="Name *" 
            required 
            className={css.input}
          />
        </div>

        <div className={css.inputGroup}>
          <input 
            type="email" 
            name="email" 
            placeholder="Email *" 
            required 
            className={css.input}
          />
        </div>
        
        <div className={css.inputGroup}>
          <input 
            type="password" 
            name="password" 
            placeholder="Password *" 
            required 
            className={css.input}
          />
        </div>

        {errorMsg && <p className={css.error}>{errorMsg}</p>}

        <div className={css.btnGroup}>
          <button type="submit" className={css.registerBtn}>Register</button>
          <button 
            type="button" 
            className={css.loginRedirectBtn}
            onClick={() => navigate("/login")} // KRİTER: Giriş Yap sayfasına yönlendirme
          >
            Log In
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegistrationForm;