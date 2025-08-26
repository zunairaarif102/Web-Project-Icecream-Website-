// src/components/Navbar.jsx
import React from "react";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="navbar-container">
      <nav className="navbar">
        <NavLink to="/" className="nav-btn">Home</NavLink>
        <NavLink to="/menu" className="nav-btn">Menu</NavLink>
        <NavLink to="/login" className="nav-btn">Login</NavLink>
      </nav>
    </div>
  );
}
