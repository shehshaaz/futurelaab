import React, { useState, useEffect } from "react";
import apiService from "../utils/api";
import "./AdminDashboard.css";

const TestManager = () => {
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingTest, setEditingTest] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    originalPrice: "",
    includes: "",
    preparation: "",
    reportsIn: "",
    isActive: true,
  });

  // Fetch tests from API
  useEffect(() => {
    fetchTests();
  }, []);

  const fetchTests = async () => {
    try {
      setLoading(true);
      const response = await apiService.getAdminTests();
      if (response.success) {
        setTests(response.data);
      } else {
        setError(response.error || "Failed to fetch tests");
      }
    } catch (err) {
      console.error("Error fetching tests:", err);
      setError("Failed to fetch tests");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response;
      if (editingTest) {
        // Update existing test
        response = await apiService.request(`/api/v1/admin/tests/${editingTest._id}`, {
          method: 'PUT',
          body: JSON.stringify(formData),
          includeAuth: true,
          isAdmin: true
        });
      } else {
        // Add new test
        response = await apiService.request('/api/v1/admin/tests', {
          method: 'POST',
          body: JSON.stringify(formData),
          includeAuth: true,
          isAdmin: true
        });
      }

      if (response.success) {
        // Refresh the tests list
        await fetchTests();
        resetForm();
      } else {
        setError(response.error || "Failed to save test");
      }
    } catch (err) {
      console.error("Error saving test:", err);
      setError("Failed to save test");
    }
  };

  const handleEdit = (test) => {
    setEditingTest(test);
    setFormData({
      name: test.name,
      description: test.description,
      category: test.category,
      price: test.price,
      originalPrice: test.originalPrice,
      includes: test.includes ? test.includes.join(", ") : "",
      preparation: test.preparation,
      reportsIn: test.reportsIn,
      isActive: test.isActive,
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this test?")) {
      try {
        const response = await apiService.request(`/api/v1/admin/tests/${id}`, {
          method: 'DELETE',
          includeAuth: true,
          isAdmin: true
        });
        
        if (response.success) {
          // Refresh the tests list
          await fetchTests();
        } else {
          setError(response.error || "Failed to delete test");
        }
      } catch (err) {
        console.error("Error deleting test:", err);
        setError("Failed to delete test");
      }
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      category: "",
      price: "",
      originalPrice: "",
      includes: "",
      preparation: "",
      reportsIn: "",
      isActive: true,
    });
    setEditingTest(null);
    setShowForm(false);
  };

  if (loading) {
    return <div className="admin-content">Loading...</div>;
  }

  return (
    <div className="admin-content">
      <div className="admin-header">
        <h1>Manage Tests & Packages</h1>
        <button
          className="btn btn-primary"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? "Cancel" : "Add New Test"}
        </button>
      </div>

      {error && (
        <div className="alert alert-danger">
          {error}
          <button className="btn btn-link" onClick={fetchTests}>Retry</button>
        </div>
      )}

      {showForm && (
        <div className="form-card">
          <h2>{editingTest ? "Edit Test" : "Add New Test"}</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Category</option>
                  <option value="Health Packages">Health Packages</option>
                  <option value="Women Care Packages">Women Care Packages</option>
                  <option value="Vital Organ Tests">Vital Organ Tests</option>
                  <option value="Lifestyle Health Packages">Lifestyle Health Packages</option>
                  <option value="Special Care Packages">Special Care Packages</option>
                  <option value="Single Test">Single Test</option>
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Price (₹)</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Original Price (₹)</label>
                <input
                  type="number"
                  name="originalPrice"
                  value={formData.originalPrice}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows="3"
                required
              ></textarea>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Includes (comma separated)</label>
                <input
                  type="text"
                  name="includes"
                  value={formData.includes}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Reports In</label>
                <input
                  type="text"
                  name="reportsIn"
                  value={formData.reportsIn}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="form-group">
              <label>Preparation</label>
              <input
                type="text"
                name="preparation"
                value={formData.preparation}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group checkbox-group">
              <label>
                <input
                  type="checkbox"
                  name="isActive"
                  checked={formData.isActive}
                  onChange={handleInputChange}
                />
                Active
              </label>
            </div>

            <div className="form-actions">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={resetForm}
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                {editingTest ? "Update Test" : "Add Test"}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="table-card">
        <h2>Tests & Packages</h2>
        <div className="table-responsive">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Original Price</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tests.map((test) => (
                <tr key={test._id}>
                  <td>{test.name}</td>
                  <td>{test.category}</td>
                  <td>₹{test.price}</td>
                  <td>₹{test.originalPrice || 'N/A'}</td>
                  <td>
                    <span
                      className={`status ${
                        test.isActive ? "delivered" : "pending"
                      }`}
                    >
                      {test.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td>
                    <button
                      className="btn btn-sm btn-secondary"
                      onClick={() => handleEdit(test)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(test._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TestManager;