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
import Carousel from "react-bootstrap/Carousel";


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





  // special offers carousel
    const packages = [
    {
      id: 1,
      title: "Full Body Checkup + 1 Special Profile Test FREE",
      tests: "103 Tests",
      price: "₹999",
      oldPrice: "₹2299",
      image: "/images/Tests/full-body.png",
    },
    {
      id: 2,
      title: "Comprehensive Health Package",
      tests: "95 Tests",
      price: "₹899",
      oldPrice: "₹1999",
      image: "/images/Tests/full-body.png",
    },
    {
      id: 3,
      title: "Heart Care Package",
      tests: "110 Tests",
      price: "₹1099",
      oldPrice: "₹2499",
      image: "/images/Tests/full-body.png",
    },
    {
      id: 4,
      title: "Diabetes Screening Package",
      tests: "78 Tests",
      price: "₹799",
      oldPrice: "₹1799",
      image: "/images/Tests/full-body.png",
    },
    {
      id: 5,
      title: "Senior Citizen Health Package",
      tests: "120 Tests",
      price: "₹1299",
      oldPrice: "₹2999",
      image: "/images/Tests/full-body.png",
    },
    {
      id: 6,
      title: "Women Wellness Package",
      tests: "88 Tests",
      price: "₹899",
      oldPrice: "₹1999",
      image: "/images/Tests/full-body.png",
    },
  ];

  const [current, setCurrent] = useState(0);
  const total = packages.length;

  const nextSlide = () => {
    setCurrent((prev) => (prev === total - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? total - 1 : prev - 1));
  };

  
  

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
     const chunkedCategories = [];
  for (let i = 0; i < categories.length; i += 6) {
    chunkedCategories.push(categories.slice(i, i + 6));
  }

  const chunkedAds = [];
  for (let i = 0; i < ads.length; i += 4) {
    chunkedAds.push(ads.slice(i, i + 4));
  }

  
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
        <Carousel fade interval={3000} controls={false} indicators={false}>
          {["banner1.png", "banner2.png", "banner3.png"].map((image, index) => (
            <Carousel.Item key={index}>
              <img
                className="d-block w-100 img-fluid hero-image"
                src={`${process.env.PUBLIC_URL}/images/banners/${image}`}
                alt={`Banner ${index + 1}`}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = `${process.env.PUBLIC_URL}/images/banners/banner1.png`;
                }}
              />
            </Carousel.Item>
          ))}
        </Carousel>
      </div>

      {/* Custom styles */}
      <style>{`
        .hero-image {
          height: clamp(250px, 40vw, 500px);
          object-fit: cover;
          object-position: center;
          border-radius: 0;
          transition: all 0.4s ease-in-out;
        }

        /* Smaller size & rounded for mobile */
        @media (max-width: 768px) {
          .hero-image {
            height: 220px;
            border-radius: 15px;
            margin: 10px;
          }
        }
      `}</style>
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
      Enter Your Pincode to Check Service Availability
    </h2>
    <p className="text-white/90 mb-10 max-w-xl text-lg">
      Enter your pincode
    </p>

    {/* Pincode Checker Card */}
    <div className="w-full max-w-md bg-white rounded-xl shadow-xl border border-gray-200 p-5">
      <form className="flex flex-col sm:flex-row items-center justify-center gap-3">
        <input
          id="pincode-input"
          type="text"
          inputMode="numeric"
          pattern="\d*"
          maxLength="6"
          placeholder="Enter 6-digit pin code"
          className="w-full sm:flex-1 px-4 py-3 rounded-lg border border-gray-300 text-gray-700 
                     focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-500
                     transition-all duration-200 text-base"
        />

  <button
    type="submit"
    className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 
               bg-blue-600 text-white font-semibold rounded-md shadow-md
               hover:bg-blue-700 hover:shadow-lg active:scale-95
               transition-all duration-200 focus:ring-4 focus:ring-blue-300"
    style={{ minHeight: "48px" }}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className="w-5 h-5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"
      />
    </svg>
    Check Availability
  </button>
      </form>
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
  <div className="container"  style={{ backgroundColor: 'rgba(224, 247, 247, 0.7)' }} className="p-3 rounded-3">
    {/* Header Section */}
    {/* <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-5 text-center text-md-start">
   <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center align-items-start bg-light p-3 rounded-3 shadow-sm">

  <div>
    <h2 className="fw-bold mb-1" style={{ color: 'rgb(0, 162, 173)' }}>
      Money-Saving <span className="d-block">Packages</span>
    </h2>
    <p className="mb-0 fw-semibold" style={{ color: 'rgb(255, 128, 0)' }}>
      Upto 75% Discount
    </p>
  </div>


  <Link
    to="/completehealth"
    className="btn fw-semibold text-white mt-3 mt-md-0 px-4 py-2"
    style={{
      background: 'linear-gradient(180deg, #FFA500 0%, #FF7A00 100%)',
      border: 'none',
      fontSize: '1rem',
      boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
      borderRadius: '6px',
      whiteSpace: 'nowrap',
    }}
  >
    VIEW ALL
  </Link>
</div>
</div> */}

  </div>
</section>

    {/* Cards Section */}
<section className="py-5">
  <div className="container">
    {/* Section Header */}
    <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-4">  
      <div className="align-items-md-center ">
        <h2 className="fw-bold mb-1"
              style={{ color: "rgb(0, 162, 173)", fontSize: "1.5rem"}}>
          Money-Saving Packages
        </h2>
        <p className="mb-0 fw-semibold" style={{ color: "rgb(255, 128, 0)" }}>
          Upto 75% Discount
        </p>
      </div>
 

      <Link
        to="/completehealth"
        className="btn fw-semibold text-white mt-3 mt-md-0 px-4 py-2"
        style={{
          background: "linear-gradient(180deg, #FFA500 0%, #FF7A00 100%)",
          border: "none",
          fontSize: "1rem",
          borderRadius: "8px",
          boxShadow: "0 3px 8px rgba(0,0,0,0.2)",
        }}
      >
        VIEW ALL
      </Link>
    </div>

    {/* Carousel */}
    <Carousel
      interval={null}
      controls={true}
      indicators={false}
      nextIcon={<span className="carousel-control-next-icon" />}
      prevIcon={<span className="carousel-control-prev-icon" />}
      className="custom-carousel "
    >
      {chunkedCategories.map((group, index) => (
        <Carousel.Item key={index}>
          <div className="row g-3 justify-content-center">
            {group.map((item, idx) => (
              <div
                key={idx}
                className="col-6 col-sm-3 col-md-3 col-lg-3 col-xl-3"
              >
                <Link
                  to={`/completehealth?tab=${encodeURIComponent(item.name)}`}
                  className="text-decoration-none"
                >
                  <div
                    className="card border-0 rounded-4 overflow-hidden shadow-sm h-100 position-relative"
                    style={{
                      borderRadius: "14px",
                      transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-6px)";
                      e.currentTarget.style.boxShadow =
                        "0 8px 20px rgba(0,0,0,0.15)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow =
                        "0 4px 10px rgba(0,0,0,0.05)";
                    }}
                  >
                    <div className="position-relative overflow-hidden rounded-top-4">
                      <img
                        className="img-fluid w-100"
                        src={getImageUrl(item.imagePath)}
                        alt={item.name}
                        style={{
                          height: "160px",
                          objectFit: "cover",
                          transition: "transform 0.3s ease",
                          borderTopLeftRadius: "14px",
                          borderTopRightRadius: "14px",
                        }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.transform = "scale(1.05)")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.transform = "scale(1)")
                        }
                      />
                    </div>
                    <div
                      className="text-center py-2 rounded-bottom-4"
                      style={{
                        backgroundColor: "rgb(119, 217, 207)",
                        color: "#004d4d",
                        fontWeight: "600",
                        fontSize: "0.95rem",
                      }}
                    >
                      {item.name}
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </Carousel.Item>
      ))}
    </Carousel>

    {/* Carousel Navigation Arrows */}
    <style>{`
      .custom-carousel {
        position: relative;
      }

      /* Arrows Base Style */
      .custom-carousel .carousel-control-prev,
      .custom-carousel .carousel-control-next {
        position: absolute;
        bottom: -45px;
        top: auto;
        width: 42px;
        height: 42px;
        background-color: rgba(0, 162, 173, 0.9);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0.9;
        transition: all 0.25s ease;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
      }

      /* Hover and Active States */
      .custom-carousel .carousel-control-prev:hover,
      .custom-carousel .carousel-control-next:hover {
        background-color: rgba(0, 162, 173, 1);
        transform: scale(1.1);
      }

      .custom-carousel .carousel-control-prev:active,
      .custom-carousel .carousel-control-next:active {
        transform: scale(0.9);
        box-shadow: 0 0 12px rgba(0, 200, 255, 0.8);
      }

      /* Positioning bottom center */
      .custom-carousel .carousel-control-prev {
        left: calc(50% - 60px);
      }

      .custom-carousel .carousel-control-next {
        right: calc(50% - 60px);
      }

      /* Mobile Adjustments */
      @media (max-width: 767px) {
        .custom-carousel .carousel-control-prev,
        .custom-carousel .carousel-control-next {
          width: 36px;
          height: 36px;
          bottom: -35px;
        }
        .custom-carousel img {
          height: 120px !important;
        }
      }
    `}</style>
  </div>
</section>









 {/* Healthcare Banner Section */}
<section className="py-4 bg-light">
  <div className="container">
    <div
      className="d-flex flex-column flex-md-row align-items-center justify-content-center bg-white shadow-sm p-3 p-md-4 mx-auto"
      style={{
        borderRadius: "16px",
        maxWidth: "650px",
        background: "linear-gradient(90deg, #eafff8 0%, #d8fff0 100%)",
      }}
    >
      {/* Left Side - Illustration */}
      <div className="me-md-4 mb-3 mb-md-0 text-center">
        <img
          src={`${process.env.PUBLIC_URL}/images/delivery-doctor.png`}
          alt="Home Visit Icon"
          style={{
            width: "120px",
            height: "auto",
          }}
        />
      </div>

      {/* Right Side - Text Content */}
      <div className="text-center text-md-start">
        <h5
          className="fw-bold mb-1"
          style={{ color: "#E53935", fontSize: "1.25rem" }}
        >
          Free - Home Visit
        </h5>
        <h4
          className="fw-bold mb-2"
          style={{ color: "#B71C1C", fontSize: "1.5rem" }}
        >
          in Bengaluru
        </h4>
        <p className="mb-0 fw-semibold" style={{ color: "#2E7D32" }}>
          If Bill Amount 1k
        </p>
      </div>
    </div>
  </div>

  <style>{`
    /* Mobile Responsive Adjustments */
    @media (max-width: 768px) {
      section div.container > div {
        flex-direction: column !important;
        text-align: center !important;
      }

      section img {
        width: 90px !important;
      }

      section h4 {
        font-size: 1.25rem !important;
      }

      section h5 {
        font-size: 1.1rem !important;
      }
    }
  `}</style>
</section>





      {/* Special Offer Card */}
 
   <section className="py-5">
      <div className="container">
        {/* Header */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-4">
          <div>
            <h2
              className="fw-bold mb-1"
              style={{ color: "rgb(0, 162, 173)", fontSize: "1.5rem" }}
            >
              Special Offers <br />
              <span style={{ color: "rgb(255, 128, 0)" }}>Upto 75% Discount</span>
            </h2>
          </div>
          <Link
            to="/completehealth"
            className="btn text-white fw-semibold shadow-sm px-4 py-2"
            style={{
              background: "linear-gradient(180deg, #FFA500 0%, #FF7A00 100%)",
              border: "none",
              fontSize: "1rem",
              borderRadius: "8px",
            }}
          >
            VIEW ALL
          </Link>
        </div>

        {/* Carousel */}
        <div className="position-relative overflow-hidden text-center">
          <div
            className="d-flex justify-content-center align-items-center position-relative"
            style={{
              perspective: "1000px",
              overflow: "visible",
            }}
          >
            <div
              className="d-flex align-items-center justify-content-center"
              style={{
                transition: "transform 0.6s ease",
                transform: `translateX(-${current * 100}%)`,
                gap: "1rem",
              }}
            >
              {packages.map((pkg, index) => {
                const isActive = index === current;
                const isLeft = index === (current - 1 + total) % total;
                const isRight = index === (current + 1) % total;

                let transformStyle = "scale(0.9) translateY(10px)";
                let zIndex = 1;
                let opacity = 0.8;

                if (isActive) {
                  transformStyle = "scale(1.05) translateY(0)";
                  zIndex = 3;
                  opacity = 1;
                } else if (isLeft) {
                  transformStyle = "rotateY(20deg) scale(0.9) translateY(10px)";
                  zIndex = 2;
                } else if (isRight) {
                  transformStyle = "rotateY(-20deg) scale(0.9) translateY(10px)";
                  zIndex = 2;
                }

                return (
                  <div
                    key={pkg.id}
                    className="card shadow-sm border-0 text-center position-relative"
                    style={{
                      flex: "0 0 260px",
                      borderRadius: "20px",
                      overflow: "hidden",
                      background: "#fff",
                      opacity,
                      transform: transformStyle,
                      zIndex,
                      transition: "all 0.6s ease-in-out",
                      boxShadow: isActive
                        ? "0 8px 20px rgba(0,0,0,0.3)"
                        : "0 4px 10px rgba(0,0,0,0.1)",
                    }}
                  >
                    {/* Discount Badge */}
                    <span
                      className="position-absolute bg-danger text-white fw-bold px-2 py-1 rounded-end"
                      style={{ top: "10px", left: "0", fontSize: "0.8rem" }}
                    >
                      56% OFF
                    </span>

                    {/* Image */}
                    <img
                      src={pkg.image}
                      alt={pkg.title}
                      className="card-img-top"
                      style={{
                        height: "160px",
                        objectFit: "cover",
                        borderTopLeftRadius: "20px",
                        borderTopRightRadius: "20px",
                      }}
                    />

                    {/* Content */}
                    <div className="card-body py-3">
                      <h6 className="fw-bold text-danger mb-1">{pkg.title}</h6>
                      <p className="text-secondary mb-2">{pkg.tests}</p>

                      <button
                        className="btn btn-primary btn-sm rounded-pill mb-2 fw-semibold"
                        style={{
                          backgroundColor: "#003366",
                          border: "none",
                          padding: "5px 16px",
                          fontSize: "0.85rem",
                        }}
                      >
                        Know More
                      </button>

                      <div
                        className="fw-bold text-danger"
                        style={{ fontSize: "1.2rem" }}
                      >
                        {pkg.price}
                      </div>
                      <div className="text-muted">Exclusive Offer</div>
                      <div className="text-decoration-line-through text-secondary">
                        {pkg.oldPrice}
                      </div>
                    </div>

                    {/* Add to Cart */}
                    <div
                      className="text-center py-2 fw-bold text-white"
                      style={{
                        backgroundColor: "#007A5E",
                        borderBottomLeftRadius: "20px",
                        borderBottomRightRadius: "20px",
                        fontSize: "1rem",
                      }}
                    >
                      <i className="bi bi-cart-fill me-2"></i>ADD TO CART
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Arrows — now beside center card */}
            <button
              className="btn btn-primary rounded-circle position-absolute shadow"
              style={{
                left: "5%",
                top: "50%",
                transform: "translateY(-50%)",
                zIndex: 5,
                width: "38px",
                height: "38px",
              }}
              onClick={prevSlide}
            >
              <i className="bi bi-chevron-left text-white"></i>
            </button>

            <button
              className="btn btn-primary rounded-circle position-absolute shadow"
              style={{
                right: "5%",
                top: "50%",
                transform: "translateY(-50%)",
                zIndex: 5,
                width: "38px",
                height: "38px",
              }}
              onClick={nextSlide}
            >
              <i className="bi bi-chevron-right text-white"></i>
            </button>
          </div>
        </div>
      </div>

      <style>{`
        /* Hover Animation */
        .card:hover {
          transform: scale(1.07) !important;
          box-shadow: 0 10px 25px rgba(0,0,0,0.3) !important;
        }

        /* Tablet */
        @media (max-width: 992px) {
          .card {
            flex: 0 0 45%;
          }
        }

        /* Mobile Center Card */
        @media (max-width: 576px) {
          .card {
            flex: 0 0 80%;
            margin: 0 auto;
          }
          .btn-primary.rounded-circle {
            width: 34px;
            height: 34px;
            top: 55%;
          }
        }
      `}</style>
    </section>



      {/* Make Your Own Package Component */}
      <MakeYourOwnPackage />

      {/* Statistics Section */}
      {/* <section className="py-5 bg-light">
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
      </section> */}

      {/* Ads Carousel */}
      {/* {ads.length > 0 && (
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
      )} */}

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
