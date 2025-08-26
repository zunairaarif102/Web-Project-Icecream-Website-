import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import IceCreamList from "./pages/IceCreamList";
import ShakesList from "./pages/ShakesList";
import SundaesList from "./pages/SundaesList";
import ColdCoffeeList from "./pages/ColdCoffeeList";
import AllItemsList from "./pages/ALLITEMSLIST";
import Cart from "./pages/Cart";
import Detail from "./pages/Detail";
import Summary from "./pages/Summary";

export default function App() {
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState([]); 
  const [details, setDetails] = useState({ name: "", email: "", phone: "" });

  // Add item to cart
  const addToCart = (item) => {
    setCart([...cart, { ...item, variation: "Single", qty: 1 }]);
  };

  return (
    <Router>
      {/* 🔹 Header */}
      <div className="website-header" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "15px", padding: "20px" }}>
        <img src="icecream.jpeg" alt="Website Logo" style={{ width: "100px", height: "auto" }} />
        <div style={{ textAlign: "left" }}>
          <h1 style={{ fontSize: "32px", margin: "0 0 5px", color: "#ff1493" }}>Sprinkle Spot</h1>
          <p style={{ fontSize: "16px", color: "#555", margin: "0" }}>Taste the sweetness in every scoop 🍨</p>
        </div>
      </div>

      {/* 🔹 Navbar */}
      <div className="navbar">
        <div className="search-wrapper">
          <input
            type="text"
            placeholder="Search Menu"
            className="search-box"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search && (
            <button className="status-icon" onClick={() => setSearch("")}>×</button>
          )}
        </div>

        <NavLink to="/" end>Ice Creams</NavLink>
        <NavLink to="/shakes">Shakes</NavLink>
        <NavLink to="/sundaes">Sundaes</NavLink>
        <NavLink to="/cold-coffee">Cold Coffee</NavLink>
        <NavLink to="/cart">🛒 Cart ({cart.length})</NavLink>
      </div>

      {/* 🔹 Routes */}
      <Routes>
        {search ? (
          <Route path="*" element={<AllItemsList searchTerm={search} addToCart={addToCart} />} />
        ) : (
          <>
            <Route path="/" element={<IceCreamList addToCart={addToCart} />} />
            <Route path="/shakes" element={<ShakesList addToCart={addToCart} />} />
            <Route path="/sundaes" element={<SundaesList addToCart={addToCart} />} />
            <Route path="/cold-coffee" element={<ColdCoffeeList addToCart={addToCart} />} />
          </>
        )}
        {/* Cart page */}
        <Route path="/cart" element={<Cart cart={cart} setCart={setCart} />} />

        {/* Detail page for entering user info */}
        <Route path="/details" element={<Detail cart={cart} details={details} setDetails={setDetails} />} />

        {/* Summary page */}
        <Route path="/summary" element={<Summary cart={cart} details={details} />} />
      </Routes>
    </Router>
  );
}
