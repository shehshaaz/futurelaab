import React from 'react';
import { Link } from 'react-router-dom';
import { Check } from 'react-feather';

const CreatePackage = () => {
    const plans = [
        {
            name: 'Silver Plan',
            price: '₹999',
            features: [
                'Basic Health Checkup',
                'Blood Sugar Test',
                'Cholesterol Check',
                'Online Report Access',
            ],
            color: '#C0C0C0', // Silver
            buttonColor: 'btn-secondary',
        },
        {
            name: 'Gold Plan',
            price: '₹1999',
            features: [
                'Advanced Health Checkup',
                'Complete Blood Count',
                'Liver Function Test',
                'Kidney Function Test',
                'Doctor Consultation',
            ],
            color: '#FFD700', // Gold
            buttonColor: 'btn-warning',
        },
        {
            name: 'Platinum Plan',
            price: '₹2999',
            features: [
                'Premium Health Checkup',
                'Full Body Scan',
                'Cardiac Risk Markers',
                'Vitamin Profile',
                'Priority Support',
                'Home Sample Collection',
            ],
            color: '#E5E4E2', // Platinum
            buttonColor: 'btn-dark',
        },
    ];

    return (
        <div className="create-package-page py-5" style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
            <div className="container">
                <div className="text-center mb-5">
                    <h1 className="fw-bold mb-3" style={{ color: '#333' }}>Choose Your Health Package</h1>
                    <p className="text-muted mx-auto" style={{ maxWidth: '600px' }}>
                        Select a plan that best suits your lifestyle and health needs.
                        Customize your package to get the most comprehensive care.
                    </p>
                </div>

                <div className="row g-4 justify-content-center">
                    {plans.map((plan, index) => (
                        <div key={index} className="col-lg-4 col-md-6">
                            <div
                                className="card h-100 border-0 shadow-sm hover-scale"
                                style={{
                                    borderRadius: '15px',
                                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                                    overflow: 'hidden'
                                }}
                            >
                                <div
                                    className="card-header text-center py-4"
                                    style={{ backgroundColor: plan.color, borderBottom: 'none' }}
                                >
                                    <h3 className="fw-bold mb-0" style={{ color: '#fff', textShadow: '0 1px 2px rgba(0,0,0,0.2)' }}>
                                        {plan.name}
                                    </h3>
                                </div>
                                <div className="card-body p-4 d-flex flex-column">
                                    <div className="text-center mb-4">
                                        <span className="display-4 fw-bold text-primary">{plan.price}</span>
                                    </div>
                                    <ul className="list-unstyled mb-4 flex-grow-1">
                                        {plan.features.map((feature, idx) => (
                                            <li key={idx} className="mb-3 d-flex align-items-center">
                                                <Check size={20} className="text-success me-2" />
                                                <span>{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                    <div className="mt-auto">
                                        <button className={`btn ${plan.buttonColor} w-100 py-3 fw-bold text-uppercase`} style={{ borderRadius: '50px' }}>
                                            Select {plan.name}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="text-center mt-5">
                    <p className="text-muted">
                        Need something more specific? <Link to="/contact" className="text-primary fw-bold">Contact Us</Link> for a custom quote.
                    </p>
                </div>
            </div>

            <style>{`
        .hover-scale:hover {
          transform: translateY(-10px);
          box-shadow: 0 15px 30px rgba(0,0,0,0.1) !important;
        }
      `}</style>
        </div>
    );
};

export default CreatePackage;
