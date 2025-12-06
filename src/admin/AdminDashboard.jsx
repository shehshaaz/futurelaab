import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import TestManager from "./TestManager";
import CategoryManager from "./CategoryManager";
import OrderManager from "./OrderManager";
import apiService from "../utils/api";
import "./AdminDashboard.css";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [stats, setStats] = useState({
    usersCount: 0,
    testsCount: 0,
    ordersCount: 0,
    categoriesCount: 0,
    bannersCount: 0,
    recentOrders: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      // Set admin token for authenticated requests
      const token = localStorage.getItem("adminToken");
      if (token) {
        apiService.setToken(token);
      }

      const response = await apiService.getAdminStats();
      
      if (response.success) {
        setStats(response.data);
      } else {
        setError(response.error || "Failed to fetch stats");
      }
    } catch (err) {
      console.error("Error fetching stats:", err);
      setError("Failed to fetch dashboard statistics");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    // Remove admin token and redirect to login
    apiService.adminLogout();
    navigate("/admin/login");
  };

  // Render content based on active tab
  const renderContent = () => {
    switch (activeTab) {
      case "tests":
        return <TestManager />;
      case "categories":
        return <CategoryManager />;
      case "orders":
        return <OrderManager />;
      case "users":
        return (
          <div className="admin-content">
            <div className="admin-header">
              <h1>User Management</h1>
            </div>
            <div className="placeholder-content">
              <h2>User Management</h2>
              <p>
                This section will allow you to manage users, view user details,
                and handle user accounts.
              </p>
            </div>
          </div>
        );
      case "reports":
        return (
          <div className="admin-content">
            <div className="admin-header">
              <h1>Reports & Analytics</h1>
            </div>
            <div className="placeholder-content">
              <h2>Reports & Analytics</h2>
              <p>
                This section will display detailed reports and analytics about
                your business performance.
              </p>
            </div>
          </div>
        );
      default: // dashboard
        return (
          <div className="admin-content">
            {/* Stats Cards */}
            <div className="stats-cards">
              <div className="stat-card">
                <div className="stat-card-icon bg-primary">
                  <i className="fas fa-flask"></i>
                </div>
                <div className="stat-card-info">
                  <h3>{stats.testsCount}</h3>
                  <p>Total Tests</p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-card-icon bg-success">
                  <i className="fas fa-shopping-cart"></i>
                </div>
                <div className="stat-card-info">
                  <h3>{stats.ordersCount}</h3>
                  <p>Total Orders</p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-card-icon bg-warning">
                  <i className="fas fa-users"></i>
                </div>
                <div className="stat-card-info">
                  <h3>{stats.usersCount}</h3>
                  <p>Total Users</p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-card-icon bg-info">
                  <i className="fas fa-list"></i>
                </div>
                <div className="stat-card-info">
                  <h3>{stats.categoriesCount}</h3>
                  <p>Categories</p>
                </div>
              </div>
            </div>

            {/* Charts */}
            <div className="charts-container">
              <div className="chart-card">
                <h3>Recent Orders</h3>
                <div className="chart-wrapper">
                  {stats.recentOrders && stats.recentOrders.length > 0 ? (
                    <div className="recent-orders-table">
                      <table className="table">
                        <thead>
                          <tr>
                            <th>Order ID</th>
                            <th>Customer</th>
                            <th>Date</th>
                            <th>Status</th>
                            <th>Total</th>
                          </tr>
                        </thead>
                        <tbody>
                          {stats.recentOrders.map((order) => (
                            <tr key={order._id}>
                              <td>{order._id.substring(0, 8)}...</td>
                              <td>{order.user ? order.user.name : 'N/A'}</td>
                              <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                              <td>
                                <span className={`status-badge status-${order.orderStatus}`}>
                                  {order.orderStatus}
                                </span>
                              </td>
                              <td>₹{order.totalPrice}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <p>No recent orders found</p>
                  )}
                </div>
              </div>
            </div>

            {/* Loading and Error States */}
            {loading && (
              <div className="loading-container">
                <div className="spinner"></div>
                <p>Loading dashboard data...</p>
              </div>
            )}

            {error && (
              <div className="error-container">
                <div className="alert alert-danger">
                  {error}
                  <button className="btn btn-primary" onClick={fetchStats}>
                    Retry
                  </button>
                </div>
              </div>
            )}
          </div>
        );
    }
  };

  return (
    <div className="admin-dashboard">
      {/* Sidebar */}
      <div className={`admin-sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <h2>FutureLabs Admin</h2>
          <button
            className="sidebar-toggle"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <i className="fas fa-bars"></i>
          </button>
        </div>
        <ul className="sidebar-menu">
          <li>
            <button
              className={activeTab === "dashboard" ? "active" : ""}
              onClick={() => setActiveTab("dashboard")}
            >
              <i className="fas fa-tachometer-alt"></i>
              <span>Dashboard</span>
            </button>
          </li>
          <li>
            <button
              className={activeTab === "tests" ? "active" : ""}
              onClick={() => setActiveTab("tests")}
            >
              <i className="fas fa-flask"></i>
              <span>Tests</span>
            </button>
          </li>
          <li>
            <button
              className={activeTab === "categories" ? "active" : ""}
              onClick={() => setActiveTab("categories")}
            >
              <i className="fas fa-list"></i>
              <span>Categories</span>
            </button>
          </li>
          <li>
            <button
              className={activeTab === "orders" ? "active" : ""}
              onClick={() => setActiveTab("orders")}
            >
              <i className="fas fa-shopping-cart"></i>
              <span>Orders</span>
            </button>
          </li>
          <li>
            <button
              className={activeTab === "users" ? "active" : ""}
              onClick={() => setActiveTab("users")}
            >
              <i className="fas fa-users"></i>
              <span>Users</span>
            </button>
          </li>
          <li>
            <button
              className={activeTab === "reports" ? "active" : ""}
              onClick={() => setActiveTab("reports")}
            >
              <i className="fas fa-chart-bar"></i>
              <span>Reports</span>
            </button>
          </li>
        </ul>
        <div className="sidebar-footer">
          <button className="btn btn-danger" onClick={handleLogout}>
            <i className="fas fa-sign-out-alt"></i>
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="admin-main">
        <div className="admin-topbar">
          <button
            className="sidebar-toggle"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <i className="fas fa-bars"></i>
          </button>
          <div className="admin-user">
            <i className="fas fa-user-circle"></i>
            <span>Admin</span>
          </div>
        </div>
        {renderContent()}
      </div>
    </div>
  );
};

export default AdminDashboard;