import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useWatchLater } from "../../context/WatchLaterContext";
import "./index.css";

const Header = () => {
  const { savedMovies } = useWatchLater();
  const navigate = useNavigate();

  // Remove the token cookie and go back to login page
  const handleLogoutClick = () => {
    Cookies.remove("jwt_token");
    navigate("/login");
  };

  const totalSaved = savedMovies.length;

  return (
    <header className="main-header">
      <div className="header-container">

        {/* Brand Logo — clicking goes to Home page */}
        <Link to="/" className="brand-logo">NXTFLIX</Link>

        {/* Navigation Links */}
        <nav className="nav-links">
          <NavLink
            to="/"
            end
            className={({ isActive }) => (isActive ? "nav-item active" : "nav-item")}
          >
            Home
          </NavLink>

          <NavLink
            to="/watch-later"
            className={({ isActive }) => (isActive ? "nav-item active" : "nav-item")}
          >
            Watch Later
            {/* Show count badge only if list is not empty */}
            {totalSaved > 0 && (
              <span className="badge" id="watch-later-badge">{totalSaved}</span>
            )}
          </NavLink>

          {/* Logout button clears the session */}
          <button className="logout-btn" onClick={handleLogoutClick}>
            Logout
          </button>
        </nav>

      </div>
    </header>
  );
};

export default Header;
