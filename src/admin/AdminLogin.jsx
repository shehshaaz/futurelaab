import React, { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import apiService from "../utils/api";
import "./AdminDashboard.css";

const AdminLogin = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Check if already logged in
  const adminToken = localStorage.getItem("adminToken");
  if (adminToken) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials({
      ...credentials,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Use the API service to login
      const response = await apiService.request('/api/v1/auth/admin/login', {
        method: 'POST',
        body: JSON.stringify(credentials),
      });

      if (response.success) {
        // Successful login - store token and redirect to admin dashboard
        localStorage.setItem("adminToken", response.token);
        // Also store user data
        localStorage.setItem("adminUser", JSON.stringify(response.data));
        navigate("/admin/dashboard");
      } else {
        setError(response.error || "Invalid email or password");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Failed to login. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login">
      <div className="login-container">
        <div className="login-header">
          <h1>FutureLabs Admin</h1>
          <p>Sign in to access your admin dashboard</p>
        </div>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={credentials.email}
              onChange={handleInputChange}
              required
              placeholder="Enter your email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={credentials.password}
              onChange={handleInputChange}
              required
              placeholder="Enter your password"
            />
          </div>

          <div className="form-group checkbox-group">
            <label>
              <input type="checkbox" name="remember" />
              Remember me
            </label>
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-block"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div className="login-footer">
          <p>© 2025 FutureLabs. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;