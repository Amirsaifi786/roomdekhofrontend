import React, { useEffect, useState } from "react";
import MyAccountSidebar from "./MyAccountSidebar";
import API from "../api/axios";
import { useNavigate, Link } from "react-router-dom";
function MyResponses() {
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [statusMessage, setStatusMessage] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      fetchProperties(parsedUser.id, 1);
    } else {
      navigate("/myprofile");
    }
  }, []);

  const fetchProperties = async (userId, pageNumber = 1) => {
    try {
      const res = await API.post("/property-user/user", {
        user_id: userId,
        page: pageNumber,
        limit: 5,
      });

      const formattedProps = res.data.data.map(p => ({
        ...p,
        // status: Number(p.status) || 1,
        status: p.status === 0 ? 0 : 1

      }));

      setProperties(formattedProps);
      setTotalPages(res.data.totalPages);
      setPage(pageNumber);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const toggleStatus = async (propertyId, currentStatus) => {
    try {
      const newStatus = currentStatus === 1 ? 0 : 1;

      console.log("Updating status:", propertyId, newStatus);

      const res = await API.patch(`/property-user/${propertyId}/status`, {
        status: newStatus,
      });

      console.log("API Response:", res.data);

      // ✅ FIX: check HTTP status
      if (res.status === 200) {

        setProperties((prev) =>
          prev.map((prop) =>
            prop._id === propertyId
              ? { ...prop, status: newStatus }
              : prop
          )
        );

        setStatusMessage(
          newStatus === 1
            ? "Property is now Active"
            : "Property is now Deactive"
        );

      } else {
        setStatusMessage("Update failed");
      }

      setTimeout(() => setStatusMessage(""), 3000);

    } catch (err) {
      console.error("Status Update Error:", err);

      if (err.response) {
        console.error("Server Error:", err.response.data);
        setStatusMessage(err.response.data?.message || "Server error");
      } else {
        setStatusMessage("Network error");
      }

      setTimeout(() => setStatusMessage(""), 3000);
    }
  };

  return (
    <div>
      {/* PAGE TITLE */}
      <div style={{ background: "#6c6c6c", padding: "40px 0", color: "white" }}>
        <div className="container">
          <h2>My Properties</h2>
        </div>
      </div>

      <div className="container py-5">
        <div className="row">
          <MyAccountSidebar />

          {/* RIGHT CONTENT */}
          <div className="col-md-8">
            {statusMessage && (
              <div className="alert alert-success text-center">{statusMessage}</div>
            )}
            {loading ? (
              <div className="alert alert-info">Loading properties...</div>
            ) : properties.length === 0 ? (
              <>
                <div className="alert alert-info">
                  <p>You haven't submitted any properties yet.</p>
                </div>
                <a href="/submit-property" className="btn btn-warning mt-3">
                  Submit New Property
                </a>
              </>
            ) : (
              <table className="table table-bordered table-striped">
                <thead>
                  <tr>
                    <th>Property</th>
                    <th>Status</th>
                    <th>Options</th>
                  </tr>
                </thead>
                <tbody>
                  {properties.map((prop) => (
                    <tr key={prop._id}>
                      <td>
                        <h5>
                          <a href={`/propertydetail/${prop.slug}`}>{prop.title}</a>
                          <br />
                          <small>
                            (Updated on{" "}
                            {new Date(prop.updated_at || prop.created_at).toLocaleDateString()})
                          </small>
                        </h5>
                       <span>Rs. {prop.price || prop.singlePrice || prop.doublePrice} / Monthly</span>
                      </td>

                      <td>
                        <button
                          className={`btn btn-sm ${prop.status === 1 ? "btn-success" : "btn-danger"
                            }`}
                          onClick={() => toggleStatus(prop._id, prop.status)}
                        >
                          {Number(prop.status) === 1 ? "Active" : "Deactive"}
                        </button>
                      </td>

                      <td>
                        <Link
                          to={`/submit-property/${prop._id}`}   // 🔥 FIXED
                          className={`btn btn-sm btn-success`}
                        >
                          Edit
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

            )}
            {/* PAGINATION */}
            <div className="d-flex justify-content-center mt-4 gap-2">

              <button
                className="btn btn-outline-secondary"
                disabled={page === 1}
                onClick={() => fetchProperties(user.id, page - 1)}
              >
                Prev
              </button>

              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index}
                  className={`btn ${page === index + 1 ? "btn-primary" : "btn-outline-primary"
                    }`}
                  onClick={() => fetchProperties(user.id, index + 1)}
                >
                  {index + 1}
                </button>
              ))}

              <button
                className="btn btn-outline-secondary"
                disabled={page === totalPages}
                onClick={() => fetchProperties(user.id, page + 1)}
              >
                Next
              </button>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyResponses;