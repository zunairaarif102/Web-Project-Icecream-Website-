// Login.jsx
import React from "react";
import "./Login.css";

function Login() {
  return (
    <div className="login-page">
      <div className="left-image"></div>
      <div className="right-form">
        <h2>Login</h2>
        <form>
          <input type="text" placeholder="Name" required />
          <input type="tel" placeholder="Phone Number" required />
          <input type="text" placeholder="Location" required />
          <input type="email" placeholder="Email" required />
          <button type="submit">Login</button>
        </form>
        <p>
          Don't have an account? <button className="signup-btn">Signup</button>
        </p>
      </div>
    </div>
  );
}

export default Login;
