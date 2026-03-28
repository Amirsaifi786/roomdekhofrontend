import React, { useEffect, useState } from "react";
import MyAccountSidebar from "./MyAccountSidebar";
import API from "../api/axios";
import { Link } from "react-router-dom";
function MyBookmark() {

  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    fetchBookmarks();
  }, []);

  // ================= GET BOOKMARKS =================
  const fetchBookmarks = async () => {
    try {
      const res = await API.get("/bookmark/bookmarked-properties");

      console.log("Bookmarks API:", res.data);

      // ✅ Agar data wrapper hai
      setBookmarks(res.data.data || res.data);

    } catch (err) {
      console.error("Fetch Bookmark Error:", err);
    }
  };

  // ================= REMOVE BOOKMARK =================
  const removeBookmark = async (id) => {
    try {
      console.log("Removing:", id);

      const res = await API.patch(`/bookmark/remove-bookmark/${id}`);

      console.log("Remove Response:", res.data);

      if (res.data.success) {
        // ✅ UI instantly update
        setBookmarks(prev =>
          prev.filter(item => item._id !== id) 
        );
      }

    } catch (err) {
      console.error("Remove Bookmark Error:", err);
    }
  };

  return (
    <div>

      {/* PAGE TITLE */}
      <div style={{ background: "#6c6c6c", padding: "45px 0", color: "#fff" }}>
        <div className="container">
          <h2 className="fw-bold">Bookmark Listings</h2>
        </div>
      </div>

      <div className="container py-5">
        <div className="row">

          <MyAccountSidebar />

          <div className="col-md-9">

            {bookmarks.length === 0 ? (

              <div className="alert alert-info shadow-sm">
                <p className="mb-0">
                  <strong>No bookmarks!</strong> You haven't saved anything yet.
                </p>
              </div>

            ) : (

              <div className="card shadow-sm border-0">
                <div className="card-body p-0">

                  <table className="table mb-0 align-middle">
                    <thead className="table-light">
                      <tr>
                        <th>Property</th>
                        <th width="120">Action</th>
                      </tr>
                    </thead>

                    <tbody>
                      {bookmarks.map((item) => (
                        <tr key={item._id}> {/* 🔥 FIXED */}

                          <td>
                            <h6 className="mb-1 fw-semibold">
                             <Link
                        to={`/propertydetail/${item.slug}`}
                        className="text-dark text-decoration-none"
                      >
                        {item.title}
                      </Link>
                            </h6>

                            <small className="text-muted d-block">
                              {item.address}
                            </small>

                            <span className="badge bg-success mt-2">
                              ₹{item.price || item.singlePrice || item.doublePrice || item.triplePrice}
                            </span>

                          </td>

                          <td>
                            <button
                              onClick={() => removeBookmark(item._id)} // 🔥 FIXED
                              className="btn btn-outline-danger btn-sm"
                            >
                              <i className="fa fa-trash"></i> Remove
                            </button>
                          </td>

                        </tr>
                      ))}
                    </tbody>

                  </table>

                </div>
              </div>

            )}

          </div>
        </div>
      </div>

    </div>
  );
}

export default MyBookmark;