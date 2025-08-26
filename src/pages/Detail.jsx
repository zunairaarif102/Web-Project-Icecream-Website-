import React from "react";
import { useNavigate } from "react-router-dom";

export default function Detail({ cart, details, setDetails }) {
  const navigate = useNavigate();

  const handleConfirm = (e) => {
    e.preventDefault();
    navigate("/summary"); // go to summary page
  };

  const formContainer = {
    maxWidth: "500px",
    margin: "30px auto",
    padding: "25px",
    borderRadius: "15px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
    backgroundColor: "#fff",
    fontFamily: "Arial, sans-serif",
  };

  const headingStyle = {
    textAlign: "center",
    color: "#ff1493",
    marginBottom: "20px",
  };

  const inputStyle = {
    width: "100%",
    padding: "12px 10px",
    margin: "8px 0",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "16px",
  };

  const buttonStyle = {
    width: "100%",
    padding: "12px",
    marginTop: "15px",
    borderRadius: "10px",
    border: "none",
    backgroundColor: "#28a745",
    color: "#fff",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "all 0.2s",
  };

  const buttonHover = (e) => {
    e.target.style.backgroundColor = "#218838";
  };
  const buttonLeave = (e) => {
    e.target.style.backgroundColor = "#28a745";
  };

  return (
    <div style={formContainer}>
      <h2 style={headingStyle}>Enter Your Details</h2>
      <form onSubmit={handleConfirm}>
        <input
          type="text"
          placeholder="Name"
          value={details.name}
          onChange={(e) => setDetails({ ...details, name: e.target.value })}
          required
          style={inputStyle}
        />
        <input
          type="email"
          placeholder="Email"
          value={details.email}
          onChange={(e) => setDetails({ ...details, email: e.target.value })}
          required
          style={inputStyle}
        />
        <input
          type="tel"
          placeholder="Phone"
          value={details.phone}
          onChange={(e) => setDetails({ ...details, phone: e.target.value })}
          required
          style={inputStyle}
        />
        <input
          type="text"
          placeholder="Location"
          value={details.location || ""}
          onChange={(e) => setDetails({ ...details, location: e.target.value })}
          required
          style={inputStyle}
        />
        <button
          type="submit"
          style={buttonStyle}
          onMouseEnter={buttonHover}
          onMouseLeave={buttonLeave}
        >
          ✅ Confirm Order
        </button>
      </form>
    </div>
  );
}
