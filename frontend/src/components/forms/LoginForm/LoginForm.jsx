import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../../api/auth";
import { setAuthData } from "../../../redux/auth/authSlice";
import { showLoader, hideLoader } from "../../../redux/loader/loaderSlice"; // Loader'ı ekledik
import css from "./LoginForm.module.css";

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // Hata mesajlarını ekranda şıkça göstermek için state
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    const email = e.target.email.value.trim();
    const password = e.target.password.value;

    // KRİTER: Form Doğrulama (Validation) Kontrolleri
    if (!email || !password) {
      setErrorMsg("All fields are required!");
      return;
    }

    if (password.length < 6) {
      setErrorMsg("Password must be at least 6 characters long!");
      return;
    }

    const data = { email, password };

    try {
      // API İsteği başlarken loader'ı açıyoruz
      dispatch(showLoader());
      
      const res = await loginUser(data);

      // Redux'a auth verilerini kaydet
      dispatch(setAuthData(res.data.data));

      // Kullanıcıyı günlüğe yönlendir
      navigate("/diary");
    } catch (err) {
      console.error(err.response?.data);
      setErrorMsg(err.response?.data?.message || "Login failed. Please check your credentials.");
    } finally {
      // İşlem bittiğinde (başarılı veya başarısız) loader'ı kapatıyoruz
      dispatch(hideLoader());
    }
  };

  return (
    <div className={css.container}>
      <h2 className={css.title}>LOG IN</h2>
      <form onSubmit={handleSubmit} className={css.form} noValidate>
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
          <button type="submit" className={css.loginBtn}>Log In</button>
          <button 
            type="button" 
            className={css.registerRedirectBtn}
            onClick={() => navigate("/register")} // KRİTER: Kayıt Ol'a yönlendirme
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;