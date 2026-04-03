import API, { IMAGE_URL } from "../api/axios";
import MyAccountSidebar from "./MyAccountSidebar";
import React, { useEffect, useState } from "react";

function Locations() {
  const [loading, setLoading] = useState(false);
  const [locations, setLocations] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    title: "",
    available: "",
    file: null,
    image: ""
  });

  useEffect(() => {
    fetchLocations();
  }, []);

  const fetchLocations = async () => {
    setLoading(true);
    const res = await API.get("location/locations");
    setLocations(res.data);
    setLoading(false);
  };

  const handleChange = (e) => {
    if (e.target.name === "file") {
      setForm({ ...form, file: e.target.files[0] });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const openAddModal = () => {
    setForm({ title: "", available: "", file: null, image: "" });
    setEditId(null);
    setShowModal(true);
  };

  const openEditModal = (data) => {
    setForm({
      title: data.title,
      available: data.available,
      file: null,
      image: data.image
    });
    setEditId(data._id);
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("available", form.available);

    if (form.file) {
      formData.append("image", form.file);
    }

    if (editId) {
      await API.put(`location/update-location/${editId}`, formData);
    } else {
      await API.post("location/add-location", formData);
    }

    fetchLocations();
    setShowModal(false);
  };

  const deleteLocation = async (id) => {
    if (window.confirm("Delete location?")) {
      await API.delete(`location/delete-location/${id}`);
      fetchLocations();
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
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4>Locations</h4>
            <button className="btn btn-primary" onClick={openAddModal}>
              + Add Location
            </button>
          </div>

          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border"></div>
            </div>
          ) : locations.length === 0 ? (
            <div className="text-center py-5">
              <h5>No Locations Found</h5>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-bordered table-hover align-middle">
                <thead className="table-dark">
                  <tr>
                    <th>Image</th>
                    <th>Location</th>
                    <th>Available</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {locations.map((loc) => (
                    <tr key={loc._id}>
                      
                      {/* Image */}
                      <td>
                        <img
                          src={`${IMAGE_URL}/${loc.image}`}
                          width="80"
                          height="60"
                          style={{ objectFit: "cover", borderRadius: "6px" }}
                        />
                      </td>

                      {/* Title */}
                      <td className="fw-bold">{loc.title}</td>

                      {/* Available */}
                      <td>{loc.available} Properties</td>

                      {/* Actions */}
                      <td>
                        <button
                          className="btn btn-warning btn-sm me-2"
                          onClick={() => openEditModal(loc)}
                        >
                          Edit
                        </button>

                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => deleteLocation(loc._id)}
                        >
                          Delete
                        </button>
                      </td>

                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Modal */}
        {showModal && (
          <div className="modal d-block" style={{ background: "rgba(0,0,0,0.5)" }}>
            <div className="modal-dialog">
              <div className="modal-content">

                <div className="modal-header">
                  <h5>{editId ? "Edit Location" : "Add Location"}</h5>
                  <button className="btn-close" onClick={() => setShowModal(false)}></button>
                </div>

                <div className="modal-body">
                  <form onSubmit={handleSubmit}>

                    <div className="mb-3">
                      <label className="form-label">Location</label>
                      <input
                        type="text"
                        name="title"
                        className="form-control"
                        value={form.title}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Image</label>

                      {editId && form.image && (
                        <img
                          src={`${IMAGE_URL}/${form.image}`}
                          width="80"
                          className="mb-2 d-block"
                        />
                      )}

                      <input
                        type="file"
                        name="file"
                        className="form-control"
                        onChange={handleChange}
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Available Properties</label>
                      <input
                        type="number"
                        name="available"
                        className="form-control"
                        value={form.available}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <button className="btn btn-success w-100">
                      {editId ? "Update" : "Add"}
                    </button>

                  </form>
                </div>

              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default Locations;