import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { AlertTriangle } from "lucide-react";
import apiService from "../utils/api";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [itemToRemove, setItemToRemove] = useState(null);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const userId = searchParams.get("userId");

  useEffect(() => {
    if (!userId) {
      navigate("/error");
      return;
    }

    fetchCartItems();
  }, [userId, navigate]);

  const fetchCartItems = async () => {
    try {
      const response = await apiService.getCart(userId);
      setCartItems(response.data || []);
    } catch (error) {
      console.error("Error fetching cart items:", error);
      setError("Failed to load cart items. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveItem = (itemId) => {
    setItemToRemove(itemId);
    setShowRemoveModal(true);
  };

  const confirmRemoveItem = async () => {
    if (!itemToRemove) return;

    try {
      const response = await apiService.removeFromCart(userId, itemToRemove);

      if (response.success) {
        setCartItems(cartItems.filter((item) => item._id !== itemToRemove));
      } else {
        setError("Failed to remove item from cart");
      }
    } catch (error) {
      console.error("Error removing item:", error);
      setError("Error removing item from cart. Please try again.");
    } finally {
      setShowRemoveModal(false);
      setItemToRemove(null);
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price || 0), 0);
  };

  const handleCheckout = () => {
    // Implement checkout logic
    alert("Checkout functionality to be implemented");
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-5">
        <div
          className="alert alert-danger d-flex align-items-center"
          role="alert"
        >
          <AlertTriangle className="me-2" />
          <div>{error}</div>
        </div>
        <button className="btn btn-primary mt-3" onClick={fetchCartItems}>
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="container py-5">
        <h2 className="mb-4">Shopping Cart</h2>

        {cartItems.length === 0 ? (
          <div className="text-center py-5">
            <h4>Your cart is empty</h4>
            <p>Add some tests to your cart to get started!</p>
            <button className="btn btn-primary" onClick={() => navigate("/")}>
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            <div className="cart-card">
              {cartItems.map((item, index) => (
                <div key={index} className="cart-item border-bottom py-3">
                  <div className="row align-items-center">
                    <div className="col-md-8">
                      <h5>{item.name}</h5>
                      <p className="text-muted">{item.category}</p>
                      <p className="text-muted">{item.description}</p>
                    </div>
                    <div className="col-md-2">
                      <h6>₹{item.price}</h6>
                    </div>
                    <div className="col-md-2">
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleRemoveItem(item._id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-value mt-4">
              <div className="row">
                <div className="col-md-8"></div>
                <div className="col-md-4">
                  <div className="card">
                    <div className="card-body">
                      <h5>Order Summary</h5>
                      <div className="d-flex justify-content-between">
                        <span>Subtotal:</span>
                        <span>₹{calculateTotal()}</span>
                      </div>
                      <div className="d-flex justify-content-between">
                        <span>Tax:</span>
                        <span>₹0</span>
                      </div>
                      <hr />
                      <div className="d-flex justify-content-between">
                        <strong>Total:</strong>
                        <strong>₹{calculateTotal()}</strong>
                      </div>
                      <button
                        className="btn btn-primary w-100 mt-3"
                        onClick={handleCheckout}
                      >
                        Proceed to Checkout
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Remove Confirmation Modal */}
      {showRemoveModal && (
        <div
          className="modal fade show"
          style={{ display: "block" }}
          tabIndex="-1"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Removal</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowRemoveModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                Are you sure you want to remove this item from your cart?
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowRemoveModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-danger confirm-remove"
                  onClick={confirmRemoveItem}
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {showRemoveModal && <div className="modal-backdrop fade show"></div>}
    </div>
  );
};

export default Cart;
