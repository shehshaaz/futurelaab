import React, { useState, useEffect } from "react";
import {
  Plus,
  Home,
  Percent,
  Phone,
  MessageCircle,
  ShoppingCart,
  X,
  Star,
  Heart,
  Share,
  Filter,
  Search,
  Bell,
  User,
  ChevronDown,
  CheckCircle,
  Clock,
  MapPin,
} from "lucide-react";
import apiService from "../utils/api";

const InteractiveHealthApp = () => {
  const [activeTab, setActiveTab] = useState("Home");
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Full Body Checku");
  const [showModal, setShowModal] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [showCart, setShowCart] = useState(false);
  const [showZoomedCard, setShowZoomedCard] = useState(false);
  const [zoomedService, setZoomedService] = useState(null);
  const [showPatientModal, setShowPatientModal] = useState(false);
  const [selectedServiceForPatient, setSelectedServiceForPatient] =
    useState(null);
  const [selectedPatients, setSelectedPatients] = useState([]);
  const [patients, setPatients] = useState([
    { id: 1, name: "Salman", age: 32, gender: "M" },
    { id: 2, name: "Aishwarya", age: 26, gender: "F" },
    { id: 3, name: "Mohan Lal", age: 56, gender: "M" },
    { id: 4, name: "Patient 4", age: 28, gender: "F" },
    { id: 5, name: "Patient 5", age: 45, gender: "M" },
  ]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState("price");
  const [priceRange, setPriceRange] = useState([0, 2000]);
  const [userProfile, setUserProfile] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState("");
  const [services, setServices] = useState([]);
  const [categories, setCategories] = useState([]);

  // Fetch services and categories from backend
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch services based on selected category
        const servicesResponse = await apiService.getTestsByCategory(
          selectedCategory
        );
        if (servicesResponse.success) {
          setServices(servicesResponse.data || []);
        }

        // Fetch categories
        const categoriesResponse = await apiService.getCategories();
        if (categoriesResponse.success) {
          setCategories(categoriesResponse.data || []);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        // Fallback to mock data if API fails
        setServices([
          {
            id: 1,
            title: "Complete Full Body Health Checkup Premium Package",
            shortTitle: "Full Body Checkup Premium",
            discount: "50% OFF",
            originalPrice: 1299,
            currentPrice: 599,
            reportTime: "15 Hours",
            rating: 4.8,
            reviews: 1250,
            profileImage:
              "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=80&h=80&fit=crop&crop=face",
            doctorName: "Dr. Sarah Wilson",
            category: "full-body",
            tests: 45,
            location: "Downtown Clinic",
            description:
              "Comprehensive health screening with advanced diagnostics including blood work, imaging, and consultation.",
            features: [
              "Blood Tests (25)",
              "X-Ray",
              "ECG",
              "Doctor Consultation",
              "Digital Report",
            ],
            popular: true,
          },
          {
            id: 2,
            title: "Advanced Full Body Checkup with Cardiac Screening",
            shortTitle: "Full Body + Cardiac",
            discount: "35% OFF",
            originalPrice: 1299,
            currentPrice: 999,
            reportTime: "12 Hours",
            rating: 4.6,
            reviews: 890,
            profileImage:
              "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=80&h=80&fit=crop&crop=face",
            doctorName: "Dr. Michael Chen",
            category: "full-body",
            tests: 38,
            location: "Central Hospital",
            description:
              "Specialized checkup focusing on cardiovascular health along with general wellness parameters.",
            features: [
              "Cardiac Tests",
              "Blood Profile",
              "Stress Test",
              "Echo",
              "Report Analysis",
            ],
          },
          {
            id: 3,
            title: "Executive Health Checkup Platinum Package",
            shortTitle: "Executive Platinum",
            discount: "25% OFF",
            originalPrice: 1299,
            currentPrice: 1699,
            reportTime: "24 Hours",
            rating: 4.9,
            reviews: 2100,
            profileImage:
              "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=80&h=80&fit=crop&crop=face",
            doctorName: "Dr. Emily Rodriguez",
            category: "full-body",
            tests: 65,
            location: "Premium Care Center",
            description:
              "Ultimate health assessment for executives with comprehensive testing and personalized consultation.",
            features: [
              "Full Body MRI",
              "Genetic Testing",
              "Nutrition Plan",
              "VIP Consultation",
              "Annual Follow-up",
            ],
            premium: true,
          },
        ]);

        setCategories([
          {
            id: "full-body",
            name: "Full Body Checku",
            image:
              "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=200&h=200&fit=crop",
            bgColor: "linear-gradient(135deg, #fce7f3 0%, #fbcfe8 100%)",
            count: 12,
          },
          {
            id: "cardiac",
            name: "Cardiac",
            image:
              "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=200&h=200&fit=crop",
            bgColor: "linear-gradient(135deg, #fce7f3 0%, #fbcfe8 100%)",
            count: 12,
          },
          {
            id: "executive",
            name: "Executive",
            image:
              "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=200&h=200&fit=crop",
            bgColor: "linear-gradient(135deg, #fce7f3 0%, #fbcfe8 100%)",
            count: 12,
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedCategory]);

  const healthCategories = [
    {
      id: "full-body",
      name: "Full Body Checkup",
      image:
        "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=200&h=200&fit=crop",
      bgColor: "linear-gradient(135deg, #fce7f3 0%, #fbcfe8 100%)",
      count: 12,
    },
    {
      id: "diabetes",
      name: "Diabetes",
      image:
        "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=200&h=200&fit=crop",
      bgColor: "linear-gradient(135deg, #fed7aa 0%, #fdba74 100%)",
      count: 8,
    },
    {
      id: "thyroid",
      name: "Thyroid",
      image:
        "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=200&h=200&fit=crop",
      bgColor: "linear-gradient(135deg, #bbf7d0 0%, #86efac 100%)",
      count: 6,
    },
  ];

  // Show toast notification
  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(""), 3000);
  };

  // Show zoomed card
  const showZoomedCardModal = (service) => {
    setZoomedService(service);
    setShowZoomedCard(true);
  };

  // Show patient selection modal
  const showPatientSelection = (service) => {
    setSelectedServiceForPatient(service);
    setSelectedPatients([]);
    setShowPatientModal(true);
  };

  // Toggle patient selection
  const togglePatientSelection = (patientId) => {
    setSelectedPatients((prev) =>
      prev.includes(patientId)
        ? prev.filter((id) => id !== patientId)
        : [...prev, patientId]
    );
  };

  // Confirm patient selection and add to cart
  const confirmPatientSelection = () => {
    if (selectedPatients.length > 0 && selectedServiceForPatient) {
      selectedPatients.forEach((patientId) => {
        const patient = patients.find((p) => p.id === patientId);
        const cartItem = {
          ...selectedServiceForPatient,
          patientInfo: patient,
          id: `${selectedServiceForPatient.id}-${patientId}`, // Unique ID for each patient
          quantity: 1,
        };
        setCart((prev) => [...prev, cartItem]);
      });
      setShowPatientModal(false);
      showToast(`Service added for ${selectedPatients.length} patient(s)`);
      setSelectedPatients([]);
    } else {
      showToast("Please select at least one patient");
    }
  };

  // Add to cart with animation
  const addToCart = (service) => {
    // Show patient selection modal instead of direct add
    showPatientSelection(service);
  };

  // Toggle favorites
  const toggleFavorite = (serviceId) => {
    setFavorites((prev) =>
      prev.includes(serviceId)
        ? prev.filter((id) => id !== serviceId)
        : [...prev, serviceId]
    );
    showToast(
      favorites.includes(serviceId)
        ? "Removed from favorites"
        : "Added to favorites"
    );
  };

  // Remove from cart
  const removeFromCart = (serviceId) => {
    setCart((prev) => prev.filter((item) => item.id !== serviceId));
    showToast("Item removed from cart");
  };

  // Update cart quantity
  const updateQuantity = (serviceId, newQuantity) => {
    if (newQuantity === 0) {
      removeFromCart(serviceId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.id === serviceId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Calculate total
  const cartTotal = cart.reduce(
    (sum, item) => sum + item.currentPrice * item.quantity,
    0
  );
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Filter and sort services
  const filteredServices = services
    .filter((service) =>
      selectedCategory === "Full Body Checku"
        ? service.category === "full-body"
        : true
    )
    .filter(
      (service) =>
        service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.doctorName.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter(
      (service) =>
        service.currentPrice >= priceRange[0] &&
        service.currentPrice <= priceRange[1]
    )
    .sort((a, b) => {
      switch (sortBy) {
        case "price":
          return a.currentPrice - b.currentPrice;
        case "rating":
          return b.rating - a.rating;
        case "popular":
          return b.reviews - a.reviews;
        default:
          return 0;
      }
    });

  // Navigation with haptic feedback simulation
  const handleNavigation = (navItem) => {
    setActiveTab(navItem.key);

    // Simulate haptic feedback
    if (navigator.vibrate) {
      navigator.vibrate(50);
    }

    switch (navItem.key) {
      case "Call":
        window.open("tel:+1234567890", "_self");
        break;
      case "WhatsApp":
        window.open("https://wa.me/1234567890", "_blank");
        showToast("Opening WhatsApp...");
        break;
      case "Orders":
        setShowCart(true);
        break;
      case "Offer":
        showToast("Check out our special offers!");
        break;
      default:
        break;
    }
  };

  // Auto-hide toast
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f9fafb 0%, #e0f2fe 100%)",
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      }}
    >
      {/* Header */}
      {/* <div style={{
        position: 'sticky',
        top: 0,
        background: 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(20px)',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        zIndex: 40,
        borderBottom: '1px solid #e5e7eb'
      }}>
        <div style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '12px 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '32px',
              height: '32px',
              background: 'linear-gradient(45deg, #14b8a6, #3b82f6)',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Heart size={20} color="white" />
            </div>
            <h1 style={{
              fontSize: '20px',
              fontWeight: 'bold',
              color: '#1f2937',
              margin: 0
            }}>HealthCare+</h1>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button style={{
              position: 'relative',
              padding: '8px',
              color: '#6b7280',
              borderRadius: '8px',
              border: 'none',
              background: 'transparent',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
            onMouseOver={(e) => e.target.style.background = '#f3f4f6'}
            onMouseOut={(e) => e.target.style.background = 'transparent'}>
              <Bell size={20} />
              <span style={{
                position: 'absolute',
                top: '-4px',
                right: '-4px',
                width: '12px',
                height: '12px',
                background: '#ef4444',
                borderRadius: '50%'
              }}></span>
            </button>
            <button style={{
              padding: '4px',
              borderRadius: '50%',
              border: '2px solid #a7f3d0',
              background: 'transparent',
              cursor: 'pointer',
              transition: 'border-color 0.2s'
            }}
            onMouseOver={(e) => e.target.style.borderColor = '#6ee7b7'}
            onMouseOut={(e) => e.target.style.borderColor = '#a7f3d0'}>
              <img 
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face"
                style={{ width: '32px', height: '32px', borderRadius: '50%' }}
                alt="Profile"
              />
            </button>
          </div>
        </div>
      </div> */}

      {/* Search and Filters */}
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "16px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: window.innerWidth < 640 ? "column" : "row",
            gap: "12px",
            marginBottom: "24px",
          }}
        >
          <div
            style={{
              position: "relative",
              flex: 1,
            }}
          >
            <Search
              size={20}
              style={{
                position: "absolute",
                left: "12px",
                top: "50%",
                transform: "translateY(-50%)",
                color: "#9ca3af",
              }}
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search services or doctors..."
              style={{
                width: "100%",
                paddingLeft: "40px",
                paddingRight: "16px",
                paddingTop: "12px",
                paddingBottom: "12px",
                borderRadius: "12px",
                border: "1px solid #e5e7eb",
                outline: "none",
                transition: "all 0.2s",
                fontSize: "14px",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "#14b8a6";
                e.target.style.boxShadow = "0 0 0 3px rgba(20, 184, 166, 0.1)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#e5e7eb";
                e.target.style.boxShadow = "none";
              }}
            />
          </div>
          <button
            style={{
              padding: "12px 16px",
              background: "white",
              border: "1px solid #e5e7eb",
              borderRadius: "12px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              transition: "background 0.2s",
            }}
            onMouseOver={(e) => (e.target.style.background = "#f9fafb")}
            onMouseOut={(e) => (e.target.style.background = "white")}
          >
            <Filter size={18} />
            <span>Filter</span>
          </button>
        </div>

        {/* Categories */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
            gap: "16px",
            maxWidth: "600px",
            margin: "0 auto 32px",
          }}
        >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.name)}
              style={{
                padding: "16px",
                borderRadius: "16px",
                border:
                  selectedCategory === category.name
                    ? "2px solid #14b8a6"
                    : "none",
                background: "white",
                cursor: "pointer",
                transition: "all 0.3s",
                transform:
                  selectedCategory === category.name
                    ? "scale(1.05)"
                    : "scale(1)",
                boxShadow:
                  selectedCategory === category.name
                    ? "0 10px 25px rgba(0,0,0,0.1)"
                    : "0 2px 4px rgba(0,0,0,0.05)",
              }}
              onMouseOver={(e) => {
                if (selectedCategory !== category.name) {
                  e.target.style.transform = "scale(1.02)";
                  e.target.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)";
                }
              }}
              onMouseOut={(e) => {
                if (selectedCategory !== category.name) {
                  e.target.style.transform = "scale(1)";
                  e.target.style.boxShadow = "0 2px 4px rgba(0,0,0,0.05)";
                }
              }}
            >
              <div
                style={{
                  width: "80px",
                  height: "80px",
                  borderRadius: "50%",
                  background: category.bgColor,
                  margin: "0 auto 12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <img
                  src={category.image}
                  alt={category.name}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "50%",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    top: "4px",
                    right: "4px",
                    background: "#14b8a6",
                    color: "white",
                    fontSize: "10px",
                    fontWeight: "bold",
                    borderRadius: "50%",
                    width: "20px",
                    height: "20px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {category.count}
                </div>
              </div>
              <h3
                style={{
                  fontSize: "14px",
                  fontWeight: "600",
                  color: "#047857",
                  textAlign: "center",
                  margin: 0,
                }}
              >
                {category.name}
              </h3>
            </button>
          ))}
        </div>

        {/* Services Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "24px",
            paddingBottom: "100px",
          }}
        >
          {filteredServices.map((service) => (
            <div
              key={service.id}
              onClick={() => showZoomedCardModal(service)}
              style={{
                background: "white",
                borderRadius: "16px",
                border: "1px solid #e5e7eb",
                boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                overflow: "hidden",
                transition: "all 0.3s",
                cursor: "pointer",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow =
                  "0 20px 25px rgba(0,0,0,0.15)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.1)";
              }}
            >
              {/* Service Header */}
              <div
                style={{
                  padding: "24px",
                  paddingBottom: "16px",
                  position: "relative",
                }}
              >
                {service.popular && (
                  <div
                    style={{
                      position: "absolute",
                      top: "16px",
                      right: "16px",
                      background: "linear-gradient(45deg, #f97316, #ec4899)",
                      color: "white",
                      fontSize: "10px",
                      fontWeight: "bold",
                      padding: "4px 8px",
                      borderRadius: "12px",
                    }}
                  >
                    Popular
                  </div>
                )}
                {service.premium && (
                  <div
                    style={{
                      position: "absolute",
                      top: "16px",
                      right: "16px",
                      background: "linear-gradient(45deg, #8b5cf6, #6366f1)",
                      color: "white",
                      fontSize: "10px",
                      fontWeight: "bold",
                      padding: "4px 8px",
                      borderRadius: "12px",
                    }}
                  >
                    Premium
                  </div>
                )}

                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "16px",
                  }}
                >
                  <div style={{ position: "relative" }}>
                    <img
                      src={service.profileImage}
                      alt={service.doctorName}
                      style={{
                        width: "64px",
                        height: "64px",
                        borderRadius: "50%",
                        objectFit: "cover",
                        border: "4px solid white",
                        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                      }}
                    />
                    <div
                      style={{
                        position: "absolute",
                        bottom: "-4px",
                        right: "-4px",
                        width: "20px",
                        height: "20px",
                        background: "#10b981",
                        border: "2px solid white",
                        borderRadius: "50%",
                      }}
                    ></div>
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <h3
                      style={{
                        fontSize: "18px",
                        fontWeight: "600",
                        color: "#1f2937",
                        margin: "0 0 4px 0",
                        lineHeight: "1.3",
                      }}
                    >
                      {service.shortTitle}
                    </h3>
                    <p
                      style={{
                        fontSize: "14px",
                        color: "#6b7280",
                        margin: "0 0 8px 0",
                      }}
                    >
                      {service.doctorName}
                    </p>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                        fontSize: "12px",
                        color: "#6b7280",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "4px",
                        }}
                      >
                        <Star size={16} fill="#fbbf24" color="#fbbf24" />
                        <span style={{ fontWeight: "500" }}>
                          {service.rating}
                        </span>
                        <span>({service.reviews})</span>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "4px",
                        }}
                      >
                        <MapPin size={16} />
                        <span>{service.location}</span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(service.id);
                    }}
                    style={{
                      padding: "8px",
                      borderRadius: "50%",
                      border: "none",
                      background: favorites.includes(service.id)
                        ? "#fef2f2"
                        : "transparent",
                      color: favorites.includes(service.id)
                        ? "#ef4444"
                        : "#9ca3af",
                      cursor: "pointer",
                      transition: "all 0.2s",
                    }}
                  >
                    <Heart
                      size={18}
                      fill={
                        favorites.includes(service.id) ? "currentColor" : "none"
                      }
                    />
                  </button>
                </div>
              </div>

              {/* Service Details */}
              <div style={{ padding: "0 24px 24px" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: "16px",
                  }}
                >
                  <span
                    style={{
                      display: "inline-block",
                      padding: "4px 12px",
                      fontSize: "12px",
                      fontWeight: "500",
                      color: "#dc2626",
                      background: "#fef2f2",
                      border: "1px solid #fecaca",
                      borderRadius: "20px",
                    }}
                  >
                    {service.discount}
                  </span>
                  <div style={{ textAlign: "right" }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "16px",
                          color: "#9ca3af",
                          textDecoration: "line-through",
                        }}
                      >
                        ₹{service.originalPrice}
                      </span>
                      <span
                        style={{
                          fontSize: "24px",
                          fontWeight: "bold",
                          color: "#ef4444",
                        }}
                      >
                        ₹{service.currentPrice}
                      </span>
                    </div>
                  </div>
                </div>

                <p
                  style={{
                    fontSize: "14px",
                    color: "#6b7280",
                    marginBottom: "16px",
                    lineHeight: "1.5",
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {service.description}
                </p>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    fontSize: "12px",
                    color: "#6b7280",
                    marginBottom: "16px",
                  }}
                >
                  <span>{service.tests} tests included</span>
                  {service.reportTime && (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                      }}
                    >
                      <Clock size={16} />
                      <span>Report in {service.reportTime}</span>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div style={{ display: "flex", gap: "12px" }}>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedService(service);
                      setShowModal(true);
                    }}
                    style={{
                      flex: 1,
                      padding: "12px 16px",
                      background: "#374151",
                      color: "white",
                      fontWeight: "500",
                      borderRadius: "12px",
                      border: "none",
                      cursor: "pointer",
                      transition: "all 0.2s",
                    }}
                    onMouseOver={(e) => (e.target.style.background = "#1f2937")}
                    onMouseOut={(e) => (e.target.style.background = "#374151")}
                  >
                    Know More
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      showPatientSelection(service);
                    }}
                    disabled={loading}
                    style={{
                      flex: 1,
                      padding: "12px 16px",
                      background: loading
                        ? "#9ca3af"
                        : "linear-gradient(45deg, #14b8a6, #3b82f6)",
                      color: "white",
                      fontWeight: "500",
                      borderRadius: "12px",
                      border: "none",
                      cursor: loading ? "not-allowed" : "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "8px",
                      transition: "all 0.2s",
                    }}
                  >
                    {loading ? (
                      <div
                        style={{
                          width: "20px",
                          height: "20px",
                          border: "2px solid white",
                          borderTop: "2px solid transparent",
                          borderRadius: "50%",
                          animation: "spin 1s linear infinite",
                        }}
                      ></div>
                    ) : (
                      <>
                        <Plus size={18} />
                        <span>Add</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Patient Selection Modal */}
      {showPatientModal && selectedServiceForPatient && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0, 0, 0, 0.6)",
            backdropFilter: "blur(4px)",
            zIndex: 60,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
          }}
          onClick={() => setShowPatientModal(false)}
        >
          <div
            style={{
              background: "white",
              borderRadius: "16px",
              width: "100%",
              maxWidth: "400px",
              maxHeight: "80vh",
              overflowY: "auto",
              animation: "slideUp 0.3s ease-out",
              boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div
              style={{
                background: "#22c55e",
                padding: "16px 20px",
                borderRadius: "16px 16px 0 0",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                color: "white",
              }}
            >
              <h2
                style={{
                  fontSize: "16px",
                  fontWeight: "bold",
                  margin: 0,
                }}
              >
                Select Patient(s)
              </h2>
              <button
                onClick={() => setShowPatientModal(false)}
                style={{
                  background: "rgba(255, 255, 255, 0.2)",
                  border: "none",
                  borderRadius: "50%",
                  width: "32px",
                  height: "32px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  transition: "background 0.2s",
                }}
                onMouseOver={(e) =>
                  (e.target.style.background = "rgba(255, 255, 255, 0.3)")
                }
                onMouseOut={(e) =>
                  (e.target.style.background = "rgba(255, 255, 255, 0.2)")
                }
              >
                <X size={18} color="white" />
              </button>
            </div>

            {/* Service Name */}
            <div
              style={{
                padding: "16px 20px 8px",
                borderBottom: "1px solid #f3f4f6",
              }}
            >
              <h3
                style={{
                  fontSize: "16px",
                  fontWeight: "600",
                  color: "#1f2937",
                  margin: "0 0 4px 0",
                }}
              >
                {selectedServiceForPatient.shortTitle}
              </h3>
              <p
                style={{
                  fontSize: "14px",
                  color: "#6b7280",
                  margin: 0,
                }}
              >
                ₹{selectedServiceForPatient.currentPrice} •{" "}
                {selectedServiceForPatient.reportTime}
              </p>
            </div>

            {/* Patient List */}
            <div style={{ padding: "16px 20px" }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                }}
              >
                {patients.map((patient, index) => (
                  <div
                    key={patient.id}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "12px 0",
                      borderBottom:
                        index < patients.length - 1
                          ? "1px solid #f3f4f6"
                          : "none",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "16px",
                          fontWeight: "500",
                          color: "#374151",
                          minWidth: "20px",
                        }}
                      >
                        {index + 1}
                      </span>
                      <div>
                        <div
                          style={{
                            fontSize: "16px",
                            fontWeight: "600",
                            color: "#1f2937",
                          }}
                        >
                          {patient.name} {patient.age} / {patient.gender}
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => togglePatientSelection(patient.id)}
                      style={{
                        width: "24px",
                        height: "24px",
                        borderRadius: "50%",
                        border: selectedPatients.includes(patient.id)
                          ? "none"
                          : "2px solid #d1d5db",
                        background: selectedPatients.includes(patient.id)
                          ? "#ef4444"
                          : "white",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        transition: "all 0.2s",
                      }}
                    >
                      {selectedPatients.includes(patient.id) && (
                        <CheckCircle size={16} color="white" />
                      )}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div
              style={{
                padding: "16px 20px",
                borderTop: "1px solid #f3f4f6",
                display: "flex",
                gap: "12px",
              }}
            >
              <button
                onClick={() => {
                  setSelectedPatients([]);
                  setShowPatientModal(false);
                }}
                style={{
                  padding: "12px 20px",
                  background: "#ef4444",
                  color: "white",
                  fontSize: "14px",
                  fontWeight: "600",
                  borderRadius: "8px",
                  border: "none",
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
                onMouseOver={(e) => (e.target.style.background = "#dc2626")}
                onMouseOut={(e) => (e.target.style.background = "#ef4444")}
              >
                ADD / EDIT
              </button>
              <button
                onClick={confirmPatientSelection}
                disabled={selectedPatients.length === 0}
                style={{
                  flex: 1,
                  padding: "12px 20px",
                  background:
                    selectedPatients.length > 0 ? "#1e3a8a" : "#9ca3af",
                  color: "white",
                  fontSize: "16px",
                  fontWeight: "600",
                  borderRadius: "8px",
                  border: "none",
                  cursor:
                    selectedPatients.length > 0 ? "pointer" : "not-allowed",
                  transition: "all 0.2s",
                }}
                onMouseOver={(e) => {
                  if (selectedPatients.length > 0) {
                    e.target.style.background = "#1e40af";
                  }
                }}
                onMouseOut={(e) => {
                  if (selectedPatients.length > 0) {
                    e.target.style.background = "#1e3a8a";
                  }
                }}
              >
                Confirm
              </button>
            </div>

            {/* Selection Info */}
            <div
              style={{
                padding: "8px 20px 16px",
                textAlign: "center",
              }}
            >
              <small
                style={{
                  color: "#ef4444",
                  fontSize: "12px",
                }}
              >
                (Select/Deselect)
              </small>
            </div>
          </div>
        </div>
      )}

      {/* Zoomed Card Modal */}
      {showZoomedCard && zoomedService && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0, 0, 0, 0.8)",
            backdropFilter: "blur(8px)",
            zIndex: 60,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
            animation: "fadeIn 0.3s ease-out",
          }}
          onClick={() => setShowZoomedCard(false)}
        >
          <div
            style={{
              background: "white",
              borderRadius: "20px",
              width: "100%",
              maxWidth: "450px",
              transform: "scale(1.05)",
              animation: "zoomIn 0.4s ease-out",
              boxShadow: "0 25px 50px rgba(0,0,0,0.25)",
              border: "2px solid #f3f4f6",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setShowZoomedCard(false)}
              style={{
                position: "absolute",
                top: "15px",
                right: "15px",
                width: "35px",
                height: "35px",
                borderRadius: "50%",
                background: "rgba(255, 255, 255, 0.9)",
                border: "1px solid #e5e7eb",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 10,
                transition: "all 0.2s",
                boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
              }}
              onMouseOver={(e) => {
                e.target.style.background = "#f3f4f6";
                e.target.style.transform = "scale(1.1)";
              }}
              onMouseOut={(e) => {
                e.target.style.background = "rgba(255, 255, 255, 0.9)";
                e.target.style.transform = "scale(1)";
              }}
            >
              <X size={18} color="#6b7280" />
            </button>

            {/* Card Content - Exact replica of the original card design */}
            <div style={{ padding: "30px 25px" }}>
              {/* Header Section */}
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "15px",
                  marginBottom: "20px",
                }}
              >
                <img
                  src={zoomedService.profileImage}
                  alt={zoomedService.doctorName}
                  style={{
                    width: "70px",
                    height: "70px",
                    borderRadius: "50%",
                    objectFit: "cover",
                    border: "3px solid #e5e7eb",
                    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                  }}
                />
                <div style={{ flex: 1 }}>
                  <h2
                    style={{
                      fontSize: "22px",
                      fontWeight: "bold",
                      color: "#047857",
                      margin: "0 0 8px 0",
                      lineHeight: "1.3",
                    }}
                  >
                    {zoomedService.shortTitle}
                  </h2>
                </div>
              </div>

              {/* Discount Badge */}
              <div style={{ marginBottom: "20px" }}>
                <span
                  style={{
                    display: "inline-block",
                    padding: "8px 16px",
                    fontSize: "14px",
                    fontWeight: "600",
                    color: "#dc2626",
                    background: "#fef2f2",
                    border: "2px solid #fecaca",
                    borderRadius: "25px",
                    letterSpacing: "0.5px",
                  }}
                >
                  {zoomedService.discount}
                </span>
              </div>

              {/* Pricing Section */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "25px",
                }}
              >
                <span
                  style={{
                    fontSize: "18px",
                    color: "#6b7280",
                    textDecoration: "line-through",
                    fontWeight: "500",
                  }}
                >
                  ₹{zoomedService.originalPrice}
                </span>
                <span
                  style={{
                    fontSize: "36px",
                    fontWeight: "bold",
                    color: "#ef4444",
                    letterSpacing: "-1px",
                  }}
                >
                  ₹{zoomedService.currentPrice}
                </span>
              </div>

              {/* Know More Button */}
              <div style={{ marginBottom: "20px" }}>
                <button
                  onClick={() => {
                    setSelectedService(zoomedService);
                    setShowModal(true);
                    setShowZoomedCard(false);
                  }}
                  style={{
                    width: "140px",
                    padding: "14px 20px",
                    background: "#1e3a8a",
                    color: "white",
                    fontSize: "16px",
                    fontWeight: "600",
                    borderRadius: "10px",
                    border: "none",
                    cursor: "pointer",
                    transition: "all 0.2s",
                    boxShadow: "0 4px 12px rgba(30, 58, 138, 0.3)",
                  }}
                  onMouseOver={(e) => {
                    e.target.style.background = "#1e40af";
                    e.target.style.transform = "translateY(-2px)";
                    e.target.style.boxShadow =
                      "0 6px 16px rgba(30, 58, 138, 0.4)";
                  }}
                  onMouseOut={(e) => {
                    e.target.style.background = "#1e3a8a";
                    e.target.style.transform = "translateY(0)";
                    e.target.style.boxShadow =
                      "0 4px 12px rgba(30, 58, 138, 0.3)";
                  }}
                >
                  Know More
                </button>
              </div>

              {/* Bottom Section */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingTop: "20px",
                  borderTop: "1px solid #f3f4f6",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  {zoomedService.reportTime && (
                    <>
                      <span
                        style={{
                          fontSize: "16px",
                          color: "#6b7280",
                          fontWeight: "500",
                        }}
                      >
                        Report in
                      </span>
                      <span
                        style={{
                          padding: "6px 12px",
                          fontSize: "14px",
                          fontWeight: "600",
                          color: "#047857",
                          background: "#f0fdfa",
                          border: "2px solid #a7f3d0",
                          borderRadius: "20px",
                        }}
                      >
                        {zoomedService.reportTime}
                      </span>
                    </>
                  )}
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  <span
                    style={{
                      fontSize: "16px",
                      color: "#6b7280",
                      fontWeight: "600",
                    }}
                  >
                    Add
                  </span>
                  <button
                    onClick={() => {
                      addToCart(zoomedService);
                      setShowZoomedCard(false);
                    }}
                    style={{
                      width: "40px",
                      height: "40px",
                      background: "#14b8a6",
                      color: "white",
                      borderRadius: "50%",
                      border: "none",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "all 0.2s",
                      boxShadow: "0 4px 12px rgba(20, 184, 166, 0.3)",
                    }}
                    onMouseOver={(e) => {
                      e.target.style.background = "#0f766e";
                      e.target.style.transform = "scale(1.1)";
                      e.target.style.boxShadow =
                        "0 6px 16px rgba(20, 184, 166, 0.4)";
                    }}
                    onMouseOut={(e) => {
                      e.target.style.background = "#14b8a6";
                      e.target.style.transform = "scale(1)";
                      e.target.style.boxShadow =
                        "0 4px 12px rgba(20, 184, 166, 0.3)";
                    }}
                  >
                    <Plus size={20} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Service Detail Modal - Package Details Style */}
      {showModal && selectedService && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0, 0, 0, 0.5)",
            backdropFilter: "blur(4px)",
            zIndex: 50,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "16px",
          }}
          onClick={() => setShowModal(false)}
        >
          <div
            style={{
              background: "linear-gradient(135deg, #a7f3d0 0%, #6ee7b7 100%)",
              borderRadius: "16px",
              width: "100%",
              maxWidth: "400px",
              maxHeight: "90vh",
              overflowY: "auto",
              animation: "slideUp 0.3s ease-out",
              position: "relative",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div
              style={{
                background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                padding: "16px",
                borderRadius: "16px 16px 0 0",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                color: "white",
              }}
            >
              <h2
                style={{
                  fontSize: "18px",
                  fontWeight: "bold",
                  margin: 0,
                }}
              >
                Package Details
              </h2>
              <button
                onClick={() => setShowModal(false)}
                style={{
                  background: "rgba(255, 255, 255, 0.2)",
                  border: "none",
                  borderRadius: "50%",
                  width: "32px",
                  height: "32px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  transition: "background 0.2s",
                }}
                onMouseOver={(e) =>
                  (e.target.style.background = "rgba(255, 255, 255, 0.3)")
                }
                onMouseOut={(e) =>
                  (e.target.style.background = "rgba(255, 255, 255, 0.2)")
                }
              >
                <X size={18} color="white" />
              </button>
            </div>

            {/* Content */}
            <div style={{ padding: "20px" }}>
              {/* Sample Type and Report Info */}
              <div
                style={{
                  display: "flex",
                  gap: "12px",
                  marginBottom: "20px",
                }}
              >
                <div
                  style={{
                    flex: 1,
                    background: "rgba(255, 255, 255, 0.7)",
                    padding: "12px",
                    borderRadius: "12px",
                    textAlign: "center",
                  }}
                >
                  <div
                    style={{
                      fontSize: "14px",
                      fontWeight: "bold",
                      color: "#1f2937",
                      marginBottom: "4px",
                    }}
                  >
                    (a)
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "6px",
                      marginBottom: "4px",
                    }}
                  >
                    <div
                      style={{
                        width: "24px",
                        height: "24px",
                        background: "#06b6d4",
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <div
                        style={{
                          width: "12px",
                          height: "12px",
                          background: "white",
                          borderRadius: "2px",
                        }}
                      ></div>
                    </div>
                  </div>
                  <div
                    style={{
                      fontSize: "12px",
                      fontWeight: "600",
                      color: "#374151",
                    }}
                  >
                    Sample Type
                  </div>
                  <div
                    style={{
                      fontSize: "11px",
                      color: "#6b7280",
                    }}
                  >
                    Blood,Urine
                  </div>
                </div>

                <div
                  style={{
                    flex: 1,
                    background: "rgba(255, 255, 255, 0.7)",
                    padding: "12px",
                    borderRadius: "12px",
                    textAlign: "center",
                  }}
                >
                  <div
                    style={{
                      fontSize: "14px",
                      fontWeight: "bold",
                      color: "#1f2937",
                      marginBottom: "4px",
                    }}
                  >
                    (b)
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "6px",
                      marginBottom: "4px",
                    }}
                  >
                    <div
                      style={{
                        width: "24px",
                        height: "24px",
                        background: "#10b981",
                        borderRadius: "4px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <div
                        style={{
                          width: "16px",
                          height: "12px",
                          background: "white",
                          borderRadius: "2px",
                          position: "relative",
                        }}
                      >
                        <div
                          style={{
                            position: "absolute",
                            top: "2px",
                            left: "2px",
                            width: "12px",
                            height: "2px",
                            background: "#10b981",
                          }}
                        ></div>
                        <div
                          style={{
                            position: "absolute",
                            top: "5px",
                            left: "2px",
                            width: "8px",
                            height: "2px",
                            background: "#10b981",
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                  <div
                    style={{
                      fontSize: "12px",
                      fontWeight: "600",
                      color: "#374151",
                    }}
                  >
                    Report In
                  </div>
                  <div
                    style={{
                      fontSize: "11px",
                      color: "#6b7280",
                    }}
                  >
                    SMS & WhatsApp
                  </div>
                  <div
                    style={{
                      fontSize: "14px",
                      fontWeight: "bold",
                      color: "#059669",
                      marginTop: "2px",
                    }}
                  >
                    {selectedService.reportTime}
                  </div>
                </div>
              </div>

              {/* Included Tests */}
              <div
                style={{
                  background: "rgba(255, 255, 255, 0.7)",
                  borderRadius: "12px",
                  padding: "16px",
                  marginBottom: "16px",
                }}
              >
                <h3
                  style={{
                    fontSize: "16px",
                    fontWeight: "bold",
                    color: "#1f2937",
                    marginBottom: "12px",
                  }}
                >
                  Included Tests
                </h3>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                  }}
                >
                  {selectedService.features.map((feature, index) => (
                    <div
                      key={index}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "8px 0",
                        borderBottom:
                          index < selectedService.features.length - 1
                            ? "1px solid rgba(156, 163, 175, 0.3)"
                            : "none",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                        }}
                      >
                        <div
                          style={{
                            width: "24px",
                            height: "24px",
                            background: "#ef4444",
                            borderRadius: "4px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <div
                            style={{
                              width: "16px",
                              height: "12px",
                              background: "white",
                              borderRadius: "2px 2px 8px 8px",
                            }}
                          ></div>
                        </div>
                        <div>
                          <div
                            style={{
                              fontSize: "14px",
                              fontWeight: "600",
                              color: "#1f2937",
                            }}
                          >
                            {feature.includes("(")
                              ? feature.split("(")[0].trim()
                              : feature}
                          </div>
                          {feature.includes("(") && (
                            <div
                              style={{
                                fontSize: "12px",
                                color: "#6b7280",
                              }}
                            >
                              ({feature.split("(")[1].split(")")[0]})
                            </div>
                          )}
                        </div>
                      </div>
                      <ChevronDown size={16} color="#6b7280" />
                    </div>
                  ))}

                  {/* Package Details Row */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "8px 0",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      <div
                        style={{
                          width: "24px",
                          height: "24px",
                          background: "#ef4444",
                          borderRadius: "4px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <div
                          style={{
                            width: "16px",
                            height: "12px",
                            background: "white",
                            borderRadius: "2px 2px 8px 8px",
                          }}
                        ></div>
                      </div>
                      <div
                        style={{
                          fontSize: "14px",
                          fontWeight: "600",
                          color: "#1f2937",
                        }}
                      >
                        Package Details
                      </div>
                    </div>
                    <ChevronDown size={16} color="#6b7280" />
                  </div>
                </div>
              </div>

              {/* Home Sample Collection */}
              <div
                style={{
                  background: "rgba(255, 255, 255, 0.7)",
                  borderRadius: "12px",
                  padding: "16px",
                  marginBottom: "16px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                  }}
                >
                  <div
                    style={{
                      width: "40px",
                      height: "40px",
                      background: "#fbbf24",
                      borderRadius: "8px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      position: "relative",
                    }}
                  >
                    <div
                      style={{
                        width: "20px",
                        height: "20px",
                        background: "white",
                        borderRadius: "50%",
                      }}
                    ></div>
                    <div
                      style={{
                        position: "absolute",
                        bottom: "-2px",
                        right: "-2px",
                        width: "16px",
                        height: "16px",
                        background: "#059669",
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <div
                        style={{
                          width: "8px",
                          height: "8px",
                          background: "white",
                          borderRadius: "2px",
                        }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: "14px",
                        fontWeight: "600",
                        color: "#1f2937",
                        marginBottom: "2px",
                      }}
                    >
                      Home Sample Collection Available
                    </div>
                    <div
                      style={{
                        fontSize: "16px",
                        fontWeight: "bold",
                        color: "#059669",
                      }}
                    >
                      Call : 812345 92 63
                    </div>
                  </div>
                </div>
              </div>

              {/* Processing Info */}
              <div
                style={{
                  background: "rgba(75, 85, 99, 0.9)",
                  color: "white",
                  padding: "12px",
                  borderRadius: "8px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                }}
              >
                <div
                  style={{
                    width: "0",
                    height: "0",
                    borderLeft: "6px solid transparent",
                    borderRight: "6px solid transparent",
                    borderBottom: "8px solid white",
                  }}
                ></div>
                <span
                  style={{
                    fontSize: "12px",
                    fontWeight: "600",
                  }}
                >
                  Processing In : SST, EDTA, Fluoride, Urine
                </span>
              </div>

              {/* Action Buttons */}
              <div
                style={{
                  display: "flex",
                  gap: "12px",
                  marginTop: "20px",
                }}
              >
                <button
                  onClick={() => {
                    confirmPatientSelection();
                    setShowModal(false);
                  }}
                  style={{
                    flex: 1,
                    padding: "14px 20px",
                    background: "linear-gradient(45deg, #14b8a6, #059669)",
                    color: "white",
                    fontWeight: "600",
                    borderRadius: "12px",
                    border: "none",
                    cursor: "pointer",
                    transition: "all 0.2s",
                    fontSize: "16px",
                  }}
                  onMouseOver={(e) =>
                    (e.target.style.background =
                      "linear-gradient(45deg, #0f766e, #047857)")
                  }
                  onMouseOut={(e) =>
                    (e.target.style.background =
                      "linear-gradient(45deg, #14b8a6, #059669)")
                  }
                >
                  Select Patients
                </button>
                <button
                  onClick={() => window.open("tel:81234592639", "_self")}
                  style={{
                    padding: "14px 20px",
                    border: "2px solid #059669",
                    color: "#059669",
                    background: "white",
                    fontWeight: "600",
                    borderRadius: "12px",
                    cursor: "pointer",
                    transition: "all 0.2s",
                    fontSize: "14px",
                  }}
                  onMouseOver={(e) => {
                    e.target.style.background = "#059669";
                    e.target.style.color = "white";
                  }}
                  onMouseOut={(e) => {
                    e.target.style.background = "white";
                    e.target.style.color = "#059669";
                  }}
                >
                  📞 Call
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Shopping Cart Modal */}
      {showCart && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0, 0, 0, 0.5)",
            backdropFilter: "blur(4px)",
            zIndex: 50,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "16px",
          }}
          onClick={() => setShowCart(false)}
        >
          <div
            style={{
              background: "white",
              borderRadius: "24px",
              width: "100%",
              maxWidth: "400px",
              maxHeight: "90vh",
              overflowY: "auto",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              style={{
                position: "sticky",
                top: 0,
                background: "rgba(255, 255, 255, 0.8)",
                backdropFilter: "blur(20px)",
                borderBottom: "1px solid #e5e7eb",
                padding: "16px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                borderRadius: "24px 24px 0 0",
              }}
            >
              <h2
                style={{
                  fontSize: "20px",
                  fontWeight: "bold",
                  color: "#1f2937",
                  margin: 0,
                }}
              >
                Shopping Cart ({cartCount})
              </h2>
              <button
                onClick={() => setShowCart(false)}
                style={{
                  padding: "8px",
                  color: "#6b7280",
                  borderRadius: "50%",
                  border: "none",
                  background: "transparent",
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
              >
                <X size={20} />
              </button>
            </div>

            <div style={{ padding: "16px" }}>
              {cart.length === 0 ? (
                <div style={{ textAlign: "center", padding: "48px 0" }}>
                  <ShoppingCart
                    size={64}
                    color="#d1d5db"
                    style={{ margin: "0 auto 16px" }}
                  />
                  <p style={{ color: "#6b7280" }}>Your cart is empty</p>
                </div>
              ) : (
                <>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "16px",
                      marginBottom: "24px",
                    }}
                  >
                    {cart.map((item) => (
                      <div
                        key={item.id}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "16px",
                          background: "#f9fafb",
                          borderRadius: "12px",
                          padding: "16px",
                        }}
                      >
                        <img
                          src={item.profileImage}
                          style={{
                            width: "48px",
                            height: "48px",
                            borderRadius: "50%",
                          }}
                          alt={item.doctorName}
                        />
                        <div style={{ flex: 1 }}>
                          <h4
                            style={{
                              fontWeight: "500",
                              color: "#1f2937",
                              margin: "0 0 4px 0",
                            }}
                          >
                            {item.shortTitle}
                          </h4>
                          <p
                            style={{
                              fontSize: "14px",
                              color: "#6b7280",
                              margin: 0,
                            }}
                          >
                            ₹{item.currentPrice}
                          </p>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                          }}
                        >
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            style={{
                              width: "32px",
                              height: "32px",
                              background: "#e5e7eb",
                              borderRadius: "50%",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              border: "none",
                              cursor: "pointer",
                              transition: "background 0.2s",
                            }}
                            onMouseOver={(e) =>
                              (e.target.style.background = "#d1d5db")
                            }
                            onMouseOut={(e) =>
                              (e.target.style.background = "#e5e7eb")
                            }
                          >
                            -
                          </button>
                          <span style={{ fontWeight: "500" }}>
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            style={{
                              width: "32px",
                              height: "32px",
                              background: "#14b8a6",
                              color: "white",
                              borderRadius: "50%",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              border: "none",
                              cursor: "pointer",
                              transition: "background 0.2s",
                            }}
                            onMouseOver={(e) =>
                              (e.target.style.background = "#0f766e")
                            }
                            onMouseOut={(e) =>
                              (e.target.style.background = "#14b8a6")
                            }
                          >
                            +
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div
                    style={{
                      borderTop: "1px solid #e5e7eb",
                      paddingTop: "16px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        fontSize: "20px",
                        fontWeight: "bold",
                        color: "#1f2937",
                        marginBottom: "16px",
                      }}
                    >
                      <span>Total:</span>
                      <span>₹{cartTotal}</span>
                    </div>
                    <button
                      style={{
                        width: "100%",
                        padding: "16px 24px",
                        background: "linear-gradient(45deg, #14b8a6, #3b82f6)",
                        color: "white",
                        fontWeight: "600",
                        borderRadius: "12px",
                        border: "none",
                        cursor: "pointer",
                        transition: "all 0.2s",
                      }}
                      onMouseOver={(e) =>
                        (e.target.style.background =
                          "linear-gradient(45deg, #0f766e, #2563eb)")
                      }
                      onMouseOut={(e) =>
                        (e.target.style.background =
                          "linear-gradient(45deg, #14b8a6, #3b82f6)")
                      }
                    >
                      Proceed to Checkout
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Bottom Navigation */}
      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          background: "rgba(255, 255, 255, 0.8)",
          backdropFilter: "blur(20px)",
          boxShadow: "0 -4px 6px rgba(0, 0, 0, 0.05)",
          borderTop: "1px solid #e5e7eb",
          zIndex: 50,
        }}
      >
        <div
          style={{
            maxWidth: "400px",
            margin: "0 auto",
            padding: "12px 16px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-around",
            }}
          >
            {[
              { icon: Home, label: "Home", key: "Home" },
              { icon: Percent, label: "Offer", key: "Offer" },
              { icon: Phone, label: "Call", key: "Call" },
              { icon: MessageCircle, label: "WhatsApp", key: "WhatsApp" },
              { icon: ShoppingCart, label: "Orders", key: "Orders" },
            ].map((item) => (
              <button
                key={item.key}
                onClick={() => handleNavigation(item)}
                style={{
                  position: "relative",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "4px",
                  padding: "12px",
                  borderRadius: "12px",
                  border: "none",
                  background:
                    activeTab === item.key ? "#f0fdfa" : "transparent",
                  color: activeTab === item.key ? "#14b8a6" : "#6b7280",
                  cursor: "pointer",
                  transition: "all 0.2s",
                  transform: activeTab === item.key ? "scale(1.1)" : "scale(1)",
                }}
                onMouseOver={(e) => {
                  if (activeTab !== item.key) {
                    e.target.style.color = "#14b8a6";
                    e.target.style.background = "#f0fdfa";
                  }
                }}
                onMouseOut={(e) => {
                  if (activeTab !== item.key) {
                    e.target.style.color = "#6b7280";
                    e.target.style.background = "transparent";
                  }
                }}
              >
                <item.icon size={20} />
                <span
                  style={{
                    fontSize: "10px",
                    fontWeight: "500",
                  }}
                >
                  {item.label}
                </span>
                {item.key === "Orders" && cartCount > 0 && (
                  <div
                    style={{
                      position: "absolute",
                      top: "-4px",
                      right: "-4px",
                      background: "#ef4444",
                      color: "white",
                      fontSize: "10px",
                      fontWeight: "bold",
                      borderRadius: "50%",
                      width: "20px",
                      height: "20px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      animation: "pulse 2s infinite",
                    }}
                  >
                    {cartCount}
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      {toast && (
        <div
          style={{
            position: "fixed",
            top: "80px",
            left: "50%",
            transform: "translateX(-50%)",
            background: "#1f2937",
            color: "white",
            padding: "12px 24px",
            borderRadius: "12px",
            boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
            zIndex: 50,
            animation: "slideDown 0.3s ease-out",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <CheckCircle size={20} color="#10b981" />
            <span>{toast}</span>
          </div>
        </div>
      )}

      {/* CSS Animations */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          
          @keyframes zoomIn {
            from { 
              transform: scale(0.8);
              opacity: 0;
            }
            to { 
              transform: scale(1);
              opacity: 1;
            }
          }
          
          @keyframes slideUp {
            from { transform: translateY(100%); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }
          
          @keyframes slideDown {
            from { transform: translate(-50%, -100%); opacity: 0; }
            to { transform: translate(-50%, 0); opacity: 1; }
          }
          
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          
          @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.1); }
          }
          
          * {
            box-sizing: border-box;
          }
          
          body {
            margin: 0;
            padding: 0;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
          }
        `}
      </style>
    </div>
  );
};

export default InteractiveHealthApp;
