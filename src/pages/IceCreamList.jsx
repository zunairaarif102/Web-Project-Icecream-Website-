import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import "./IceCreamList.css";

export default function IceCreamList({ searchTerm = "", setNoResults, addToCart }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios.get("/icecreams.json")
      .then(res => setItems(res.data))
      .catch(err => console.error("Error fetching data:", err));
  }, []);

  const q = (searchTerm || "").toLowerCase().trim();

  const filtered = useMemo(() => {
    if (!q) return items;
    return items.filter(i =>
      i.name?.toLowerCase().includes(q) ||
      i.description?.toLowerCase().includes(q)
    );
  }, [items, q]);

  return (
    <div className="container">
      <h2 className="title">Ice Creams</h2>
      <div className="grid">
        {filtered.map((item, index) => (
          <div className="card" key={index}>
            <img src={item.image} alt={item.name} className="icecream-img" />
            <h3>{item.name}</h3>
            <p className="price">Rs. {item.price}</p>
            {item.description && <p className="desc">{item.description}</p>}

            {/* ✅ Pink Add Button */}
            <button className="add-btn" onClick={() => addToCart(item)}>
              ➕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
