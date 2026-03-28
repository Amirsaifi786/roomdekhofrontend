import React from "react";
import { IMAGE_URL } from "../api/axios";
import { Link } from "react-router-dom";
import "./FeaturedProperty.css";

export default function FeaturedProperty({ properties = [] }) {
  return (
    <div className="container py-5 featured-section">

      <div className="testimonial-heading text-center">
        <h2>Feature Property</h2>
      </div>

      <div className="row g-4">
        {properties.length > 0 ? (
          properties.map((item) => {

            // ✅ SAFE IMAGE PARSE
            let images = [];

            try {
              images = typeof item.images === "string"
                ? JSON.parse(item.images)
                : item.images;
            } catch (err) {
              images = [];
            }

            const imageUrl = images?.length
              ? `${IMAGE_URL}/${images[0]}`
              : `${IMAGE_URL}/no-image.jpg`;

            return (
              <div className="col-lg-4 col-md-6" key={item._id || item.slug}>

                <Link to={`/propertydetail/${item.slug}`} className="property-card">

                  <div className="listing-img-container">

                    <img
                      src={imageUrl}
                      alt={item.title}
                    />

                    <div className="listing-badges">
                      <span className="badge badge-featured">Featured</span>
                      <span className="badge badge-rent">Rent</span>
                    </div>

                    <div className="listing-info">
                      <h6>{item.title}</h6>
                      <span className="price">₹{item.price}</span>
                    </div>

                  </div>

                </Link>

              </div>
            );
          })
        ) : (
          <p className="text-center">No Properties Found</p>
        )}
      </div>

    </div>
  );
}