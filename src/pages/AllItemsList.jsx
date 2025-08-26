// AllItemsList.jsx
import React, { useEffect, useState } from "react";
import "./AllItemsList.css";  // ✅ new css file include

export default function AllItemsList({ searchTerm, setNoResults, addToCart }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const [iceRes, shakeRes, sundaeRes, coffeeRes] = await Promise.all([
          fetch("/icecreams.json"),
          fetch("/shakes.json"),
          fetch("/sundaes.json"),
          fetch("/coldcoffees.json"),
        ]);

        const [iceData, shakeData, sundaeData, coffeeData] = await Promise.all([
          iceRes.json(),
          shakeRes.json(),
          sundaeRes.json(),
          coffeeRes.json(),
        ]);

        setItems([
          ...(iceData || []),
          ...(shakeData || []),
          ...(sundaeData || []),
          ...(coffeeData || []),
        ]);
      } catch (err) {
        console.error("Error loading data:", err);
      }
    }
    fetchData();
  }, []);

  // ✅ filter
  const filtered = items.filter(
    (item) =>
      item?.name &&
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    if (setNoResults) {
      setNoResults(filtered.length === 0 && searchTerm !== "");
    }
  }, [filtered, searchTerm, setNoResults]);

  return (
    <div className="list-container">
      <div className="list">
        {filtered.map((item, idx) => (
          <div key={idx} className="card">
            <img src={item.image} alt={item.name || "item"} />
            <h3>{item.name}</h3>
            {item.description && <p>{item.description}</p>}
            <p>Rs. {item.price}</p>

            {/* ✅ Always show + button */}
            <button
              onClick={() => addToCart && addToCart(item)}
              className="add-btn"
            >
              +
            </button>
          </div>
        ))}

        {filtered.length === 0 && searchTerm !== "" && (
          <p className="no-results">No results found</p>
        )}
      </div>
    </div>
  );
}
