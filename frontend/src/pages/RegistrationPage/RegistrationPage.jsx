import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { api } from "../../api/axios";
import { showLoader, hideLoader } from "../../../redux/loader/loaderSlice"; // Global loader'ı çektik

export default function RegistrationPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch(); // Redux dispatch ekledik

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // 🎯 KRİTER: Kılavuzun istediği asenkron Operation fonksiyonu
  // Sayfa içinde kalabilir ya da operation mantığına tam uyması için handle içinde dispatch edilir.
  const registerUserOperation = async (formData) => {
    try {
      // KRİTER: Küresel loader reducer'ını tetikliyoruz
      dispatch(showLoader());
      setError("");

      // Backend'e kayıt isteği atılıyor
      await api.post("/auth/register", formData);

      // En güvenli akış: Kayıt olan kullanıcıyı giriş yapması için login'e yönlendiriyoruz
      // Böylece login formundaki Redux süreçleri (setAuthData) eksiksiz çalışır.
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      // İşlem bittiğinde küresel loader'ı kapatıyoruz
      dispatch(hideLoader());
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // KRİTER: Form Doğrulama (Validation) Kontrolleri
    if (!form.name.trim() || !form.email.trim() || !form.password) {
      setError("All fields are required!");
      return;
    }

    if (form.password.length < 6) {
      setError("Password must be at least 6 characters long!");
      return;
    }

    // Doğrulardan geçtiyse operation'ı tetikle
    registerUserOperation(form);
  };

  return (
    <div>
      <h1>Register</h1>

      <form onSubmit={handleSubmit} noValidate>
        <input
          name="name"
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
        />

        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
        />

        {/* Buton disabled durumunu projenin ortak loader state'ine bağlayabiliriz */}
        <button type="submit">
          Register
        </button>

        {/* KRİTER: "Giriş Yap" butonuna tıklandığında kullanıcı LoginPage sayfasına yönlendirilir */}
        <button type="button" onClick={() => navigate("/login")} style={{ marginLeft: "10px" }}>
          Log In
        </button>

        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
}