import React from "react";
import { IMAGE_URL } from "../api/axios";
import { Link } from "react-router-dom";
import "./FeaturedProperty.css";

export default function FeaturedProperty({ properties = [] }) {

  console.log("FEATURED DATA:", properties); // 🔥 DEBUG

  return (
    <div className="container py-5 featured-section">

      <div className="testimonial-heading text-center mb-4">
        <h2>Featured Property</h2>
      </div>

      <div className="row g-4">

        {properties && properties.length > 0 ? (

          properties.map((item) => {

            // ================= IMAGE FIX =================
            let images = [];

            try {
              if (Array.isArray(item.images)) {
                images = item.images;
              } else if (typeof item.images === "string") {
                images = JSON.parse(item.images);
              }
            } catch (err) {
              images = [];
            }

            const imageUrl = images?.length
              ? `${IMAGE_URL}/${images[0]}`
              : `${IMAGE_URL}/no-image.jpg`;

            // ================= PRICE FIX =================
            const price =
              item.price ||
              item.singlePrice ||
              item.doublePrice ||
              item.triplePrice ||
              "N/A";

            return (
              <div className="col-lg-4 col-md-6" key={item._id}>

                <Link to={`/propertydetail/${item.slug}`} className="property-card">

                  <div className="listing-img-container">

                    <img
                      src={imageUrl}
                      alt={item.title}
                      className="img-fluid"
                    />

                    <div className="listing-badges">
                      <span className="badge badge-featured">Featured</span>
                      <span className="badge badge-rent">
                        {item.offerType || "Rent"}
                      </span>
                    </div>

                    <div className="listing-info">
                      <h6>{item.title}</h6>
                      <span className="price">₹{price}</span>
                    </div>

                  </div>

                </Link>

              </div>
            );
          })

        ) : (

          <div className="text-center py-5">
            <h5>No Properties Found</h5>
          </div>

        )}

      </div>
    </div>
  );
}