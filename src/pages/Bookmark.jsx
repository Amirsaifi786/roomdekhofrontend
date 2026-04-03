import React, { useEffect, useState } from "react";
import MyAccountSidebar from "./MyAccountSidebar";
import API, { IMAGE_URL } from "../api/axios";
import { Link } from "react-router-dom";

function MyBookmark() {
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchBookmarks();
  }, []);

  // ================= GET BOOKMARKS =================
  const fetchBookmarks = async () => {
    try {
      setLoading(true);
      const res = await API.get("/bookmark/bookmarked-properties");
      setBookmarks(res.data.data || res.data);
      setLoading(false);
    } catch (err) {
      console.error("Fetch Bookmark Error:", err);
      setLoading(false);
    }
  };

  // ================= REMOVE BOOKMARK =================
  const removeBookmark = async (id) => {
    try {
      const res = await API.patch(`/bookmark/remove-bookmark/${id}`);

      if (res.data.success) {
        setBookmarks((prev) => prev.filter((item) => item._id !== id));
      }
    } catch (err) {
      console.error("Remove Bookmark Error:", err);
    }
  };

  return (
    <div className="container mt-4">
      <div className="row">

        {/* Sidebar */}
        <div className="col-md-3">
          <MyAccountSidebar />
        </div>

        {/* Main Content */}
        <div className="col-md-9">

          <h4 className="mb-3">Bookmark Listings</h4>

          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border"></div>
            </div>
          ) : bookmarks.length === 0 ? (
            <div className="alert alert-info">
              No bookmarks found.
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-bordered table-hover align-middle">
                <thead className="table-dark">
                  <tr>
                    <th>Property</th>
                    <th>Price</th>
                    <th width="150">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {bookmarks.map((item) => (
                    <tr key={item._id}>

                      {/* Image */}
                     

                      {/* Property */}
                      <td>
                        <Link
                          to={`/propertydetail/${item.slug}`}
                          className="fw-bold text-decoration-none"
                        >
                          {item.title}
                        </Link>
                        <div className="text-muted small">
                          {item.address}
                        </div>
                      </td>

                      {/* Price */}
                      <td>
                        <span className="badge bg-success">
                          ₹{" "}
                          {item.price ||
                            item.singlePrice ||
                            item.doublePrice ||
                            item.triplePrice}
                        </span>
                      </td>

                      {/* Action */}
                      <td>
                        <button
                          onClick={() => removeBookmark(item._id)}
                          className="btn btn-outline-danger btn-sm"
                        >
                          🗑 Remove
                        </button>
                      </td>

                    </tr>
                  ))}
                </tbody>

              </table>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

export default MyBookmark;