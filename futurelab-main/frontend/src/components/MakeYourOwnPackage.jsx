import React from "react";
import { Link } from "react-router-dom";
// Removed import '../images/banners/sec12-img.png'

const MakeYourOwnPackage = () => {
  return (
    <div
      className="container my-5"
      style={{
        backgroundColor: "#f0f8ff",
        padding: "2rem",
        borderRadius: "15px",
      }}
    >
      <div className="row align-items-center">
        <div className="col-md-6">
          // Removed image import and image element
        </div>
        <div className="col-md-6">
          <h2>Make Your Own Package</h2>
          <p>
            Select the tests you need and get a special discount. Create a
            personalized health checkup package that fits your requirements.
          </p>
          <p className="h4 text-danger">Get 25% OFF</p>
          <Link to="/create-package" className="btn btn-primary">
            Start Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MakeYourOwnPackage;
