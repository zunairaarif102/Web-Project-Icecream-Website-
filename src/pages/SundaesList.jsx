import React, { useEffect, useState } from "react";
import axios from "axios";
import "./IceCreamList.css";

export default function SundaesList({ searchTerm = "", setNoResults, addToCart }) {
  const [sundaes, setSundaes] = useState([]);

  useEffect(() => {
    axios.get("/sundaes.json")
      .then(res => setSundaes(res.data))
      .catch(err => console.error("Error fetching sundaes data:", err));
  }, []);

  // Safe filtering
  const filtered = sundaes.filter(item =>
    (item?.name || "").toLowerCase().includes((searchTerm || "").toLowerCase())
  );

  useEffect(() => {
    if (setNoResults) {
      setNoResults(searchTerm !== "" && filtered.length === 0);
    }
    return () => setNoResults?.(false);
  }, [searchTerm, filtered, setNoResults]);

  return (
    <div className="container">
      <h2 className="title">Sundaes</h2>
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
          <p>No sundaes found.</p>
        )}
      </div>
    </div>
  );
}
