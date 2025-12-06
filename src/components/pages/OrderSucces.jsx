// src/pages/OrderSuccess.js
import React from "react";
import { Link } from "react-router-dom";

const OrderSuccess = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className="bg-white p-10 rounded-2xl shadow text-center">
        <h2 className="text-3xl font-bold text-green-600 mb-4">Order Placed Successfully!</h2>
        <p className="text-gray-600 mb-6">Thank you for your order. Your order is being processed.</p>
        <Link
          to="/"
          className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default OrderSuccess;
