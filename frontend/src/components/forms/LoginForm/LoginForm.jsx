import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { loginUser } from "../../../api/auth";
import { setAuthData } from "../../../redux/auth/authSlice";
import { showLoader, hideLoader } from "../../../redux/loader/loaderSlice";

import css from "./LoginForm.module.css";

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrorMsg("");

    const email = e.target.email.value.trim();
    const password = e.target.password.value;

    if (!email || !password) {
      setErrorMsg("All fields are required!");
      return;
    }

    if (password.length < 6) {
      setErrorMsg("Password must be at least 6 characters long!");
      return;
    }

    try {
      dispatch(showLoader());

      const res = await loginUser({ email, password });

      dispatch(setAuthData(res.data.data));

      navigate("/diary");
    } catch (err) {
      setErrorMsg(
        err.response?.data?.message ||
          "Login failed. Please check your credentials.",
      );
    } finally {
      dispatch(hideLoader());
    }
  };

  return (
    <div className={css.container}>
      <h2 className={css.title}>LOG IN</h2>

      <form onSubmit={handleSubmit} className={css.form} noValidate>
        <input
          type="email"
          name="email"
          placeholder="Email *"
          className={css.input}
        />

        <input
          type="password"
          name="password"
          placeholder="Password *"
          className={css.input}
        />

        {errorMsg && <p className={css.error}>{errorMsg}</p>}

        <div className={css.btnGroup}>
          <button type="submit" className={css.primaryBtn}>
            Log In
          </button>

          <button
            type="button"
            className={css.secondaryBtn}
            onClick={() => navigate("/register")}
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
