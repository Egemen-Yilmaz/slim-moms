import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUserOperation } from "../../redux/auth/authSlice"; // 👈 Güncelledik
import css from "./UserInfo.module.css";

export default function UserInfo() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.user);

  const handleLogout = () => {
    // Artık kılavuza uygun operation fonksiyonunu tetikliyoruz
    dispatch(logoutUserOperation());
    navigate("/login");
  };

  return (
    <div className={css.userInfo}>
      <span className={css.userName}>{user?.name || "User"}</span>
      <button className={css.logoutBtn} onClick={handleLogout}>
        Exit
      </button>
    </div>
  );
}