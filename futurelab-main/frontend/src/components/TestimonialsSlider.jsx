import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

const TestimonialsSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      image:
        "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      opinion:
        "The lab results were incredibly accurate and delivered on time. Their comprehensive blood panel helped me identify health issues early. Exceptional service and professional staff!",
    },
    {
      id: 2,
      name: "Michael Chen",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      opinion:
        "Fast, reliable, and affordable testing services. The online portal makes it easy to access results, and the detailed explanations help me understand my health better.",
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      image:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      rating: 4,
      opinion:
        "Great experience overall! The phlebotomist was gentle and professional. Results came back quickly with clear explanations. Will definitely use their services again.",
    },
    {
      id: 4,
      name: "Dr. Robert Kim",
      image:
        "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      opinion:
        "As a healthcare provider, I trust this lab for all my patient referrals. Their accuracy rate is outstanding and the turnaround time is consistently excellent.",
    },
    {
      id: 5,
      name: "Lisa Thompson",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      opinion:
        "The home collection service was a game-changer for me. Professional, convenient, and the results were delivered securely online. Highly recommend!",
    },
  ];

  // Auto-slide functionality
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) =>
        prevSlide === testimonials.length - 1 ? 0 : prevSlide + 1
      );
    }, 5000);

    return () => clearInterval(timer);
  }, [testimonials.length]);

  const nextSlide = () => {
    setCurrentSlide(
      currentSlide === testimonials.length - 1 ? 0 : currentSlide + 1
    );
  };

  const prevSlide = () => {
    setCurrentSlide(
      currentSlide === 0 ? testimonials.length - 1 : currentSlide - 1
    );
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-5 h-5 ${
          index < rating ? "text-yellow-400 fill-current" : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <div className="py-5 bg-light testimonial-slider">
      <div className="container">
        <div className="text-center mb-4">
          <h2 className="display-6 fw-bold text-dark mb-3">
            What Our Patients Say
          </h2>
          <p className="text-muted lead">
            Trusted by thousands for accurate and reliable lab testing
          </p>
        </div>

        <div className="position-relative bg-white rounded shadow-sm overflow-hidden p-4">
          <div className="position-relative" style={{ height: "400px" }}>
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className={`position-absolute top-0 start-0 w-100 h-100 testimonial-slide ${
                  index === currentSlide ? "opacity-100" : "opacity-0"
                }`}
                style={{
                  transform:
                    index === currentSlide
                      ? "translateX(0)"
                      : index < currentSlide
                      ? "translateX(-100%)"
                      : "translateX(100%)",
                }}
              >
                <div className="h-100 d-flex flex-column flex-md-row align-items-center justify-content-center p-4">
                  <div className="flex-shrink-0 mb-4 mb-md-0 me-md-4">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="rounded-circle border border-success shadow"
                      style={{
                        width: "120px",
                        height: "120px",
                        objectFit: "cover",
                      }}
                    />
                  </div>

                  <div className="flex-grow-1 text-center text-md-start">
                    <div className="d-flex justify-content-center justify-content-md-start mb-3">
                      {renderStars(testimonial.rating)}
                    </div>

                    <blockquote className="text-dark fs-5 mb-4 fst-italic">
                      "{testimonial.opinion}"
                    </blockquote>

                    <div className="text-center text-md-start">
                      <h4 className="fw-bold text-dark fs-4">
                        {testimonial.name}
                      </h4>
                      <p className="text-success fw-medium mb-0">
                        Verified Patient
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="position-absolute top-50 start-0 translate-middle-y btn rounded-circle shadow testimonial-nav-btn"
            style={{ left: "10px" }}
          >
            <ChevronLeft size={24} />
          </button>

          <button
            onClick={nextSlide}
            className="position-absolute top-50 end-0 translate-middle-y btn rounded-circle shadow testimonial-nav-btn"
            style={{ right: "10px" }}
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Dots Indicator */}
        <div className="d-flex justify-content-center gap-2 mt-4 testimonial-indicators">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`btn rounded-circle p-2 indicator ${
                index === currentSlide ? "bg-success" : "bg-secondary"
              }`}
              style={{ width: "12px", height: "12px" }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialsSlider;
