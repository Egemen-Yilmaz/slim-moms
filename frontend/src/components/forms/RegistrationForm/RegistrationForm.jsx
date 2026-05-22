import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { api } from "/src/api/axios.js";
import { showLoader, hideLoader } from "/src/redux/loader/loaderSlice.js";
import css from "./RegistrationForm.module.css";

export default function RegistrationForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

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

  const registerUserOperation = async (formData) => {
    try {
      setError("");
      dispatch(showLoader());

      await api.post("/auth/register", formData);

      dispatch(hideLoader());
      navigate("/login");
    } catch (err) {
      dispatch(hideLoader());
      setError(
        err.response?.data?.message || "Registration failed. Please try again.",
      );
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.password) {
      setError("All fields are required!");
      return;
    }
    if (form.password.length < 6) {
      setError("Password must be at least 6 characters long!");
      return;
    }
    registerUserOperation(form);
  };

  return (
    <form onSubmit={handleSubmit} noValidate className={css.formContainer}>
      <input
        name="name"
        type="text"
        placeholder="Name"
        value={form.name}
        onChange={handleChange}
        className={css.inputField}
      />
      <input
        name="email"
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        className={css.inputField}
      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
        className={css.inputField}
      />

      <div className={css.buttonGroup}>
        <button type="submit" className={css.submitBtn}>
          Register
        </button>
        <button
          type="button"
          onClick={() => navigate("/login")}
          className={css.secondaryBtn}
        >
          Log In
        </button>
      </div>

      {error && <p className={css.errorMessage}>{error}</p>}
    </form>
  );
}
