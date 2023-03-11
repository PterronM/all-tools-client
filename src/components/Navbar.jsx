import { NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

function Navbar() {
  const redirect = useNavigate();

  const { isLoggedIn, authenticaUser } = useContext(AuthContext);

  const toggleStyles = (navInfo) => {
    return navInfo.isActive === true ? activeStyles : inActiveStyles;
  };

  const activeStyles = {
    textDecoration: "underline",
  };

  const inActiveStyles = {
    textDecoration: "none",
  };

  const handleLogOut = () => {
    localStorage.removeItem("authToken");
    authenticaUser();
    redirect("/");
  };

  
  if (isLoggedIn === true) {
    
    return (
      <div>
        <NavLink onClick={handleLogOut}>Cerrar Session</NavLink>
      </div>
    );
  } else {
    return (
      <div className="nav">
        <NavLink className="navLink text-decoration-none" to="/signup" style={toggleStyles}>Registro</NavLink>
        <NavLink className="navLink text-decoration-none" to="/" style={toggleStyles}>Atras</NavLink>
      </div>
    );
  }
}


export default Navbar;
