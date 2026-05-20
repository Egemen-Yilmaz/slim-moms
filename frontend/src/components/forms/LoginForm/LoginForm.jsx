import { useDispatch } from "react-redux";
import { loginUser } from "../../../api/auth";
import { setAuthData } from "../../../redux/auth/authSlice";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      email: e.target.email.value,
      password: e.target.password.value,
    };

    try {
      const res = await loginUser(data);

      // 🔥 TEK MERKEZ: Redux
      dispatch(setAuthData(res.data.data));

      navigate("/diary");
    } catch (err) {
      console.log(err.response?.data);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="email" />
      <input name="password" />
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
