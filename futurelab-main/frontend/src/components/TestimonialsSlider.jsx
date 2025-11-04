import React, { useRef } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

const GoogleReviewsSection = () => {
  const scrollRef = useRef(null);

  const reviews = [
    {
      id: 1,
      name: "Kousha A",
      image: "https://i.pravatar.cc/100?img=12",
      rating: 5,
      review:
        "After a couple dreadful months of tolerating my lower back pain, their diagnostics really helped me find the issue quickly!",
    },
    {
      id: 2,
      name: "Jake",
      image: "https://i.pravatar.cc/100?img=3",
      rating: 5,
      review:
        "I have known Steven for a very long time. He is always friendly and professional with top-class service.",
    },
    {
      id: 3,
      name: "Ranqermo",
      image: "https://i.pravatar.cc/100?img=8",
      rating: 5,
      review:
        "I’ve been lucky to know Steven my entire life, and his team at the diagnostics center is simply the best!",
    },
    {
      id: 4,
      name: "Liam P",
      image: "https://i.pravatar.cc/100?img=15",
      rating: 5,
      review:
        "Excellent home sample collection and fast results. Totally recommended!",
    },
  ];

  const renderStars = (rating) =>
    Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`me-1 ${
          i < rating ? "text-warning fill-current" : "text-muted"
        }`}
        size={18}
      />
    ));

  const scroll = (direction) => {
    const { current } = scrollRef;
    if (current) {
      const cardWidth = current.firstChild.offsetWidth;
      current.scrollBy({
        left: direction === "left" ? -cardWidth : cardWidth,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="py-5 bg-light">
      <div className="container text-center">
        {/* Heading */}
        <h2
          className="fw-bold mb-4"
          style={{ color: "#FF7F50", fontSize: "1.8rem", textTransform: "uppercase" }}
        >
          "Happy People Reviews"
        </h2>

        {/* Rating Summary */}
        <div className="d-flex flex-column flex-md-row justify-content-center align-items-center mb-4">
          <div className="text-center text-md-start me-md-4">
            <h3 className="fw-bold text-dark mb-1" style={{ fontSize: "2rem" }}>
              High Rate{" "}
              <span style={{ color: "#4285F4" }}>
                Google Reviews{" "}
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/120px-Google_2015_logo.svg.png"
                  alt="Google Logo"
                  style={{
                    width: "90px",
                    height: "auto",
                    verticalAlign: "middle",
                    marginLeft: "5px",
                  }}
                />
              </span>
            </h3>
            <p className="text-secondary fw-semibold">
              Diagnostics Service with Home Sample Collection Facility
            </p>
          </div>
          <div className="d-flex align-items-center justify-content-center mt-3 mt-md-0">
            <div>
              <h1 className="fw-bold text-dark mb-0" style={{ fontSize: "3rem" }}>
                4.8
              </h1>
              <div className="d-flex justify-content-center">{renderStars(5)}</div>
            </div>
          </div>
        </div>

        {/* Carousel Container */}
        <div className="position-relative">
          {/* Left Arrow */}
          <button
            className="btn btn-light rounded-circle shadow position-absolute top-50 start-0 translate-middle-y"
            style={{ zIndex: 5 }}
            onClick={() => scroll("left")}
          >
            <ChevronLeft />
          </button>

          {/* Scrollable Row */}
          <div
            ref={scrollRef}
            className="d-flex overflow-auto gap-4 px-2 justify-content-center"
            style={{
              scrollBehavior: "smooth",
              scrollbarWidth: "none",
              padding: "0 2rem",
            }}
          >
            {reviews.map((review) => (
              <div
                key={review.id}
                className="review-card bg-white p-4 rounded-4 shadow-sm flex-shrink-0 text-start"
                style={{
                  width: "320px",
                  borderTop: "4px solid #34A853",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                }}
              >
                <div className="d-flex align-items-center mb-3">
                  <img
                    src={review.image}
                    alt={review.name}
                    className="rounded-circle me-3"
                    style={{
                      width: "50px",
                      height: "50px",
                      objectFit: "cover",
                    }}
                  />
                  <h6 className="fw-bold mb-0">{review.name}</h6>
                </div>
                <div className="d-flex mb-2">{renderStars(review.rating)}</div>
                <p className="text-muted small mb-3">"{review.review}"</p>
                <a
                  href="https://www.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary fw-semibold text-decoration-none"
                >
                  View on Google
                </a>
              </div>
            ))}
          </div>

          {/* Right Arrow */}
          <button
            className="btn btn-light rounded-circle shadow position-absolute top-50 end-0 translate-middle-y"
            style={{ zIndex: 5 }}
            onClick={() => scroll("right")}
          >
            <ChevronRight />
          </button>
        </div>
      </div>

      {/* Styling */}
      <style>{`
        .review-card {
          transform: scale(0.95);
          opacity: 0.9;
        }
        .review-card:hover {
          transform: scale(1);
          opacity: 1;
          box-shadow: 0 10px 20px rgba(0,0,0,0.15);
        }

        .overflow-auto::-webkit-scrollbar {
          display: none;
        }

        @media (max-width: 768px) {
          .review-card {
            width: 85% !important;
            margin: 0 auto;
          }
          button.btn-light {
            width: 40px !important;
            height: 40px !important;
            top: auto !important;
            bottom: -50px !important;
          }
          .position-absolute.start-0 {
            left: 30% !important;
          }
          .position-absolute.end-0 {
            right: 30% !important;
          }
        }
      `}</style>
    </section>
  );
};

export default GoogleReviewsSection;
