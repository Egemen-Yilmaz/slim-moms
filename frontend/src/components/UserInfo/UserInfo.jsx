import { useSelector, useDispatch } from "react-redux";

import { logout } from "../../redux/auth/authSlice";

import { useNavigate } from "react-router-dom";

import "./UserInfo.module.css";

export default function UserInfo() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.user);

  const handleLogout = () => {
    dispatch(logout());

    navigate("/login");
  };

  return (
    <div className="user-info">
      <span className="user-name">{user?.name || "User"}</span>

      <button className="logout-btn" onClick={handleLogout}>
        Exit
      </button>
    </div>
  );
}
