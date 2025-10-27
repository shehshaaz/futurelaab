import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, Search, CheckCircle, AlertTriangle } from "lucide-react";
import apiService from "../utils/api";
import { USE_MOCK_DATA, getImagePath } from "../utils/config";
import { mockData } from "../utils/mockData";
import MakeYourOwnPackage from "../components/MakeYourOwnPackage";
import PromotionalCard from "../components/PromotionalCard";
import TestimonialsSlider from "../components/TestimonialsSlider";
import PincodeChecker from "./Pincode";


const Home = () => {
  // Helper function to get correct image URL
  const getImageUrl = (imagePath) => {
    // Handle cases where imagePath might be undefined or null
    if (!imagePath) return `${process.env.PUBLIC_URL}/images/placeholder.png`;

    // Use the getImagePath function from config
    return getImagePath(imagePath);
  };

  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [womenAge, setWomenAge] = useState([]);
  const [womenCare, setWomenCare] = useState([]);
  const [menAge, setMenAge] = useState([]);
  const [menCare, setMenCare] = useState([]);
  const [lifestyle, setLifestyle] = useState([]);
  const [specialCare, setSpecialCare] = useState([]);
  const [singleTest, setSingleTest] = useState([]);
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Pin code and service availability states
  const [pinCode, setPinCode] = useState("");
  const [serviceAvailable, setServiceAvailable] = useState(null);
  const [checkingService, setCheckingService] = useState(false);

  // Cart state (in real app, this would be in a global state management)
  const [cartItems, setCartItems] = useState([]);
  const [showCartNotification, setShowCartNotification] = useState(false);
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (USE_MOCK_DATA) {
          console.log("Using mock data (development mode)");
          setCategories(mockData.categories || []);
          setAds(mockData.ads || []);
          setWomenAge(mockData.womenCare || []);
          setWomenCare(mockData.womenCare || []);
          setMenAge(mockData.menCare || []);
          setMenCare(mockData.menCare || []);
          setLifestyle(mockData.lifestyle || []);
          setSpecialCare(mockData.specialCare || []);
          setSingleTest(mockData.singleTest || []);
          setLoading(false);
          return;
        }

        console.log("Starting to fetch data from backend API");

        // Fetch all data from backend API using the apiService
        const [
          lessPriceData,
          adsData,
          womenAgeData,
          womenCareData,
          menAgeData,
          menCareData,
          lifeStyleData,
          specialPackageData,
          singleTestData,
        ] = await Promise.all([
          apiService.getSelectedLessPrice(),
          apiService.getBottomBanners(),
          apiService.getSelectedWomenAge(),
          apiService.getSelectedWomenCare(),
          apiService.getSelectedMenAge(),
          apiService.getSelectedMenCare(),
          apiService.getSelectedLifestyle(),
          apiService.getSelectedSpecialCare(),
          apiService.getSelectedSingleTest(),
        ]);

        console.log("API responses received:", {
          lessPrice: lessPriceData?.data?.length || 0,
          adsData: adsData?.data?.length || 0,
        });

        setCategories(lessPriceData?.data || []);
        setAds(adsData?.data || []);
        setWomenAge(womenAgeData?.data || []);
        setWomenCare(womenCareData?.data || []);
        setMenAge(menAgeData?.data || []);
        setMenCare(menCareData?.data || []);
        setLifestyle(lifeStyleData?.data || []);
        setSpecialCare(specialPackageData?.data || []);
        setSingleTest(singleTestData?.data || []);

        console.log("Data set successfully");
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to load data. Please try again later.");

        // Fallback to mock data on error
        console.log("Falling back to mock data");
        setCategories(mockData.categories || []);
        setAds(mockData.ads || []);
        setWomenAge(mockData.womenCare || []);
        setWomenCare(mockData.womenCare || []);
        setMenAge(mockData.menCare || []);
        setMenCare(mockData.menCare || []);
        setLifestyle(mockData.lifestyle || []);
        setSpecialCare(mockData.specialCare || []);
        setSingleTest(mockData.singleTest || []);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handlePinCodeCheck = async (e) => {
    e.preventDefault();
    if (!pinCode || pinCode.length !== 6) {
      alert("Please enter a valid 6-digit pin code");
      return;
    }

    setCheckingService(true);
    setServiceAvailable(null);

    try {
      // Use the API service to check pincode
      const response = await apiService.checkPincode(pinCode);
      setServiceAvailable(response.available);
    } catch (error) {
      console.error("Error checking service availability:", error);
      setError("Failed to check service availability. Please try again.");
    } finally {
      setCheckingService(false);
    }
  };

  const handleAddToCart = async (testId) => {
    try {
      // Get user ID from localStorage (in a real app, this would come from auth context)
      const userId = localStorage.getItem("userId") || "temp-user-id";

      // Add item to cart using API
      const response = await apiService.addToCart(userId, testId);

      if (response.success) {
        alert("Item added to cart successfully!");
      } else {
        setError("Failed to add item to cart");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      setError("Error adding item to cart. Please try again.");
    }
  };

  const handleKnowMore = () => {
    navigate("/checkups");
  };

  if (loading) {
    return (
      <div className="d-flex flex-column justify-content-center align-items-center min-vh-100 bg-light">
        <div
          className="spinner-border text-primary mb-3"
          role="status"
          style={{ width: "3rem", height: "3rem" }}
        >
          <span className="visually-hidden">Loading...</span>
        </div>
        <h4 className="text-center mb-2">Loading Health Services...</h4>
        <p className="text-muted text-center">
          Please wait while we fetch the latest information
        </p>
        <div className="mt-3">
          <small className="text-muted">
            If this takes too long, the backend server might not be running.
          </small>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="d-flex flex-column justify-content-center align-items-center min-vh-100 bg-light">
        <div
          className="alert alert-danger d-flex align-items-center"
          role="alert"
        >
          <AlertTriangle className="me-2" />
          <div>
            <h4 className="alert-heading">Unable to Load Data</h4>
            <p className="mb-0">{error}</p>
          </div>
        </div>
        <div className="mt-3 text-center">
          <p className="text-muted">This usually happens when:</p>
          <ul className="text-muted text-start">
            <li>The backend server is not running</li>
            <li>There's a network connectivity issue</li>
            <li>MongoDB is not accessible</li>
          </ul>
        </div>
        <div className="mt-3">
          <button
            className="btn btn-primary me-2"
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
          <button
            className="btn btn-outline-secondary"
            onClick={() => {
              // Enable mock data and reload
              alert(
                "Switching to mock data mode. Please check the documentation for how to start the backend server."
              );
            }}
          >
            Use Mock Data
          </button>
        </div>
        <div className="mt-3">
          <small className="text-muted">
            Check the browser console for detailed error information.
          </small>
        </div>
      </div>
    );
  }

  return (
    <div className="home-page" style={{ minHeight: "100vh" }}>
      {/* Cart Notification */}
      {showCartNotification && (
        <div
          className="position-fixed top-0 end-0 p-3"
          style={{ zIndex: 1050, marginTop: "80px" }}
        >
          <div className="toast show" role="alert">
            <div className="toast-header bg-success text-white">
              <CheckCircle size={20} className="me-2" />
              <strong className="me-auto">Success!</strong>
              <button
                type="button"
                className="btn-close btn-close-white"
                onClick={() => setShowCartNotification(false)}
              ></button>
            </div>
            <div className="toast-body">Item added to cart</div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="hero-section mb-4">
        <div className="container-fluid p-0">
          <div className="position-relative">
            <img
              src={`${process.env.PUBLIC_URL}/images/banners/banner3.png`}
              alt="Healthcare Services - Lab Tests & Health Checkups"
              className="w-100 img-fluid"
              style={{
                height: "clamp(250px, 40vw, 500px)",
                objectFit: "cover",
                objectPosition: "center",
              }}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = `${process.env.PUBLIC_URL}/images/banners/banner1.png`;
              }}
            />
            <div
              className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center"
              style={{ background: "rgba(0,0,0,0.3)" }}
            >
              <div className="container">
                <div className="row">
                  <div className="col-lg-6 col-md-8">
                    <h1 className="text-white display-4 fw-bold mb-3">
                      Your Health, Our Priority
                    </h1>
                    <p className="text-white lead mb-4">
                      Comprehensive health checkups and diagnostic services at
                      your doorstep
                    </p>
                    <Link
                      to="/checkups"
                      className="btn btn-primary btn-lg mb-3"
                    >
                      Book Now
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pin Code Service Availability Section */}
   {/* <section
      className="py-5"
      style={{
        background: "linear-gradient(135deg, white 0%, #77d9cf 100%)",
        minHeight: "100vh",
      }}
    >
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8 col-md-10">
            <h2 className="text-center mb-4 fw-bold text-dark">
              🚚 Check Service Availability
            </h2>

            <div className="card shadow border-0 custom-glass">
              <div className="card-body p-4">
                <form onSubmit={handlePinCodeCheck}>
                  <div className="row g-3 align-items-end">
                    <div className="col-md-8">
                      <label
                        htmlFor="pincode"
                        className="form-label fw-semibold text-dark"
                      >
                        Enter Your Pin Code
                      </label>
                      <input
                        type="text"
                        id="pincode"
                        name="pincode"
                        className="form-control form-control-lg animated-input"
                        placeholder="Enter 6-digit pin code"
                        value={pinCode}
                        onChange={(e) =>
                          setPinCode(
                            e.target.value.replace(/\D/g, "").slice(0, 6)
                          )
                        }
                        pattern="\d{6}"
                        maxLength="6"
                        required
                      />
                    </div>
                    <div className="col-md-4">
                      <button
                        className="btn btn-lg btn-check w-100"
                        type="submit"
                        disabled={checkingService || pinCode.length !== 6}
                      >
                        {checkingService ? (
                          <>
                            <span
                              className="spinner-border spinner-border-sm me-2"
                              role="status"
                            ></span>
                            Checking...
                          </>
                        ) : (
                          <>
                            <Search size={20} className="me-2" />
                            Check
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </form>

                {serviceAvailable !== null && (
                  <div className="mt-4">
                    <div
                      className={`alert ${
                        serviceAvailable
                          ? "alert-success"
                          : "alert-danger"
                      } border-0 shadow result-alert`}
                      role="alert"
                    >
                      <div className="d-flex align-items-start">
                        {serviceAvailable ? (
                          <CheckCircle
                            className="me-3 mt-1 text-success"
                            size={28}
                          />
                        ) : (
                          <AlertTriangle
                            className="me-3 mt-1 text-danger"
                            size={28}
                          />
                        )}
                        <div>
                          {serviceAvailable ? (
                            <>
                              <h5 className="alert-heading mb-2">
                                Service Available! 🎉
                              </h5>
                              <p className="mb-0">
                                Great news! We provide home sample collection
                                and lab services in your area (PIN: {pinCode}).
                                Book your test now!
                              </p>
                            </>
                          ) : (
                            <>
                              <h5 className="alert-heading mb-2">
                                Service Not Available
                              </h5>
                              <p className="mb-0">
                                We don't provide services in PIN: {pinCode} yet.
                                Please contact us at{" "}
                                <strong>+91-9876543210</strong> for help.
                              </p>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}; */}


  {/* <section className="py-10 bg-gray-50">
        <div className="container mx-auto px-4">
          <PincodeChecker />
        </div>
      </section> */}



      
<section
  className="py-16 relative overflow-hidden"
  style={{ backgroundColor: "rgb(119, 217, 207)" }}
>
  <div className="container mx-auto px-4 flex flex-col items-center text-center">
    {/* Heading */}
    <h2 className="text-3xl md:text-4xl font-bold text-white drop-shadow-lg mb-4">
      Check Home Sample Collection Availability
    </h2>
    <p className="text-white/90 mb-10 max-w-xl text-lg">
      Enter your area pincode to see if our lab services are available at your
      location. Quick, easy, and reliable.
    </p>

    {/* Pincode Checker Card */}
    <div
      className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border-2 border-white/70
                 p-6 sm:p-8 transition-transform duration-500 hover:scale-[1.02]
                 backdrop-blur-sm"
    >
      <form className="flex flex-col sm:flex-row items-center justify-center gap-3">
        <input
          id="pincode-input"
          type="text"
          inputMode="numeric"
          pattern="\d*"
          placeholder="Enter 6-digit pincode"
          className="w-full sm:flex-1 px-5 py-3 rounded-xl border-2 border-gray-300 text-center text-lg 
                     focus:outline-none focus:ring-4 focus:ring-teal-300 focus:border-teal-500
                     transition-all duration-300 shadow-sm placeholder:text-gray-400"
        />

        <button
          type="submit"
          className="px-8 py-3 bg-white text-teal-700 border-2 border-teal-800 rounded-xl font-semibold
                     shadow-md hover:bg-teal-700 hover:text-white hover:shadow-lg
                     transition-all duration-300 ease-in-out focus:ring-4 focus:ring-teal-300
                     active:scale-95"
        >
          Check
        </button>
      </form>

      {/* Message section (example placeholder) */}
      <div className="mt-5 text-sm text-gray-500">
        We currently support home collection in select areas only.
      </div>
    </div>
  </div>

  {/* Decorative shapes */}
  <div className="absolute top-0 left-0 w-40 h-40 bg-white/20 rounded-full blur-3xl animate-pulse"></div>
  <div className="absolute bottom-0 right-0 w-56 h-56 bg-white/20 rounded-full blur-3xl animate-pulse"></div>
</section>










      {/* Scrolling Marquee Section */}
      <section className="py-2 bg-primary">
        <div className="overflow-hidden">
          <div className="marquee">
            <span className="text-white fw-semibold">
              🩺 Welcome to Future Lab Diagnostics | Your Health, Our Priority |
              Caring for You with Precision | Reliable Results You Can Trust |
              Compassionate Healthcare Services | Advanced Diagnostics for a
              Healthier Future | Experience Quality Care with Us | Committed to
              Your Well-being 🩺
            </span>
          </div>
        </div>
      </section>

      {/* Categories Section */}
<section className="py-5 bg-light">
  <div className="container">
    {/* Header Section */}
    <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-5 text-center text-md-start">
      <div>
        <h2 className="fw-bold mb-2 text-primary">Health Checkup Packages</h2>
        <p className="text-muted mb-0">
          Choose from our comprehensive health packages designed for your well-being
        </p>
      </div>
      <Link
        className="btn btn-primary mt-3 mt-md-0 px-4 py-2 fw-semibold shadow-sm"
        to="/completehealth"
      >
        View All Packages
      </Link>
    </div>

    {/* Cards Section */}
<div className="row g-4">
  {categories.length > 0 ? (
    categories.slice(0, 4).map((item, index) => (
      <div key={index} className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
        <Link
          to={`/completehealth?tab=${encodeURIComponent(item.name)}`}
          className="text-decoration-none"
        >
          <div
            className="card border-0 rounded-4 overflow-hidden position-relative"
            style={{
              boxShadow: "0 4px 15px rgba(0,0,0,0.05)",
              transition: "all 0.4s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-8px)";
              e.currentTarget.style.boxShadow = "0 12px 30px rgba(0,0,0,0.15)";
              const strip = e.currentTarget.querySelector(".title-strip");
              if (strip) {
                strip.style.backgroundColor = "rgb(90, 190, 180)";
                strip.style.transform = "translateY(0)";
                strip.style.opacity = "1";
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 15px rgba(0,0,0,0.05)";
              const strip = e.currentTarget.querySelector(".title-strip");
              if (strip) {
                strip.style.backgroundColor = "rgb(119, 217, 207)";
                strip.style.transform = "translateY(10px)";
                strip.style.opacity = "0.8";
              }
            }}
          >
            <div className="card-body text-center p-0 d-flex flex-column justify-content-start">
              
              {/* Image Section */}
              <div className="position-relative overflow-hidden">
                <img
                  className="img-fluid w-100"
                  src={getImageUrl(item.imagePath)}
                  alt={item.name}
                  style={{
                    height: "180px",
                    objectFit: "cover",
                    transition: "transform 0.4s ease",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.08)")}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                />

                {/* Animated Title Strip */}
                <div
                  className="title-strip position-absolute bottom-0 w-100 py-2"
                  style={{
                    backgroundColor: "rgb(119, 217, 207)",
                    color: "#004d4d",
                    fontWeight: "600",
                    fontSize: "1rem",
                    transition: "all 0.4s ease",
                    transform: "translateY(10px)",
                    opacity: "0.9",
                  }}
                >
                  {item.name}
                </div>
              </div>
            </div>
          </div>
        </Link>
      </div>
    ))
  ) : (
    <div className="col-12">
      <div className="text-center py-5">
        <div className="spinner-border text-primary mb-3" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <h5>Loading Health Packages...</h5>
        <p className="text-muted">
          Please wait while we fetch the latest packages for you.
        </p>
      </div>
    </div>
  )}
</div>




  </div>
</section>



      {/* Healthcare Banner Carousel */}
<section className="py-4 bg-light position-relative">
  <div className="container-fluid position-relative">
    <div className="scrolling-carousel overflow-hidden position-relative">
      <div className="carousel-track d-flex align-items-center">
        {/* Main banners */}
        {[1, 2, 3].map((num, index) => (
          <div key={index} className="flex-shrink-0 me-3">
            <img
              src={`${process.env.PUBLIC_URL}/images/banners/banner${num}.png`}
              alt={`Health Banner ${num}`}
              className="rounded shadow-sm"
              style={{
                width: "300px",
                height: "200px",
                objectFit: "cover",
                borderRadius: "12px",
              }}
            />
          </div>
        ))}

        {/* Duplicate banners for seamless infinite scroll */}
        {[1, 2, 3].map((num, index) => (
          <div key={`dup-${index}`} className="flex-shrink-0 me-3">
            <img
              src={`${process.env.PUBLIC_URL}/images/banners/banner${num}.png`}
              alt={`Health Banner Duplicate ${num}`}
              className="rounded shadow-sm"
              style={{
                width: "300px",
                height: "200px",
                objectFit: "cover",
                borderRadius: "12px",
              }}
            />
          </div>
        ))}
      </div>

      {/* Gradient fade edges */}
      <div className="fade-left"></div>
      <div className="fade-right"></div>
    </div>
  </div>
</section>

<style>
{`
/* Base carousel */
.scrolling-carousel {
  position: relative;
  overflow: hidden;
}

/* Track with animation */
.carousel-track {
  display: flex;
  align-items: center;
  gap: 1rem;
  animation: scroll-infinite 25s linear infinite;
}

/* Pause on hover (desktop only) */
@media (hover: hover) {
  .scrolling-carousel:hover .carousel-track {
    animation-play-state: paused;
  }
}

/* Smooth infinite scroll animation */
@keyframes scroll-infinite {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

/* Gradient fades on edges */
.fade-left,
.fade-right {
  position: absolute;
  top: 0;
  width: 100px;
  height: 100%;
  z-index: 10;
  pointer-events: none;
}

.fade-left {
  left: 0;
  background: linear-gradient(to right, rgba(248, 249, 250, 1), rgba(248, 249, 250, 0));
}

.fade-right {
  right: 0;
  background: linear-gradient(to left, rgba(248, 249, 250, 1), rgba(248, 249, 250, 0));
}

/* ✅ Responsive tweaks */
@media (max-width: 992px) {
  .carousel-track img {
    width: 240px !important;
    height: 160px !important;
  }
  .carousel-track {
    animation-duration: 30s;
  }
}

@media (max-width: 576px) {
  .carousel-track img {
    width: 180px !important;
    height: 120px !important;
  }
  .carousel-track {
    animation-duration: 35s;
  }
  .fade-left, .fade-right {
    width: 60px;
  }
}
`}
</style>




      {/* Special Offer Card */}
      <section className="py-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6 col-md-8">
              <div className="card border-primary border-3 shadow-lg position-relative">
                {/* Discount Badge */}
                <div
                  className="position-absolute bg-danger text-white px-3 py-1 rounded-pill fw-bold"
                  style={{
                    top: "15px",
                    right: "15px",
                    transform: "rotate(15deg)",
                    fontSize: "0.875rem",
                  }}
                >
                  56% OFF
                </div>

                <div className="card-header bg-white border-0 text-center pt-4">
                  <h3 className="text-danger fw-bold mb-3">
                    Full Body Checkup +<br />1 Special Profile Test FREE
                  </h3>
                </div>

                <div className="card-body p-4">
                  <div className="row align-items-center">
                    <div className="col-md-7">
                      {/* Test Count Badge */}
                      <div className="d-flex align-items-center mb-3">
                        <div className="bg-success rounded-circle p-2 me-3">
                          <div className="bg-light rounded-circle p-1">
                            <div
                              className="bg-success rounded-pill"
                              style={{ width: "8px", height: "12px" }}
                            ></div>
                          </div>
                        </div>
                        <span className="text-warning fw-bold fs-5">
                          103 Tests
                        </span>
                      </div>

                      {/* Know More Button */}
                      <button
                        className="btn btn-primary btn-lg rounded-pill mb-3 fw-bold shadow"
                        onClick={handleKnowMore}
                        style={{ minWidth: "150px" }}
                      >
                        Know More
                      </button>

                      {/* Price Section */}
                      <div>
                        <div className="text-danger display-4 fw-bold lh-1 mb-2">
                          ₹999
                        </div>
                        <div className="text-dark fw-bold mb-2">
                          Exclusive Offer
                        </div>
                        <div className="text-warning fs-4 fw-bold text-decoration-line-through">
                          ₹2,299
                        </div>
                      </div>
                    </div>

                    <div className="col-md-5 text-center">
                      <div
                        className="bg-warning bg-opacity-25 rounded-3 p-4 position-relative"
                        style={{ minHeight: "200px" }}
                      >
                        <div className="fs-1 mb-3">👩‍🦰</div>
                        <div
                          className="position-absolute"
                          style={{
                            bottom: "20px",
                            right: "20px",
                            fontSize: "1.5rem",
                            transform: "rotate(-10deg)",
                          }}
                        >
                          👉
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Add to Cart Button */}
                <div className="card-footer bg-success border-0 p-0">
                  <button
                    className="btn btn-success btn-lg w-100 rounded-0 rounded-bottom py-3 fw-bold"
                    onClick={() => handleAddToCart()}
                    style={{ fontSize: "1.25rem" }}
                  >
                    <ShoppingCart size={28} className="me-2" />
                    ADD TO CART
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Make Your Own Package Component */}
      <MakeYourOwnPackage />

      {/* Statistics Section */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-3 col-md-12 mb-4 mb-lg-0">
              <h3 className="fw-bold text-primary">
                Book Lab Tests
                <br />
                <span className="text-dark">With Us</span>
              </h3>
            </div>
            <div className="col-lg-9">
              <div className="row g-4">
                <div className="col-md-3 col-sm-6">
                  <div className="d-flex align-items-center">
                    <img
                      src="/images/icon-svg/ontime-report.svg"
                      alt="On-time report"
                      className="me-3"
                      style={{ width: "48px", height: "48px" }}
                    />
                    <div>
                      <h4 className="fw-bold text-primary mb-1">98%</h4>
                      <p className="small mb-0 text-muted">
                        On-time report
                        <br />
                        delivery
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-3 col-sm-6">
                  <div className="d-flex align-items-center">
                    <img
                      src="/images/icon-svg/timely collection.svg"
                      alt="Timely collection"
                      className="me-3"
                      style={{ width: "48px", height: "48px" }}
                    />
                    <div>
                      <h4 className="fw-bold text-primary mb-1">97%</h4>
                      <p className="small mb-0 text-muted">
                        Timely sample
                        <br />
                        collections
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-3 col-sm-6">
                  <div className="d-flex align-items-center">
                    <img
                      src="/images/icon-svg/review.svg"
                      alt="Customer reviews"
                      className="me-3"
                      style={{ width: "48px", height: "48px" }}
                    />
                    <div>
                      <h4 className="fw-bold text-primary mb-1">99%</h4>
                      <p className="small mb-0 text-muted">
                        Positive customer
                        <br />
                        reviews
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-3 col-sm-6">
                  <div className="d-flex align-items-center">
                    <img
                      src="/images/icon-svg/certify.svg"
                      alt="Certifications"
                      className="me-3"
                      style={{ width: "48px", height: "48px" }}
                    />
                    <div>
                      <h4 className="fw-bold text-primary mb-1 small">
                        Future Lab
                      </h4>
                      <p className="small mb-0 text-muted">
                        Prestigious
                        <br />
                        Certifications
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ads Carousel */}
      {ads.length > 0 && (
        <section className="py-5">
          <div className="container">
            <h3 className="text-center mb-4 fw-bold">Special Promotions</h3>
            <div className="row g-3">
              {ads.slice(0, 3).map((ad, index) => (
                <div key={index} className="col-lg-4 col-md-6">
                  <div className="card border-0 shadow-sm hover-lift">
                    <img
                      className="card-img-top"
                      src={getImageUrl(ad.imageUrl)}
                      alt={ad.title}
                      style={{ height: "200px", objectFit: "cover" }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Testimonials Slider */}
      <TestimonialsSlider />

      <style jsx>{`
        .hover-lift {
          transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
        }

        .hover-lift:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15) !important;
        }

        .marquee {
          animation: scroll 30s linear infinite;
          white-space: nowrap;
        }

        @keyframes scroll {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(-100%);
          }
        }

        .scrolling-carousel .carousel-track {
          animation: scroll-left 20s linear infinite;
        }

        @keyframes scroll-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        @media (max-width: 768px) {
          .display-4 {
            font-size: 2rem;
          }

          .lead {
            font-size: 1rem;
          }

          .card-body {
            padding: 1.5rem !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Home;

const getImageUrl = (imagePath) => {
  // Handle cases where imagePath might be undefined or null
  if (!imagePath) return "/images/placeholder.png";

  // Use the getImagePath function from config
  return getImagePath(imagePath);
};
