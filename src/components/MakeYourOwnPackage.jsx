import React from "react";
import { Link } from "react-router-dom";

const MakeYourOwnPackage = () => {
  return (
    <section className="py-5">
      <div className="container text-center mb-4">
        {/* Main Heading */}
        <h2 className="fw-bold mb-3" style={{ fontSize: "2rem", color: "#333" }}>
          Make Your Own Package
        </h2>

        {/* Paragraph outside card */}
        <p
          className="text-muted mx-auto"
          style={{
            maxWidth: "700px",
            fontSize: "1rem",
            lineHeight: "1.6",
          }}
        >
          Select the tests you need and get a special discount. Create your
          personalized health checkup package that perfectly fits your needs
          and budget.
        </p>
      </div>

      {/* Main Card Section */}
      <div
        className="container text-white position-relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #9370FF, #6A5ACD)",
          borderRadius: "20px",
          boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
          padding: "3rem 2rem",
        }}
      >
        <div className="row align-items-center">
          {/* LEFT CONTENT */}
          <div className="col-lg-6 col-md-6 text-center text-md-start">
            <h3 className="fw-bold mb-3" style={{ fontSize: "2rem" }}>
              Create Your <br /> Own Package
            </h3>

            <Link
              to="/create-package"
              className="btn fw-semibold text-uppercase"
              style={{
                backgroundColor: "#6C63FF",
                color: "#fff",
                borderRadius: "50px",
                padding: "0.75rem 2rem",
                fontSize: "1rem",
                boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
              }}
            >
              Start Now
            </Link>
          </div>

          {/* RIGHT IMAGE & DISCOUNT */}
          <div className="col-lg-6 col-md-6 position-relative text-center mt-4 mt-md-0">
            <img
              src="/images/doctr-left.png" // replace with your actual image path
              alt="Doctor"
              className="img-fluid"
              style={{
                maxHeight: "320px",
                borderRadius: "12px",
                objectFit: "contain",
              }}
            />

            {/* Discount Badge */}
            <div
              className="position-absolute text-center fw-bold text-white"
              style={{
                bottom: "10px",
                right: "20px",
                background: "linear-gradient(145deg, #7B68EE, #483D8B)",
                padding: "1rem",
                borderRadius: "15px",
                width: "140px",
              }}
            >
              <div style={{ fontSize: "0.9rem" }}>UP TO</div>
              <div style={{ fontSize: "1.8rem", color: "#FFD700" }}>75%</div>
              <div style={{ fontSize: "0.9rem" }}>OFF</div>
            </div>
          </div>
        </div>
      </div>

      {/* Responsive Tweaks */}
      <style>{`
        @media (max-width: 768px) {
          .container {
            text-align: center !important;
            padding: 2rem 1.5rem !important;
          }
          h2 {
            font-size: 1.6rem !important;
          }
          h3 {
            font-size: 1.4rem !important;
          }
          img {
            max-height: 250px !important;
          }
          .btn {
            font-size: 0.9rem !important;
            padding: 0.6rem 1.5rem !important;
          }
        }
      `}</style>
    </section>
  );
};

export default MakeYourOwnPackage;
