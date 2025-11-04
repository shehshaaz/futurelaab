import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

const GoogleReviewsSection = () => {
  const [current, setCurrent] = useState(0);
  const [animationClass, setAnimationClass] = useState("");

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

  const total = reviews.length;

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

  const nextSlide = () => {
    if (current < total - 1) {
      setAnimationClass("slide-out-left");
      setTimeout(() => {
        setCurrent((prev) => prev + 1);
        setAnimationClass("slide-in-right");
      }, 250);
    }
  };

  const prevSlide = () => {
    if (current > 0) {
      setAnimationClass("slide-out-right");
      setTimeout(() => {
        setCurrent((prev) => prev - 1);
        setAnimationClass("slide-in-left");
      }, 250);
    }
  };

  return (
    <section className="py-5 bg-light">
      <div className="container text-center">
        {/* Heading */}
        {/* <h2
          className="fw-bold mb-4"
          style={{ color: "#FF7F50", fontSize: "1.5rem", textTransform: "uppercase" }}
        >
          "Happy People Reviews"
        </h2> */}

        {/* Rating Summary */}
        <div className="d-flex flex-column flex-md-row justify-content-center align-items-center mb-4">
          <div className="text-center text-md-start me-md-4">
            <h3 className="fw-bold text-dark mb-1" style={{ fontSize: "1rem" }}>
              High Rate Reviews on{" "}
              <span style={{ color: "#4285F4" }}>
             
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
          {/* Single Review Card with Animation */}
          <div
            key={`${reviews[current].id}-${current}`}
            className={`review-card bg-white p-4 rounded-4 shadow-sm text-start mx-auto animate-slide ${animationClass}`}
            style={{
              width: "100%",
              maxWidth: "350px",
              borderTop: "4px solid #34A853",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              minHeight: "250px",
            }}
          >
            <div className="d-flex align-items-center mb-3">
              <img
                src={reviews[current].image}
                alt={reviews[current].name}
                className="rounded-circle me-3"
                style={{
                  width: "50px",
                  height: "50px",
                  objectFit: "cover",
                }}
              />
              <h6 className="fw-bold mb-0">{reviews[current].name}</h6>
            </div>
            <div className="d-flex mb-2">{renderStars(reviews[current].rating)}</div>
            <p className="text-muted small mb-3">"{reviews[current].review}"</p>
            <a
              href="https://www.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary fw-semibold text-decoration-none"
            >
              View on Google
            </a>
          </div>

          {/* Navigation Arrows - positioned below the card */}
          <div className="d-flex justify-content-center align-items-center mt-4 w-100" style={{ minHeight: "60px" }}>
            <button
              className="btn btn-primary rounded-circle shadow me-3"
              style={{
                width: "45px",
                height: "45px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "rgba(0, 162, 173, 0.9)",
                border: "none",
              }}
              onClick={prevSlide}
              disabled={current === 0}
            >
              <ChevronLeft className="text-white" style={{ fontSize: "1.2rem" }} />
            </button>
            
            {/* Page Indicator */}
            <div className="d-flex align-items-center mx-3">
              {reviews.map((_, index) => (
                <span
                  key={index}
                  className={`rounded-circle mx-1 ${index === current ? 'bg-primary' : 'bg-secondary'}`}
                  style={{
                    width: "10px",
                    height: "10px",
                    opacity: index === current ? 1 : 0.5,
                  }}
                ></span>
              ))}
            </div>
            
            <button
              className="btn btn-primary rounded-circle shadow"
              style={{
                width: "45px",
                height: "45px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "rgba(0, 162, 173, 0.9)",
                border: "none",
              }}
              onClick={nextSlide}
              disabled={current === reviews.length - 1}
            >
              <ChevronRight className="text-white" style={{ fontSize: "1.2rem" }} />
            </button>
          </div>
        </div>
      </div>

      {/* Styling */}
      <style>{`
        /* Slide Animation */
        @keyframes slideInRight {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        
        @keyframes slideInLeft {
          from {
            transform: translateX(-100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        
        @keyframes slideOutLeft {
          from {
            transform: translateX(0);
            opacity: 1;
          }
          to {
            transform: translateX(-100%);
            opacity: 0;
          }
        }
        
        @keyframes slideOutRight {
          from {
            transform: translateX(0);
            opacity: 1;
          }
          to {
            transform: translateX(100%);
            opacity: 0;
          }
        }
        
        .animate-slide {
          animation: slideInRight 0.5s ease-out forwards;
        }
        
        .animate-slide.slide-out-left {
          animation: slideOutLeft 0.5s ease-out forwards;
        }
        
        .animate-slide.slide-out-right {
          animation: slideOutRight 0.5s ease-out forwards;
        }
        
        .animate-slide.slide-in-left {
          animation: slideInLeft 0.5s ease-out forwards;
        }

        .review-card:hover {
          transform: scale(1.02);
          box-shadow: 0 10px 20px rgba(0,0,0,0.15);
        }

        @media (max-width: 992px) {
          .review-card {
            max-width: 320px !important;
          }
        }

        @media (max-width: 768px) {
          .review-card {
            max-width: 280px !important;
          }
          
          button.btn-primary.rounded-circle {
            width: 40px !important;
            height: 40px !important;
          }
        }
        
        @media (max-width: 576px) {
          .review-card {
            max-width: calc(100vw - 60px) !important;
          }
          
          button.btn-primary.rounded-circle {
            width: 36px !important;
            height: 36px !important;
          }
        }
        
        @media (max-width: 400px) {
          .review-card {
            max-width: calc(100vw - 40px) !important;
          }
        }
      `}</style>
    </section>
  );
};

export default GoogleReviewsSection;