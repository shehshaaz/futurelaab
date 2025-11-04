import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Star, Tag, TrendingUp, Heart } from "react-feather";

const SpecialOffers = () => {
  // Special offers data (same as in Home.jsx)
  const [specialOffers] = useState([
    {
      id: 1,
      title: "Premium Health Package",
      originalPrice: 2999,
      discountedPrice: 1999,
      discount: 33,
      badge: "PREMIUM",
      badgeColor: "premium",
      features: [
        "Complete Blood Count",
        "Lipid Profile",
        "Liver Function",
        "Kidney Function",
      ],
      description: "Comprehensive health screening for overall wellness",
      popular: true,
    },
    {
      id: 2,
      title: "Women's Wellness Special",
      originalPrice: 3499,
      discountedPrice: 2299,
      discount: 34,
      badge: "TRENDING",
      badgeColor: "trending",
      features: [
        "Hormonal Analysis",
        "Thyroid Profile",
        "Vitamin D",
        "Iron Studies",
      ],
      description: "Specialized health checkup designed for women's needs",
      popular: false,
    },
    {
      id: 3,
      title: "Cardiac Care Package",
      originalPrice: 2799,
      discountedPrice: 1899,
      discount: 32,
      badge: "NEW",
      badgeColor: "new",
      features: ["ECG", "2D Echo", "Lipid Profile", "Cardiac Risk Markers"],
      description: "Complete cardiovascular health assessment",
      popular: false,
    },
    {
      id: 4,
      title: "Diabetes Complete",
      originalPrice: 1899,
      discountedPrice: 1299,
      discount: 32,
      badge: "RECOMMENDED",
      badgeColor: "recommended",
      features: ["HbA1c", "Fasting Glucose", "Post Meal Glucose", "Insulin"],
      description: "Comprehensive diabetes monitoring package",
      popular: false,
    },
    {
      id: 5,
      title: "Senior Citizen Special",
      originalPrice: 4999,
      discountedPrice: 3499,
      discount: 30,
      badge: "POPULAR",
      badgeColor: "popular",
      features: [
        "Full Body Checkup",
        "Bone Health",
        "Cognitive Assessment",
        "Eye Screening",
      ],
      description: "Complete health package for seniors above 60",
      popular: false,
    },
    {
      id: 6,
      title: "Executive Health Checkup",
      originalPrice: 5999,
      discountedPrice: 3999,
      discount: 33,
      badge: "EXCLUSIVE",
      badgeColor: "exclusive",
      features: [
        "Advanced Imaging",
        "Stress Test",
        "Nutritional Analysis",
        "Health Consultation",
      ],
      description: "Premium executive health screening with consultation",
      popular: false,
    },
  ]);

  // Get badge class based on badge color
  const getBadgeClass = (badgeColor) => {
    switch (badgeColor) {
      case "premium":
        return "bg-warning text-dark";
      case "trending":
        return "bg-info text-white";
      case "new":
        return "bg-success text-white";
      case "recommended":
        return "bg-primary text-white";
      case "popular":
        return "bg-danger text-white";
      case "exclusive":
        return "bg-dark text-white";
      default:
        return "bg-secondary text-white";
    }
  };

  // Add to cart function (placeholder)
  const addToCart = (offerId) => {
    console.log(`Added offer ${offerId} to cart`);
    // In a real implementation, this would add the item to the cart
    alert(
      `Added ${specialOffers.find((o) => o.id === offerId)?.title} to cart!`
    );
  };

  return (
    <div className="special-offers-page py-5">
      <div className="container">
        {/* Page Header */}
        <div className="row mb-5">
          <div className="col-12 text-center">
            <h1 className="display-4 fw-bold mb-3">
              <span className="gradient-text">🎉 Special Offers</span>
            </h1>
            <p className="lead text-muted mb-4">
              Limited time deals on health checkups & lab tests - Save up to
              35%!
            </p>
            <div className="d-flex justify-content-center">
              <div className="badge bg-light text-dark me-2">
                <Tag className="me-1" size={16} />
                {specialOffers.length} Deals
              </div>
              <div className="badge bg-light text-dark">
                <TrendingUp className="me-1" size={16} />
                Updated Daily
              </div>
            </div>
          </div>
        </div>

        {/* Offers Grid */}
        <div className="row">
          {specialOffers.map((offer) => (
            <div key={offer.id} className="col-lg-6 col-md-6 col-sm-12 mb-4">
              <div className="card h-100 border-0 shadow-sm special-offer-card">
                <div className="card-body d-flex flex-column">
                  {/* Badge and Header */}
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <div>
                      <span
                        className={`badge ${getBadgeClass(
                          offer.badgeColor
                        )} mb-2`}
                      >
                        {offer.badge}
                      </span>
                      <h5 className="card-title mb-1">{offer.title}</h5>
                      {offer.popular && (
                        <div className="d-flex align-items-center">
                          <Star
                            size={14}
                            className="text-warning me-1"
                            fill="#ffc107"
                          />
                          <small className="text-muted">Most Popular</small>
                        </div>
                      )}
                    </div>
                    <button
                      className="btn btn-outline-danger btn-sm"
                      title="Add to wishlist"
                    >
                      <Heart size={16} />
                    </button>
                  </div>

                  {/* Description */}
                  <p className="card-text text-muted mb-3 flex-grow-1">
                    {offer.description}
                  </p>

                  {/* Features */}
                  <div className="mb-3">
                    <ul className="list-unstyled mb-0">
                      {offer.features.slice(0, 3).map((feature, index) => (
                        <li key={index} className="mb-1">
                          <span className="text-success me-2">✓</span>
                          <small>{feature}</small>
                        </li>
                      ))}
                      {offer.features.length > 3 && (
                        <li className="text-muted">
                          <small>
                            + {offer.features.length - 3} more tests
                          </small>
                        </li>
                      )}
                    </ul>
                  </div>

                  {/* Pricing */}
                  <div className="mt-auto">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <div>
                        <span className="h4 text-primary mb-0">
                          ₹{offer.discountedPrice}
                        </span>
                        <div className="d-flex align-items-center">
                          <del className="text-muted small me-2">
                            ₹{offer.originalPrice}
                          </del>
                          <span className="badge bg-success">
                            {offer.discount}% OFF
                          </span>
                        </div>
                      </div>
                      <div className="text-end">
                        <div className="text-muted small">You Save</div>
                        <div className="text-success fw-bold">
                          ₹{offer.originalPrice - offer.discountedPrice}
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="d-grid gap-2 d-md-flex justify-content-md-between">
                      <Link
                        to={`/product?id=${offer.id}&category=Special Offers`}
                        className="btn btn-outline-primary flex-fill me-md-2 mb-2 mb-md-0"
                      >
                        View Details
                      </Link>
                      <button
                        className="btn btn-primary flex-fill d-flex align-items-center justify-content-center"
                        onClick={() => addToCart(offer.id)}
                      >
                        <ShoppingCart size={16} className="me-1" />
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="row mt-5">
          <div className="col-12">
            <div className="card bg-gradient-primary text-white rounded-3">
              <div className="card-body p-4 text-center">
                <h3 className="card-title mb-3">
                  Don't Miss These Limited Time Offers!
                </h3>
                <p className="card-text mb-4">
                  These special offers are only available for a limited time.
                  Book your health checkup today and save up to 35% on
                  comprehensive health packages.
                </p>
                <Link to="/checkups" className="btn btn-light btn-lg">
                  View All Health Packages
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpecialOffers;
