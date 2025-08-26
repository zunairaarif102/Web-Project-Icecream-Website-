import React from "react";
import { useNavigate } from "react-router-dom";

export default function Cart({ cart = [], setCart }) {
  const navigate = useNavigate();

  const handleScoopChange = (index, scoop) => {
    const updatedCart = [...cart];
    updatedCart[index].variation = scoop;

    const basePrice = updatedCart[index].basePrice || updatedCart[index].price;
    updatedCart[index].price =
      scoop === "Double" ? basePrice * 2 :
      scoop === "Triple" ? basePrice * 3 :
      basePrice;

    updatedCart[index].basePrice = basePrice;
    setCart(updatedCart);
  };

  const handleAddQty = (index) => {
    const updatedCart = [...cart];
    updatedCart[index].qty = (updatedCart[index].qty || 1) + 1;
    setCart(updatedCart);
  };

  const handleReduceQty = (index) => {
    const updatedCart = [...cart];
    if ((updatedCart[index].qty || 1) > 1) {
      updatedCart[index].qty -= 1;
      setCart(updatedCart);
    }
  };

  const handleDelete = (index) => {
    const updatedCart = cart.filter((_, i) => i !== index);
    setCart(updatedCart);
  };

  const totalPayment = cart.reduce(
    (sum, item) => sum + (item.price || 0) * (item.qty || 1),
    0
  );

  return (
    <div style={{ padding: "20px" }}>
      <h2>🛒 Your Cart</h2>
      {cart.length === 0 ? (
        <p>No items added yet.</p>
      ) : (
        <>
          {cart.map((item, index) => (
            <div
              key={index}
              style={{
                border: "1px solid #ddd",
                padding: "10px",
                marginBottom: "10px",
              }}
            >
              <h3>{item.name}</h3>
              <p>Price: Rs. {item.price}</p>

              {/* ✅ Scoop selection only for items with "Ice Cream" in the name */}
              {item.name.toLowerCase().includes("ice cream") && (
                <div>
                  <label>
                    <input
                      type="radio"
                      name={`scoop-${index}`}
                      value="Single"
                      checked={item.variation === "Single"}
                      onChange={() => handleScoopChange(index, "Single")}
                    />{" "}
                    Single Scoop
                  </label>
                  <label style={{ marginLeft: "10px" }}>
                    <input
                      type="radio"
                      name={`scoop-${index}`}
                      value="Double"
                      checked={item.variation === "Double"}
                      onChange={() => handleScoopChange(index, "Double")}
                    />{" "}
                    Double Scoop
                  </label>
                  <label style={{ marginLeft: "10px" }}>
                    <input
                      type="radio"
                      name={`scoop-${index}`}
                      value="Triple"
                      checked={item.variation === "Triple"}
                      onChange={() => handleScoopChange(index, "Triple")}
                    />{" "}
                    Triple Scoop
                  </label>
                </div>
              )}

              {/* Quantity control */}
              <div style={{ marginTop: "10px" }}>
                <button onClick={() => handleReduceQty(index)}>-</button>
                <span style={{ margin: "0 10px" }}>{item.qty || 1}</span>
                <button onClick={() => handleAddQty(index)}>+</button>
              </div>

              {/* Delete button */}
              <button
                onClick={() => handleDelete(index)}
                style={{ marginTop: "10px", color: "red" }}
              >
                ❌ Remove
              </button>
            </div>
          ))}

          <h3>Total Payment: Rs. {totalPayment}</h3>

          <button
            onClick={() => navigate("/details")}
            style={{ marginTop: "20px" }}
          >
            Enter Details
          </button>
        </>
      )}
    </div>
  );
}
