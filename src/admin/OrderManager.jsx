import React, { useState, useEffect } from "react";
import "./AdminDashboard.css";

const OrderManager = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  // Mock data for demonstration
  useEffect(() => {
    const mockOrders = [
      {
        id: "FL2025001",
        user: "John Doe",
        date: "2025-09-20",
        amount: 1299,
        status: "delivered",
        items: [
          { name: "Comprehensive Health Checkup", quantity: 1, price: 1299 },
        ],
      },
      {
        id: "FL2025002",
        user: "Jane Smith",
        date: "2025-09-20",
        amount: 899,
        status: "processing",
        items: [{ name: "Diabetes Care", quantity: 1, price: 899 }],
      },
      {
        id: "FL2025003",
        user: "Robert Johnson",
        date: "2025-09-19",
        amount: 1599,
        status: "shipped",
        items: [
          { name: "Thyroid Function", quantity: 1, price: 699 },
          { name: "Vitamin Profile", quantity: 1, price: 900 },
        ],
      },
      {
        id: "FL2025004",
        user: "Emily Davis",
        date: "2025-09-19",
        amount: 699,
        status: "pending",
        items: [{ name: "Liver Function Test", quantity: 1, price: 699 }],
      },
      {
        id: "FL2025005",
        user: "Michael Wilson",
        date: "2025-09-18",
        amount: 2199,
        status: "delivered",
        items: [{ name: "Full Body Checkup", quantity: 1, price: 2199 }],
      },
    ];

    setOrders(mockOrders);
    setLoading(false);
  }, []);

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

  const handleStatusChange = (orderId, newStatus) => {
    setOrders(
      orders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  const filteredOrders =
    filter === "all"
      ? orders
      : orders.filter((order) => order.status === filter);

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
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.user}</td>
                  <td>{order.date}</td>
                  <td>₹{order.amount}</td>
                  <td>
                    <span className={`status ${getStatusClass(order.status)}`}>
                      {getStatusText(order.status)}
                    </span>
                  </td>
                  <td>
                    <select
                      value={order.status}
                      onChange={(e) =>
                        handleStatusChange(order.id, e.target.value)
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
          <p>{orders.filter((o) => o.status === "pending").length}</p>
        </div>
        <div className="summary-card">
          <h3>Processing Orders</h3>
          <p>{orders.filter((o) => o.status === "processing").length}</p>
        </div>
        <div className="summary-card">
          <h3>Completed Orders</h3>
          <p>{orders.filter((o) => o.status === "delivered").length}</p>
        </div>
      </div>
    </div>
  );
};

export default OrderManager;
