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

      navigate("/login");
    } catch (err) {
      setError(
        err.response?.data?.message || "Registration failed. Please try again.",
      );
    } finally {
      dispatch(hideLoader());
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
    <div className={css.container}>
      <h2 className={css.title}>REGISTRATION</h2>

      <form onSubmit={handleSubmit} className={css.form} noValidate>
        <input
          type="text"
          name="name"
          placeholder="Name *"
          value={form.name}
          onChange={handleChange}
          className={css.input}
        />

        <input
          type="email"
          name="email"
          placeholder="Email *"
          value={form.email}
          onChange={handleChange}
          className={css.input}
        />

        <input
          type="password"
          name="password"
          placeholder="Password *"
          value={form.password}
          onChange={handleChange}
          className={css.input}
        />

        {error && <p className={css.error}>{error}</p>}

        <div className={css.btnGroup}>
          <button type="submit" className={css.primaryBtn}>
            Register
          </button>

          <button
            type="button"
            className={css.secondaryBtn}
            onClick={() => navigate("/login")}
          >
            Log In
          </button>
        </div>
      </form>
    </div>
  );
}
