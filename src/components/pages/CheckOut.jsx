import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearCartItem } from "../slices/productSlice";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db, auth } from "../../firebase.config";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.product.cartItem);

  const [shippingInfo, setShippingInfo] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
  });

  const [loading, setLoading] = useState(false);

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.qun, 0);
  const shipping = 50;
  const totalAmount = subtotal + shipping;

  const handleChange = (e) => {
    setShippingInfo({ ...shippingInfo, [e.target.name]: e.target.value });
  };

  const handleOrder = async () => {
    if (!auth.currentUser) return alert("Please login to place order!");
    if (cartItems.length === 0) return alert("Cart is empty!");
    
    setLoading(true);

    try {
      // 1️⃣ Add order to Firestore
      await addDoc(collection(db, "orders"), {
        userId: auth.currentUser.uid,
        items: cartItems,
        shippingAddress: shippingInfo,
        subtotal,
        shipping,
        total: totalAmount,
        paymentMethod: "cod",
        status: "pending",
        createdAt: serverTimestamp(),
      });

      // 2️⃣ Clear Redux cart
      dispatch(clearCartItem());

      // 3️⃣ Success alert
      alert("Order placed successfully!");

      // 4️⃣ Redirect to dashboard
      navigate("/dashboard");
    } catch (err) {
      console.error("Order placement error:", err);
      alert("Order failed! Check console.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>

      {/* Shipping Form */}
      <div className="bg-white p-6 rounded-xl shadow space-y-4 mb-6">
        <input className="input" placeholder="Full Name" name="fullName" value={shippingInfo.fullName} onChange={handleChange} />
        <input className="input" placeholder="Email" name="email" value={shippingInfo.email} onChange={handleChange} />
        <input className="input" placeholder="Phone" name="phone" value={shippingInfo.phone} onChange={handleChange} />
        <input className="input" placeholder="Address" name="address" value={shippingInfo.address} onChange={handleChange} />
        <input className="input" placeholder="City" name="city" value={shippingInfo.city} onChange={handleChange} />
        <input className="input" placeholder="Postal Code" name="postalCode" value={shippingInfo.postalCode} onChange={handleChange} />
      </div>

      {/* Cart Items */}
      <div className="bg-white p-6 rounded-xl shadow mb-6">
        <h2 className="font-bold text-xl mb-4">Your Order</h2>
        {cartItems.map((item) => (
          <div key={item.id} className="flex justify-between py-2 border-b">
            <p>{item.name} x {item.qun}</p>
            <p>{item.price * item.qun} TK</p>
          </div>
        ))}
        <div className="flex justify-between font-bold mt-4">
          <span>Total:</span>
          <span>{totalAmount} TK</span>
        </div>
      </div>

      {/* Place Order Button */}
      <button
        onClick={handleOrder}
        disabled={loading || cartItems.length === 0}
        className="bg-green-600 text-white py-3 px-6 rounded-xl font-bold w-full"
      >
        {loading ? "Placing Order..." : "Place Order (COD)"}
      </button>
    </div>
  );
};

export default Checkout;
