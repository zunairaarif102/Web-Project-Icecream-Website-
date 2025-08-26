import React, { useEffect, useState } from "react";
import axios from "axios";
import "./IceCreamList.css"; // reuse same CSS

export default function ColdCoffeeList({ searchTerm = "", setNoResults, addToCart }) {
  const [coldCoffees, setColdCoffees] = useState([]);

  useEffect(() => {
    axios.get("/coldcoffees.json")
      .then(res => setColdCoffees(res.data))
      .catch(err => console.error("Error fetching cold coffees data:", err));
  }, []);

  // Safe Filtering
  const filtered = coldCoffees.filter(item =>
    (item?.name || "").toLowerCase().includes((searchTerm || "").toLowerCase())
  );

  // Optional no-results state handling
  useEffect(() => {
    if (setNoResults) {
      setNoResults(searchTerm !== "" && filtered.length === 0);
    }
    return () => setNoResults?.(false);
  }, [searchTerm, filtered, setNoResults]);

  return (
    <div className="container">
      <h2 className="title">Cold Coffees</h2>
      <div className="grid">
        {filtered.length > 0 ? (
          filtered.map((item, index) => (
            <div className="card" key={index}>
              <img src={item.image} alt={item.name} className="icecream-img" />
              <h3>{item.name}</h3>
              <p className="price">Rs. {item.price}</p>

              {/* ✅ Add to Cart Button */}
              <button
                className="add-btn"
                onClick={() => addToCart && addToCart(item)}
              >
                ➕
              </button>
            </div>
          ))
        ) : (
          <p>No cold coffees found.</p>
        )}
      </div>
    </div>
  );
}
