import { NavLink } from "react-router-dom";

function Navigation() {
  return (
    <nav>
      <NavLink to="/login">Login</NavLink>

      <NavLink to="/register">Registration</NavLink>
    </nav>
  );
}

export default Navigation;
