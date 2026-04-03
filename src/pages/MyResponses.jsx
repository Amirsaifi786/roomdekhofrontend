import React from "react";
import MyAccountSidebar from "./MyAccountSidebar";
import { Link } from "react-router-dom";

export default function MyResponses() {
  return (
    <div className="container mt-4">
      <div className="row">

        <div className="col-md-3">
          <MyAccountSidebar />
        </div>

        <div className="col-md-9">
          <div className="card shadow-sm text-center p-5">

            <h4>No Responses Yet</h4>
            <p className="text-muted">
              You will start receiving inquiries once you list a property.
            </p>

            <Link to="/submit-property" className="btn btn-primary">
              ➕ Submit Property
            </Link>

          </div>
        </div>

      </div>
    </div>
  );
}