import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { AlertTriangle } from "lucide-react";
import apiService from "../utils/api";

const Product = () => {
  const [product, setProduct] = useState(null);
  const [banner, setBanner] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams] = useSearchParams();

  const productId = searchParams.get("id");
  const category = searchParams.get("category");

  useEffect(() => {
    if (!productId) {
      setLoading(false);
      setError("Product ID is required");
      return;
    }

    const fetchData = async () => {
      try {
        const [productResponse, bannerResponse] = await Promise.all([
          apiService.getTestById(productId),
          apiService.getRandomBanner(),
        ]);

        if (productResponse.success) {
          setProduct(productResponse.data);
        } else {
          setError("Failed to load product details");
        }

        if (bannerResponse.success) {
          setBanner(bannerResponse.data);
        }
      } catch (error) {
        console.error("Error fetching product data:", error);
        setError("Failed to load product data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [productId]);

  const addToCart = async () => {
    const userId = localStorage.getItem("userId") || "temp-user-id";
    if (!userId) {
      alert("Please login to add items to cart");
      return;
    }

    try {
      const response = await apiService.addToCart(userId, productId);

      if (response.success) {
        alert("Item added to cart successfully!");
      } else {
        setError(response.message || "Failed to add item to cart");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      setError("Error adding item to cart. Please try again.");
    }
  };

  const bookNow = () => {
    // Implement book now functionality
    alert("Book now functionality to be implemented");
  };

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          height: "100vh",
          marginTop: "100px",
        }}
      >
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-5">
        <div
          className="alert alert-danger d-flex align-items-center"
          role="alert"
        >
          <AlertTriangle className="me-2" />
          <div>{error}</div>
        </div>
        <button
          className="btn btn-primary mt-3"
          onClick={() => window.location.reload()}
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container py-5">
        <div className="text-center">
          <h4>Product not found</h4>
          <p>The requested product could not be found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="product-page">
      <div className="container py-5">
        {/* Product Header */}
        <div className="row mb-4">
          <div className="col-lg-8">
            <h1>{product.name}</h1>
            <p className="text-muted">{product.category}</p>
            <p>{product.description}</p>
          </div>
          <div className="col-lg-4">
            <div className="card">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <span className="h4 text-primary">₹{product.price}</span>
                  {product.originalPrice && (
                    <span className="text-muted">
                      <del>₹{product.originalPrice}</del>
                    </span>
                  )}
                </div>
                <button
                  className="btn btn-primary w-100 mb-2"
                  onClick={bookNow}
                >
                  Book Now
                </button>
                <button
                  className="btn btn-outline-primary w-100"
                  onClick={addToCart}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Banner */}
        {banner && (
          <div className="mb-4">
            <img
              className="adfor-product w-100"
              src={`${baseUrl}/${banner.imageUrl}`}
              alt="Product Banner"
            />
          </div>
        )}

        {/* Included Tests */}
        {product.includedTests && product.includedTests.length > 0 && (
          <div className="container my-4">
            <h2 className="included-h">Included Tests</h2>
            {product.includedTests.map((testCategory, index) => (
              <div key={index}>
                <div
                  className="dropdown-header"
                  data-bs-toggle="collapse"
                  data-bs-target={`#dropdownContent${index}`}
                >
                  <div className="d-flex align-items-center">
                    <img
                      className="drptst-icon"
                      src="/images/icon-svg/dropdown/liver (1).png"
                      alt="Icon"
                    />
                    <h5>{testCategory.category}</h5>
                  </div>
                  <i className="fa-solid fa-chevron-down drp-dwnicon"></i>
                </div>
                <ul
                  id={`dropdownContent${index}`}
                  className="collapse dropdown-content dropdown-ul"
                >
                  {testCategory.tests.map((test, testIndex) => (
                    <li key={testIndex}>{test}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {/* Additional Product Information */}
        <div className="row mt-5">
          <div className="col-lg-6">
            <h3>Test Information</h3>
            <div className="card">
              <div className="card-body">
                <h6>Sample Type:</h6>
                <p>{product.sampleType || "Blood"}</p>

                <h6>Fasting Required:</h6>
                <p>{product.fastingRequired ? "Yes" : "No"}</p>

                <h6>Report Time:</h6>
                <p>{product.reportTime || "24 hours"}</p>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <h3>Why Choose This Test?</h3>
            <div className="card">
              <div className="card-body">
                <ul>
                  <li>Accurate and reliable results</li>
                  <li>Home sample collection available</li>
                  <li>Quick report delivery</li>
                  <li>Expert consultation available</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
