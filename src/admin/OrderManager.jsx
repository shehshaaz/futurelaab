import React, { useState, useEffect } from "react";
import apiService from "../utils/api";
import "./AdminDashboard.css";

const OrderManager = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all");

  // Fetch orders from API
  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await apiService.getAdminOrders();
      if (response.success) {
        setOrders(response.data);
      } else {
        setError(response.error || "Failed to fetch orders");
      }
    } catch (err) {
      console.error("Error fetching orders:", err);
      setError("Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "delivered":
        return "delivered";
      case "processing":
        return "processing";
      case "shipped":
        return "shipped";
      case "pending":
        return "pending";
      case "cancelled":
        return "pending";
      default:
        return "pending";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "delivered":
        return "Delivered";
      case "processing":
        return "Processing";
      case "shipped":
        return "Shipped";
      case "pending":
        return "Pending";
      case "cancelled":
        return "Cancelled";
      default:
        return "Pending";
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const response = await apiService.request(`/api/v1/admin/orders/${orderId}`, {
        method: 'PUT',
        body: JSON.stringify({ orderStatus: newStatus }),
        includeAuth: true,
        isAdmin: true
      });
      
      if (response.success) {
        // Update the order status in the state
        setOrders(
          orders.map((order) =>
            order._id === orderId ? { ...order, orderStatus: newStatus } : order
          )
        );
      } else {
        setError(response.error || "Failed to update order status");
      }
    } catch (err) {
      console.error("Error updating order status:", err);
      setError("Failed to update order status");
    }
  };

  const filteredOrders =
    filter === "all"
      ? orders
      : orders.filter((order) => order.orderStatus === filter);

  if (loading) {
    return <div className="admin-content">Loading...</div>;
  }

  return (
    <div className="admin-content">
      <div className="admin-header">
        <h1>Manage Orders</h1>
        <div className="filter-controls">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="form-control"
          >
            <option value="all">All Orders</option>
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {error && (
        <div className="alert alert-danger">
          {error}
          <button className="btn btn-link" onClick={fetchOrders}>Retry</button>
        </div>
      )}

      <div className="table-card">
        <h2>Orders</h2>
        <div className="table-responsive">
          <table>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id.substring(0, 8)}...</td>
                  <td>{order.user ? order.user.name : 'N/A'}</td>
                  <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td>₹{order.totalPrice}</td>
                  <td>
                    <span className={`status ${getStatusClass(order.orderStatus)}`}>
                      {getStatusText(order.orderStatus)}
                    </span>
                  </td>
                  <td>
                    <select
                      value={order.orderStatus}
                      onChange={(e) =>
                        handleStatusChange(order._id, e.target.value)
                      }
                      className="form-control status-select"
                    >
                      <option value="pending">Pending</option>
                      <option value="processing">Processing</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="stats-summary">
        <div className="summary-card">
          <h3>Total Orders</h3>
          <p>{orders.length}</p>
        </div>
        <div className="summary-card">
          <h3>Pending Orders</h3>
          <p>{orders.filter((o) => o.orderStatus === "pending").length}</p>
        </div>
        <div className="summary-card">
          <h3>Processing Orders</h3>
          <p>{orders.filter((o) => o.orderStatus === "processing").length}</p>
        </div>
        <div className="summary-card">
          <h3>Completed Orders</h3>
          <p>{orders.filter((o) => o.orderStatus === "delivered").length}</p>
        </div>
      </div>
    </div>
  );
};

export default OrderManager;