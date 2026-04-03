import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

export default function MyAccountSidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <div className="card shadow-sm">
      <div className="card-body p-3">

        <h6 className="text-muted fw-bold mb-3">Manage Properties</h6>

        <div className="list-group mb-3">
          <Link to="/my-properties" className={`list-group-item list-group-item-action ${isActive("/my-properties") ? "active" : ""}`}>
            🏠 My Properties
          </Link>

          <Link to="/submit-property" className={`list-group-item list-group-item-action ${isActive("/submit-property") ? "active" : ""}`}>
            ➕ Submit Property
          </Link>

          <Link to="/my-bookmarks" className={`list-group-item list-group-item-action ${isActive("/my-bookmarks") ? "active" : ""}`}>
            🔖 Bookmarks
          </Link>

          <Link to="/location" className={`list-group-item list-group-item-action ${isActive("/location") ? "active" : ""}`}>
            📍 Locations
          </Link>
        </div>

        <h6 className="text-muted fw-bold mb-3">Account</h6>

        <div className="list-group">
          <Link to="/my-profile" className={`list-group-item list-group-item-action ${isActive("/my-profile") ? "active" : ""}`}>
            👤 My Profile
          </Link>

          <Link to="/change-password" className={`list-group-item list-group-item-action ${isActive("/change-password") ? "active" : ""}`}>
            🔒 Change Password
          </Link>

          <button
            className="list-group-item list-group-item-action text-danger"
            onClick={() => {
              localStorage.removeItem("user");
              localStorage.removeItem("token");
              window.dispatchEvent(new Event("authChanged"));
              navigate("/myprofile");
            }}
          >
            🚪 Logout
          </button>
        </div>

      </div>
    </div>
  );
}