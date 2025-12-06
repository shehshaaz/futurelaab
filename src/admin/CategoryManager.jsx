import React, { useState, useEffect } from "react";
import apiService from "../utils/api";
import "./AdminDashboard.css";

const CategoryManager = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    type: "",
    imagePath: "",
    isActive: true,
    isFeatured: false,
    isSelected: false,
  });

  // Fetch categories from API
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await apiService.getAdminCategories();
      if (response.success) {
        setCategories(response.data);
      } else {
        setError(response.error || "Failed to fetch categories");
      }
    } catch (err) {
      console.error("Error fetching categories:", err);
      setError("Failed to fetch categories");
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
      if (editingCategory) {
        // Update existing category
        response = await apiService.request(`/api/v1/admin/categories/${editingCategory._id}`, {
          method: 'PUT',
          body: JSON.stringify(formData),
          includeAuth: true,
          isAdmin: true
        });
      } else {
        // Add new category
        response = await apiService.request('/api/v1/admin/categories', {
          method: 'POST',
          body: JSON.stringify(formData),
          includeAuth: true,
          isAdmin: true
        });
      }

      if (response.success) {
        // Refresh the categories list
        await fetchCategories();
        resetForm();
      } else {
        setError(response.error || "Failed to save category");
      }
    } catch (err) {
      console.error("Error saving category:", err);
      setError("Failed to save category");
    }
  };

  const handleEdit = (category) => {
    setEditingCategory(category);
    setFormData({
      name: category.name,
      description: category.description,
      type: category.type,
      imagePath: category.imagePath,
      isActive: category.isActive,
      isFeatured: category.isFeatured,
      isSelected: category.isSelected,
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      try {
        const response = await apiService.request(`/api/v1/admin/categories/${id}`, {
          method: 'DELETE',
          includeAuth: true,
          isAdmin: true
        });
        
        if (response.success) {
          // Refresh the categories list
          await fetchCategories();
        } else {
          setError(response.error || "Failed to delete category");
        }
      } catch (err) {
        console.error("Error deleting category:", err);
        setError("Failed to delete category");
      }
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      type: "",
      imagePath: "",
      isActive: true,
      isFeatured: false,
      isSelected: false,
    });
    setEditingCategory(null);
    setShowForm(false);
  };

  if (loading) {
    return <div className="admin-content">Loading...</div>;
  }

  return (
    <div className="admin-content">
      <div className="admin-header">
        <h1>Manage Categories</h1>
        <button
          className="btn btn-primary"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? "Cancel" : "Add New Category"}
        </button>
      </div>

      {error && (
        <div className="alert alert-danger">
          {error}
          <button className="btn btn-link" onClick={fetchCategories}>Retry</button>
        </div>
      )}

      {showForm && (
        <div className="form-card">
          <h2>{editingCategory ? "Edit Category" : "Add New Category"}</h2>
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
                <label>Type</label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Type</option>
                  <option value="health-package">Health Package</option>
                  <option value="special-care">Special Care</option>
                  <option value="vital-organ">Vital Organ</option>
                  <option value="lifestyle">Lifestyle</option>
                  <option value="women-care">Women Care</option>
                  <option value="men-care">Men Care</option>
                </select>
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

            <div className="form-group">
              <label>Image Path</label>
              <input
                type="text"
                name="imagePath"
                value={formData.imagePath}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-checkboxes">
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

              <div className="form-group checkbox-group">
                <label>
                  <input
                    type="checkbox"
                    name="isFeatured"
                    checked={formData.isFeatured}
                    onChange={handleInputChange}
                  />
                  Featured
                </label>
              </div>

              <div className="form-group checkbox-group">
                <label>
                  <input
                    type="checkbox"
                    name="isSelected"
                    checked={formData.isSelected}
                    onChange={handleInputChange}
                  />
                  Selected
                </label>
              </div>
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
                {editingCategory ? "Update Category" : "Add Category"}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="table-card">
        <h2>Categories</h2>
        <div className="table-responsive">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Type</th>
                <th>Status</th>
                <th>Featured</th>
                <th>Selected</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => (
                <tr key={category._id}>
                  <td>{category.name}</td>
                  <td>{category.type}</td>
                  <td>
                    <span
                      className={`status ${
                        category.isActive ? "delivered" : "pending"
                      }`}
                    >
                      {category.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td>
                    <span
                      className={`status ${
                        category.isFeatured ? "delivered" : "pending"
                      }`}
                    >
                      {category.isFeatured ? "Yes" : "No"}
                    </span>
                  </td>
                  <td>
                    <span
                      className={`status ${
                        category.isSelected ? "delivered" : "pending"
                      }`}
                    >
                      {category.isSelected ? "Yes" : "No"}
                    </span>
                  </td>
                  <td>
                    <button
                      className="btn btn-sm btn-secondary"
                      onClick={() => handleEdit(category)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(category._id)}
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

export default CategoryManager;