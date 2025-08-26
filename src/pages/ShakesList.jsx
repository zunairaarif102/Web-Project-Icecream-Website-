import React, { useEffect, useState } from "react";
import axios from "axios";
import "./IceCreamList.css"; // reuse same CSS
import "./AllItemsList.css"; 

export default function ShakesList({ searchTerm = "", setNoResults, addToCart }) {
  const [shakes, setShakes] = useState([]);

  useEffect(() => {
    axios.get("/shakes.json")
      .then(res => setShakes(res.data))
      .catch(err => console.error("Error fetching shakes data:", err));
  }, []);

  // Filtering (safe)
  const filtered = shakes.filter(item =>
    (item?.name || "").toLowerCase().includes((searchTerm || "").toLowerCase())
  );

  // optional: update no-results state
  useEffect(() => {
    if (setNoResults) {
      setNoResults(searchTerm !== "" && filtered.length === 0);
    }
    return () => setNoResults?.(false);
  }, [searchTerm, filtered, setNoResults]);

  return (
    <div className="container">
      <h2 className="title">Shakes</h2>
      <div className="grid">
        {filtered.length > 0 ? (
          filtered.map((item, index) => (
            <div className="card" key={index}>
              <img src={item.image} alt={item.name} className="icecream-img" />
              <h3>{item.name}</h3>
              <p className="price">Rs. {item.price}</p>
              {item.description && <p className="desc">{item.description}</p>}

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
          <p>No shakes found.</p>
        )}
      </div>
    </div>
  );
}
