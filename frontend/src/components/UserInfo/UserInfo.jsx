import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { logout } from "../../redux/auth/authSlice";

import css from "./UserInfo.module.css";

export default function UserInfo() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.user);

  const handleLogout = () => {
    dispatch(logout());
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
