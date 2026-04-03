import React, { useState } from "react";
import "./Contact.css";
import API from "../api/axios";
import { toast } from "react-toastify";

const Contact = () => {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const [loading, setLoading] = useState(false);

  // handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await API.post("/message/send-mail", formData);

      toast.success(res.data.message);

      // reset form
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: ""
      });

    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>

      {/* MAP SECTION */}
      <section className="contact-map">

        <iframe
          title="map"
          src="https://www.google.com/maps?q=Plot%20No.%2040%20Katewa%20Nagar%20Jaipur&output=embed"
          loading="lazy"
        ></iframe>

        <div className="office-box">
          <h5>Our Office</h5>

          <p>
            <i className="fa-solid fa-location-dot"></i>
            Plot no. 40, Katewa Nagar
          </p>

          <p>
            Gujar ki thadi, New Sanganer Road
          </p>

          <p>Jaipur – 302020</p>

        </div>

      </section>


      {/* CONTACT SECTION */}
      <section className="contact-section container">

        <div className="row g-5">

          {/* LEFT INFO */}
          <div className="col-md-4">

            <h3 className="mb-4">Get in Touch</h3>

            <p>
              We are here to help you find the best rental properties in Jaipur.
              Feel free to contact us anytime.
            </p>

            <div className="contact-info">

              <div className="info-item">
                <i className="fa-solid fa-globe"></i>
                <a href="https://roomrentjaipur.com">
                  www.roomrentjaipur.com
                </a>
              </div>

              <div className="info-item">
                <i className="fa-solid fa-envelope"></i>
                <a href="mailto:contact@roomrentjaipur.com">
                  contact@roomrentjaipur.com
                </a>
              </div>

            </div>

          </div>


          {/* CONTACT FORM */}
          <div className="col-md-8">

           
        <div className="row g-5">

     


          {/* CONTACT FORM */}
        <section className="contact-section container">

        <div className="row g-5">

          <div className="col-md-12">
            <div className="contact-form">
              <h3 className="mb-4">Send Message</h3>

              <form onSubmit={handleSubmit}>

                <div className="row">

                  <div className="col-md-6 mb-3">
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      placeholder="Email Address"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-md-12 mb-3">
                    <input
                      type="text"
                      name="subject"
                      className="form-control"
                      placeholder="Subject"
                      value={formData.subject}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-md-12 mb-3">
                    <textarea
                      name="message"
                      className="form-control"
                      rows="5"
                      placeholder="Message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                    ></textarea>
                  </div>

                  <div className="col-md-12">
                    <button className="btn btn-contact" disabled={loading}>
                      {loading ? "Sending..." : "Send Message"}
                    </button>
                  </div>

                </div>

              </form>

            </div>
          </div>

        </div>

      </section>


        </div>

          </div>

        </div>

      </section>

    </div>
  );
};

export default Contact;