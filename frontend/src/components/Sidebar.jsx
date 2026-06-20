import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        🎀 Admin
      </div>

      <div className="sidebar-menu">
        <Link
          className="sidebar-item"
          to="/"
        >
          📊 Dashboard
        </Link>

        <Link
          className="sidebar-item"
          to="/users"
        >
          👩 Users
        </Link>

        <Link
          className="sidebar-item"
          to="/products"
        >
          🛍 Products
        </Link>

        <Link
          className="sidebar-item"
          to="/orders"
        >
          📦 Orders
        </Link>

        <Link
          className="sidebar-item"
          to="/about"
        >
          ℹ️ About
        </Link>

        <Link
          className="sidebar-item"
          to="/contact"
        >
          📞 Contact
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;