import React, { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { AlertTriangle } from "lucide-react";
import apiService from "../utils/api";

const Checkups = () => {
  const [tabs, setTabs] = useState([]);
  const [activeTab, setActiveTab] = useState("");
  const [tabContent, setTabContent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const fetchTabs = async () => {
      try {
        const response = await apiService.getSelectedLessPrice();
        if (response.success && response.data) {
          setTabs(response.data);

          // Set active tab from URL parameter or first tab
          const tabFromUrl = searchParams.get("tab");
          const initialTab = tabFromUrl || response.data[0]?.name || "";
          setActiveTab(initialTab);

          if (initialTab) {
            fetchTabContent(initialTab);
          }
        }
      } catch (error) {
        console.error("Error fetching tabs:", error);
        setError("Failed to load categories. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchTabs();
  }, [searchParams]);

  const fetchTabContent = async (tabName) => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiService.getTestsByCategory(tabName);
      
      if (response.success && response.data) {
        setTabContent(response.data);
      } else {
        setTabContent([]);
        setError("No tests available in this category");
      }
    } catch (error) {
      console.error("Error fetching tab content:", error);
      setTabContent([]);
      setError("Failed to load tests. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
    fetchTabContent(tabName);

    // Update URL without page reload
    const newUrl = new URL(window.location);
    newUrl.searchParams.set("tab", tabName);
    window.history.pushState({}, "", newUrl);
  };

  const addToCart = async (testId) => {
    const userId = localStorage.getItem("userId") || "temp-user-id";
    if (!userId) {
      alert("Please login to add items to cart");
      return;
    }

    try {
      const response = await apiService.addToCart(userId, testId);

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

  if (loading && tabs.length === 0) {
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
        <div className="alert alert-danger d-flex align-items-center" role="alert">
          <AlertTriangle className="me-2" />
          <div>{error}</div>
        </div>
        <button className="btn btn-primary mt-3" onClick={() => window.location.reload()}>
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <h2 className="mb-4">Health Checkups</h2>
      
      {/* Tab Navigation */}
      <ul className="nav nav-tabs mb-4">
        {tabs.map((tab) => (
          <li className="nav-item" key={tab.name}>
            <button
              className={`nav-link ${activeTab === tab.name ? "active" : ""}`}
              onClick={() => handleTabClick(tab.name)}
            >
              {tab.name}
            </button>
          </li>
        ))}
      </ul>

      {/* Tab Content */}
      {loading ? (
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="row">
          {tabContent.map((test) => (
            <div className="col-md-6 col-lg-4 mb-4" key={test._id}>
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">{test.name}</h5>
                  <p className="card-text">{test.description}</p>
                  <p className="text-muted">Price: ₹{test.price}</p>
                  <button
                    className="btn btn-primary"
                    onClick={() => addToCart(test._id)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Checkups;