import React, { useEffect, useState } from "react";
import MyAccountSidebar from "./MyAccountSidebar";
import { Link, useNavigate } from "react-router-dom";
import API, { IMAGE_URL } from "../api/axios";

export default function MyProperties() {
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      fetchProperties(parsedUser._id, 1);
    } else {
      navigate("/myprofile");
    }
  }, []);

  const fetchProperties = async (userId, pageNumber = 1) => {
    try {
      const res = await API.post("/property-user/user", {
        user_id: userId,
        page: pageNumber,
        limit: 20,
      });

      setProperties(res.data.data);
      setTotalPages(res.data.totalPages);
      setPage(pageNumber);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const toggleStatus = async (id, status) => {
    const newStatus = status === 1 ? 0 : 1;

    await API.patch(`/property-user/${id}/status`, {
      status: newStatus,
    });

    setProperties((prev) =>
      prev.map((p) =>
        p._id === id ? { ...p, status: newStatus } : p
      )
    );
  };

  return (
    <div className="container mt-4">
      <div className="row">

        <div className="col-md-3">
          <MyAccountSidebar />
        </div>

        <div className="col-md-9">
          <h4 className="mb-3">My Properties</h4>

          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border"></div>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-bordered table-hover align-middle">
                <thead className="table-dark">
                  <tr>
                    <th>Property</th>
                    <th>Image</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {properties.map((prop) => (
                    <tr key={prop._id}>
                      <td>
                        <Link to={`/propertydetail/${prop.slug}`} className="fw-bold">
                          {prop.title}
                        </Link>
                        <div>₹ {prop.price}</div>
                      </td>

                      <td>
                        {prop.images?.length > 0 ? (
                          <img
                            src={`${IMAGE_URL}/${prop.images[0]}`}
                            width="80"
                            height="60"
                            style={{ objectFit: "cover" }}
                          />
                        ) : "No Image"}
                      </td>

                      <td>
                        <button
                          className={`btn btn-sm ${prop.status ? "btn-success" : "btn-danger"}`}
                          onClick={() => toggleStatus(prop._id, prop.status)}
                        >
                          {prop.status ? "Active" : "Inactive"}
                        </button>
                      </td>

                      <td>
                        <Link to={`/submit-property/${prop._id}`} className="btn btn-primary btn-sm">
                          Edit
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <ul className="pagination justify-content-center">
              {[...Array(totalPages)].map((_, i) => (
                <li key={i} className={`page-item ${page === i + 1 ? "active" : ""}`}>
                  <button className="page-link" onClick={() => fetchProperties(user.id, i + 1)}>
                    {i + 1}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

      </div>
    </div>
  );
}