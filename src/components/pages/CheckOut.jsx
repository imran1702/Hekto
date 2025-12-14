import React, { useState, useEffect } from "react";
import Container from "../Container";
import { useSelector, useDispatch } from "react-redux"; // useDispatch যোগ করা হয়েছে
import { Link, useNavigate } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";

// 🔥 Firebase Imports
import { db, auth } from "../../firebase.config"; // ⚠️ আপনার firebase.config ফাইলের সঠিক পাথ দিন
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

// 🔥 Redux Action Import
import { clearCartItem } from "../slices/productSlice"; // ⚠️ আপনার productSlice ফাইলের সঠিক পাথ দিন

const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch(); // useDispatch initialize করা হয়েছে
  const [currentUser, setCurrentUser] = useState(null); // ইউজার স্টেট

  // 🚪 ইউজার লগইন আছে কিনা চেক করার জন্য useEffect
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  // Redux থেকে কার্টের ডাটা আনা
  const cartItems = useSelector((state) => state.product.cartItem);

  // কার্টের টোটাল ক্যালকুলেশন
  let { totalPrice, totalDisAmount, totalQuantity } = cartItems.reduce(
    (acc, item) => {
      acc.totalPrice += item.price * item.qun;
      acc.totalDisAmount += (item.price - item.discount_price || 0) * item.qun;
      acc.totalQuantity += item.qun;
      return acc;
    },
    { totalPrice: 0, totalQuantity: 0, totalDisAmount: 0 }
  );

  const grandTotal = totalPrice - totalDisAmount;
  const shippingCost = 50;

  // ফর্ম স্টেট
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
  });

  // এরর মেসেজ স্টেট
  const [errors, setErrors] = useState({});

  // ইনপুট হ্যান্ডেল করা
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  // ভ্যালিডেশন লজিক (আগের মতোই রাখা হয়েছে)
  const validateForm = () => {
    let newErrors = {};
    let isValid = true;

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!emailPattern.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
      isValid = false;
    }

    if (!formData.phone) {
      newErrors.phone = "Phone number is required";
      isValid = false;
    } else if (formData.phone.length !== 11) {
      newErrors.phone = "Phone number must be exactly 11 digits";
      isValid = false;
    } else if (!/^\d+$/.test(formData.phone)) {
      newErrors.phone = "Phone number contains only numbers";
      isValid = false;
    }

    if (!formData.firstName) {
      newErrors.firstName = "First name is required";
      isValid = false;
    }
    if (!formData.address) {
      newErrors.address = "Address is required";
      isValid = false;
    }
    if (!formData.city) {
      newErrors.city = "City is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // 🔥 ফর্ম সাবমিট হ্যান্ডলার - Firebase এ ডাটা সেভ এবং ড্যাশবোর্ডে রিডাইরেক্ট
  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    // ১. ইউজার লগইন চেক
    if (!currentUser) {
      alert("Please login to place an order.");
      navigate("/login"); // লগইন পেজে রিডাইরেক্ট
      return;
    }

    if (validateForm()) {
      try {
        // ২. অর্ডারের ডাটা তৈরি করা
        const orderInfo = {
          userId: currentUser.uid,
          customerName: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          phone: formData.phone,
          shippingAddress: {
            address: formData.address,
            city: formData.city,
            postalCode: formData.postalCode,
          },
          products: cartItems.map((item) => ({
            id: item.id,
            name: item.name,
            qun: item.qun,
            price: item.price,
            discount_price: item.discount_price,
            subtotal: (item.price * item.qun).toFixed(2),
          })), // শুধু প্রয়োজনীয় ডাটা রাখা হলো
          totalAmount: (grandTotal + shippingCost).toFixed(2), // মোট টাকা
          totalQuantity: totalQuantity,
          status: "Pending", // অর্ডারের ডিফল্ট স্ট্যাটাস
          createdAt: serverTimestamp(),
        };

        // ৩. Firebase Firestore-এর 'orders' কালেকশনে ডাটা পাঠানো
        await addDoc(collection(db, "orders"), orderInfo);

        // ৪. সফল হলে কার্ট খালি করা এবং ড্যাশবোর্ডে রিডাইরেক্ট করা
        alert("Order Placed Successfully!");
        dispatch(clearCartItem()); // Redux থেকে কার্ট ক্লিয়ার
        navigate("/dashboard"); // ⚠️ আপনার ড্যাশবোর্ড রাউট এখানে দিতে হবে
      } catch (error) {
        console.error("Order Placement Error:", error);
        alert(
          "Something went wrong while placing the order. Please try again."
        );
      }
    } else {
      console.log("Validation Failed");
    }
  };

  // যদি কার্ট খালি থাকে তাহলে চেকআউট পেজ দেখাবে না
  if (cartItems.length === 0) {
    return (
      <Container>
        <div className="py-20 text-center">
          <h2 className="text-2xl font-bold text-[#1D3178] mb-4">
            Your cart is empty
          </h2>
          <Link
            to="/products"
            className="bg-[#FB2E86] text-white px-6 py-2 rounded"
          >
            Go to Shop
          </Link>
        </div>
      </Container>
    );
  }

  return (
    <div className="py-16 bg-white">
      <Container>
        <h1 className="text-[#1D3178] text-2xl md:text-3xl font-bold font-josefin mb-8">
          Billing Details
        </h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* বাম পাশ - বিলিং ফর্ম */}
          <div className="w-full lg:w-2/3 bg-[#F8F8FD] p-6 rounded-md">
            <form onSubmit={handlePlaceOrder}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* First Name */}
                <div>
                  <label className="block text-[#1D3178] font-semibold mb-2 font-lato">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className={`w-full p-3 border rounded focus:outline-none focus:border-[#FB2E86] ${
                      errors.firstName ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="First name"
                  />
                  {errors.firstName && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.firstName}
                    </p>
                  )}
                </div>

                {/* Last Name */}
                <div>
                  <label className="block text-[#1D3178] font-semibold mb-2 font-lato">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-[#FB2E86]"
                    placeholder="Last name"
                  />
                </div>
              </div>

              {/* Email & Phone */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-[#1D3178] font-semibold mb-2 font-lato">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full p-3 border rounded focus:outline-none focus:border-[#FB2E86] ${
                      errors.email ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="example@gmail.com"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label className="block text-[#1D3178] font-semibold mb-2 font-lato">
                    Phone Number
                  </label>
                  <input
                    type="number"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={`w-full p-3 border rounded focus:outline-none focus:border-[#FB2E86] ${
                      errors.phone ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="01XXXXXXXXX"
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                  )}
                </div>
              </div>

              {/* Address */}
              <div className="mb-6">
                <label className="block text-[#1D3178] font-semibold mb-2 font-lato">
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className={`w-full p-3 border rounded focus:outline-none focus:border-[#FB2E86] ${
                    errors.address ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="House number and street name"
                />
                {errors.address && (
                  <p className="text-red-500 text-sm mt-1">{errors.address}</p>
                )}
              </div>

              {/* City & Post Code */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-[#1D3178] font-semibold mb-2 font-lato">
                    City / Town
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className={`w-full p-3 border rounded focus:outline-none focus:border-[#FB2E86] ${
                      errors.city ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Dhaka"
                  />
                  {errors.city && (
                    <p className="text-red-500 text-sm mt-1">{errors.city}</p>
                  )}
                </div>

                <div>
                  <label className="block text-[#1D3178] font-semibold mb-2 font-lato">
                    Post Code
                  </label>
                  <input
                    type="text"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-[#FB2E86]"
                    placeholder="1200"
                  />
                </div>
              </div>

              <div className="mt-8">
                <button
                  type="submit"
                  className="bg-[#FB2E86] hover:bg-[#F94C9B] text-white font-bold font-josefin py-3 px-8 rounded w-full transition duration-300"
                >
                  Place Order
                </button>
              </div>
            </form>
          </div>

          {/* ডান পাশ - অর্ডার সামারি */}
          <div className="w-full lg:w-1/3">
            <div className="bg-[#F4F4FC] p-6 rounded-md">
              <h2 className="text-[#1D3178] text-xl font-bold font-josefin mb-6 border-b pb-2 border-[#E1E1E4]">
                Order Summary
              </h2>

              <div className="flex flex-col gap-4 mb-6 max-h-[300px] overflow-y-auto pr-2">
                {cartItems.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center border-b border-[#E1E1E4] pb-2"
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <img
                          src={item.image_path || item.thumbnail}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded"
                        />
                        <span className="absolute -top-2 -right-2 bg-[#FB2E86] text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                          {item.qun}
                        </span>
                      </div>
                      <div>
                        <h4 className="text-[#1D3178] text-sm font-bold font-josefin">
                          {item.name?.substring(0, 15)}...
                        </h4>
                        <p className="text-[#A1A8C1] text-xs">
                          Color: {item.finish || "N/A"}
                        </p>
                      </div>
                    </div>
                    <p className="text-[#151875] font-bold text-sm">
                      {(item.price * item.qun).toFixed(2)} TK
                    </p>
                  </div>
                ))}
              </div>

              <div className="bg-white p-4 rounded-md shadow-sm">
                <div className="flex justify-between items-center mb-4 border-b border-[#E1E1E4] pb-2">
                  <span className="text-[#1D3178] font-semibold font-lato">
                    Subtotal:
                  </span>
                  <span className="text-[#151875] font-bold">
                    {totalPrice.toFixed(2)} TK
                  </span>
                </div>
                <div className="flex justify-between items-center mb-4 border-b border-[#E1E1E4] pb-2">
                  <span className="text-[#1D3178] font-semibold font-lato">
                    Discount:
                  </span>
                  <span className="text-red-500 font-bold">
                    - {totalDisAmount.toFixed(2)} TK
                  </span>
                </div>
                <div className="flex justify-between items-center mb-4 border-b border-[#E1E1E4] pb-2">
                  <span className="text-[#1D3178] font-semibold font-lato">
                    Shipping:
                  </span>
                  <span className="text-[#151875] font-bold">
                    {shippingCost.toFixed(2)} TK
                  </span>
                </div>
                <div className="flex justify-between items-center pt-2">
                  <span className="text-[#1D3178] text-lg font-bold font-josefin">
                    Total:
                  </span>
                  <span className="text-[#FB2E86] text-lg font-bold">
                    {(grandTotal + shippingCost).toFixed(2)} TK
                  </span>
                </div>
              </div>

              <div className="mt-6 flex items-start gap-2">
                <FaCheckCircle className="text-[#19D16F] mt-1 shrink-0" />
                <p className="text-[#8A8FB9] text-xs font-lato">
                  Shipping & taxes calculated at checkout. By placing your
                  order, you agree to our Terms of Service.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Checkout;
