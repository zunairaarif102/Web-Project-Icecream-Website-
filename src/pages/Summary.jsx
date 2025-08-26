import React from "react";

export default function Summary({ cart, details }) {
  const totalPayment = cart.reduce(
    (sum, item) => sum + (item.price || 0) * (item.qty || 1),
    0
  );

  const tableStyle = {
    width: "100%",
    borderCollapse: "collapse",
    marginBottom: "20px",
  };

  const thTdStyle = {
    border: "1px solid #ddd",
    padding: "12px",
    textAlign: "center",
  };

  const thStyle = {
    ...thTdStyle,
    backgroundColor: "#ff1493",
    color: "#fff",
  };

  const totalStyle = {
    textAlign: "right",
    fontWeight: "bold",
    fontSize: "18px",
    marginTop: "10px",
    color: "#ff1493",
  };

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto", fontFamily: "Arial, sans-serif" }}>
      <h2 style={{ textAlign: "center", color: "#ff1493", marginBottom: "25px" }}>
        📝 Order Summary
      </h2>

      {/* Items Table */}
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>#</th>
            <th style={thStyle}>Item Name</th>
            <th style={thStyle}>Variation</th>
            <th style={thStyle}>Quantity</th>
            <th style={thStyle}>Price (Rs.)</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((item, index) => (
            <tr key={index}>
              <td style={thTdStyle}>{index + 1}</td>
              <td style={thTdStyle}>{item.name}</td>
              <td style={thTdStyle}>{item.variation}</td>
              <td style={thTdStyle}>{item.qty}</td>
              <td style={thTdStyle}>{item.price}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={totalStyle}>Total Payment: Rs. {totalPayment}</div>

      {/* User Details */}
      <h3 style={{ color: "#555", marginTop: "25px" }}>User Details:</h3>
      <table style={tableStyle}>
        <tbody>
          <tr>
            <td style={thTdStyle}><strong>Name</strong></td>
            <td style={thTdStyle}>{details.name}</td>
          </tr>
          <tr>
            <td style={thTdStyle}><strong>Email</strong></td>
            <td style={thTdStyle}>{details.email}</td>
          </tr>
          <tr>
            <td style={thTdStyle}><strong>Phone</strong></td>
            <td style={thTdStyle}>{details.phone}</td>
          </tr>
        </tbody>
      </table>

      <h3 style={{ textAlign: "center", marginTop: "30px", color: "#28a745" }}>
        ✅ Your order has been confirmed!
      </h3>
    </div>
  );
}
