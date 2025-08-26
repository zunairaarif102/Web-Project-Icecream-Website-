import { Routes, Route, NavLink } from "react-router-dom";
import { useState } from "react";
import IceCreamList from "./IceCreamList";
import ShakesList from "./ShakesList";
import SundaesList from "./SundaesList";
import ColdCoffeeList from "./ColdCoffeeList";
import AllItemsList from "./ALLITEMSLIST";
import "./IceCreamList.css";

export default function Menu() {
  const [search, setSearch] = useState("");

  return (
    <div className="content-box">
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
            <button
              className="status-icon"
              aria-label="clear search"
              title="Clear search"
              onClick={() => setSearch("")}
            >
              ×
            </button>
          )}
        </div>

        <NavLink to="/menu" end>Ice Creams</NavLink>
        <NavLink to="/menu/shakes">Shakes</NavLink>
        <NavLink to="/menu/sundaes">Sundaes</NavLink>
        <NavLink to="/menu/cold-coffee">Cold Coffee</NavLink>
      </div>

      <Routes>
        {search ? (
          <Route path="*" element={<AllItemsList searchTerm={search} />} />
        ) : (
          <>
            <Route path="/" element={<IceCreamList />} />
            <Route path="shakes" element={<ShakesList />} />
            <Route path="sundaes" element={<SundaesList />} />
            <Route path="cold-coffee" element={<ColdCoffeeList />} />
          </>
        )}
      </Routes>
    </div>
  );
}
