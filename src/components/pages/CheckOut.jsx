// Checkout.jsx

import React, { useState, useEffect } from "react";
import Container from "../Container";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { FaCheckCircle, FaUserCircle, FaSpinner } from "react-icons/fa";
import { BiErrorCircle } from "react-icons/bi";

// 🔥 Firebase Imports
import { db, auth } from "../../firebase.config";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

// 🔥 Redux Action Import
import { clearCartItem } from "../slices/productSlice";

const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [currentUser, setCurrentUser] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false); // লোডিং স্টেট

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
      // discount_price না থাকলে ডিসকাউন্ট 0 ধরা হয়েছে
      acc.totalDisAmount +=
        (item.price - (item.discount_price || item.price)) * item.qun;
      acc.totalQuantity += item.qun;
      return acc;
    },
    { totalPrice: 0, totalQuantity: 0, totalDisAmount: 0 }
  );

  const grandTotal = totalPrice - totalDisAmount;
  const shippingCost = grandTotal > 0 ? 50 : 0; // যদি অর্ডার থাকে তবেই শিপিং কস্ট

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

  // ভ্যালিডেশন লজিক
  const validateForm = () => {
    let newErrors = {};
    let isValid = true;

    // Email Validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!emailPattern.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
      isValid = false;
    }

    // Phone Validation (Bangladeshi 11-digit pattern assumption: starting with 01 and 11 digits total)
    if (!formData.phone) {
      newErrors.phone = "Phone number is required";
      isValid = false;
    } else if (formData.phone.length !== 11) {
      newErrors.phone = "Phone number must be exactly 11 digits";
      isValid = false;
    } else if (!/^\d+$/.test(formData.phone)) {
      newErrors.phone = "Phone number contains only numbers";
      isValid = false;
    } else if (!/^01[3-9]\d{8}$/.test(formData.phone)) {
      // Added a more specific BD phone pattern check
      newErrors.phone =
        "Please enter a valid Bangladeshi 11-digit phone number (e.g. 01XXXXXXXXX)";
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

  // 🔥 ফর্ম সাবমিট হ্যান্ডলার
  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    if (!currentUser) {
      alert("Please login to place an order.");
      navigate("/login");
      return;
    }

    if (isProcessing) return; // ডাবল ক্লিক প্রিভেন্ট করা

    if (validateForm()) {
      setIsProcessing(true); // প্রসেসিং শুরু
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
            name: item.name || item.title,
            qun: item.qun,
            price: item.price,
            discount_price: item.discount_price,
            subtotal: (item.price * item.qun).toFixed(2),
          })),
          subTotal: totalPrice.toFixed(2),
          discountTotal: totalDisAmount.toFixed(2),
          shippingCost: shippingCost.toFixed(2),
          totalAmount: (grandTotal + shippingCost).toFixed(2), // মোট টাকা
          totalQuantity: totalQuantity,
          status: "Pending",
          createdAt: serverTimestamp(),
        };

        // ৩. Firebase Firestore-এর 'orders' কালেকশনে ডাটা পাঠানো
        await addDoc(collection(db, "orders"), orderInfo);

        // ৪. সফল হলে কার্ট খালি করা এবং ড্যাশবোর্ডে রিডাইরেক্ট করা
        alert(
          "Order Placed Successfully! You will be redirected to your dashboard."
        );
        dispatch(clearCartItem());
        navigate("/dashboard");
      } catch (error) {
        console.error("Order Placement Error:", error);
        alert(
          "Something went wrong while placing the order. Please try again. Check console for details."
        );
      } finally {
        setIsProcessing(false); // প্রসেসিং শেষ
      }
    } else {
      console.log("Validation Failed");
      // ভ্যালিডেশন ফেল হলে অটোমেটিক্যালি এরর মেসেজ দেখাবে।
    }
  };

  // যদি কার্ট খালি থাকে তাহলে চেকআউট পেজ দেখাবে না
  if (cartItems.length === 0) {
    return (
      <Container>
        <div className="py-20 text-center bg-white shadow-lg rounded-lg my-10">
          <BiErrorCircle className="inline-block text-6xl text-red-500 mb-4" />
          <h2 className="text-xl sm:text-2xl font-bold text-[#1D3178] mb-4 font-josefin">
            Your cart is empty! Cannot proceed to checkout.
          </h2>
          <Link
            to="/products"
            className="bg-[#FB2E86] text-white px-6 py-3 rounded-lg font-bold hover:bg-[#D7236E] transition shadow-md text-sm sm:text-base"
          >
            Go to Shop
          </Link>
        </div>
      </Container>
    );
  }

  return (
    <div className="py-8 sm:py-12 md:py-16 bg-[#F8F8FD]">
      <Container>
        <h1 className="text-[#1D3178] text-2xl md:text-4xl font-extrabold font-josefin mb-8 sm:mb-10">
          Billing Details
        </h1>

        {/* Login Status Alert */}
        {!currentUser ? (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-8 flex items-center gap-3"
            role="alert"
          >
            <FaUserCircle className="text-xl shrink-0" />
            <span className="block sm:inline font-semibold text-sm sm:text-base">
              You are not logged in. Please login to complete the order.
            </span>
            <Link
              to="/login"
              className="font-bold underline ml-auto text-red-700 hover:text-red-900 shrink-0 text-sm sm:text-base"
            >
              Login Now
            </Link>
          </div>
        ) : (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-8 flex items-center gap-3">
            <FaCheckCircle className="text-xl shrink-0" />
            <span className="block sm:inline font-semibold text-sm sm:text-base">
              Logged in as: **{currentUser.email}**
            </span>
          </div>
        )}

        {/* Main Layout: Order Summary (1/3) & Form (2/3) */}
        <div className="flex flex-col-reverse lg:flex-row gap-8">
          {/* ডান পাশ - অর্ডার সামারি (মোবাইলে উপরে থাকবে) */}
          <div className="w-full lg:w-1/3">
            {/* Added a margin-bottom for small screens to prevent overlap */}
            <div className="bg-white p-6 md:p-8 rounded-xl shadow-2xl lg:sticky lg:top-8 mb-8 lg:mb-0">
              <h2 className="text-[#1D3178] text-xl font-bold font-josefin mb-6 border-b pb-3 border-[#E1E1E4]">
                Your Order ({totalQuantity} Items)
              </h2>

              {/* Product List: max-h-48 helps with scrolling on small/medium heights */}
              <div className="flex flex-col gap-4 mb-6 max-h-48 overflow-y-auto pr-2">
                {cartItems.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center pb-2 border-b border-gray-100 last:border-b-0"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="relative shrink-0">
                        <img
                          src={item.image_path || item.thumbnail}
                          alt={item.name || item.title}
                          className="w-10 h-10 object-cover rounded-md border"
                        />
                        <span className="absolute -top-1 -right-1 bg-[#FB2E86] text-white text-xs w-4 h-4 flex items-center justify-center rounded-full font-bold">
                          {item.qun}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4
                          className="text-[#1D3178] text-sm font-bold font-josefin line-clamp-1 truncate"
                          title={item.name || item.title}
                        >
                          {item.name || item.title}
                        </h4>
                      </div>
                    </div>
                    <p className="text-[#151875] font-bold text-sm shrink-0 pl-2">
                      {(item.price * item.qun).toFixed(2)} TK
                    </p>
                  </div>
                ))}
              </div>

              {/* Totals Section */}
              <div className="bg-[#F8F8FD] p-4 rounded-lg shadow-inner border border-gray-200">
                <div className="flex justify-between items-center mb-3 border-b border-gray-300 pb-2">
                  <span className="text-[#1D3178] font-semibold font-lato text-sm sm:text-base">
                    Subtotal:
                  </span>
                  <span className="text-[#151875] font-bold text-sm sm:text-base">
                    {totalPrice.toFixed(2)} TK
                  </span>
                </div>
                <div className="flex justify-between items-center mb-3 border-b border-gray-300 pb-2">
                  <span className="text-red-500 font-semibold font-lato text-sm sm:text-base">
                    Discount:
                  </span>
                  <span className="text-red-500 font-bold text-sm sm:text-base">
                    - {totalDisAmount.toFixed(2)} TK
                  </span>
                </div>
                <div className="flex justify-between items-center mb-3 border-b border-gray-300 pb-2">
                  <span className="text-[#1D3178] font-semibold font-lato text-sm sm:text-base">
                    Shipping:
                  </span>
                  <span className="text-[#151875] font-bold text-sm sm:text-base">
                    {shippingCost.toFixed(2)} TK
                  </span>
                </div>
                <div className="flex justify-between items-center pt-3 border-t border-gray-300 mt-2">
                  <span className="text-[#1D3178] text-lg sm:text-xl font-bold font-josefin">
                    Grand Total:
                  </span>
                  <span className="text-[#FB2E86] text-lg sm:text-xl font-bold">
                    {(grandTotal + shippingCost).toFixed(2)} TK
                  </span>
                </div>
              </div>

              <div className="mt-6 flex items-start gap-2">
                <FaCheckCircle className="text-[#19D16F] mt-1 shrink-0 text-lg" />
                <p className="text-[#8A8FB9] text-xs sm:text-sm font-lato">
                  Your payment will be processed via Cash on Delivery (COD). By
                  placing your order, you agree to our **Terms of Service** and
                  **Privacy Policy**.
                </p>
              </div>
            </div>
          </div>

          {/* বাম পাশ - বিলিং ফর্ম (মোবাইলে নিচে থাকবে) */}
          <div className="w-full lg:w-2/3 bg-white p-6 md:p-8 rounded-xl shadow-2xl">
            <h2 className="text-[#1D3178] text-xl font-bold font-josefin mb-6 border-b pb-3">
              Shipping Information
            </h2>
            <form onSubmit={handlePlaceOrder}>
              {/* Name Fields: grid-cols-1 md:grid-cols-2 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* First Name */}
                {renderInputField({
                  label: "First Name",
                  name: "firstName",
                  type: "text",
                  placeholder: "First name",
                  value: formData.firstName,
                  onChange: handleInputChange,
                  error: errors.firstName,
                  required: true,
                })}

                {/* Last Name */}
                {renderInputField({
                  label: "Last Name",
                  name: "lastName",
                  type: "text",
                  placeholder: "Last name (Optional)",
                  value: formData.lastName,
                  onChange: handleInputChange,
                  error: errors.lastName,
                })}
              </div>

              {/* Contact Fields: grid-cols-1 md:grid-cols-2 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Email */}
                {renderInputField({
                  label: "Email Address",
                  name: "email",
                  type: "email",
                  placeholder: "example@gmail.com",
                  value: formData.email,
                  onChange: handleInputChange,
                  error: errors.email,
                  required: true,
                })}

                {/* Phone */}
                {renderInputField({
                  label: "Phone Number",
                  name: "phone",
                  type: "tel",
                  placeholder: "01XXXXXXXXX",
                  value: formData.phone,
                  onChange: handleInputChange,
                  error: errors.phone,
                  required: true,
                  maxLength: 11, // Added for UI/UX
                })}
              </div>

              {/* Address Field: mb-6 */}
              {renderInputField({
                label: "Address",
                name: "address",
                type: "text",
                placeholder: "House number and street name",
                value: formData.address,
                onChange: handleInputChange,
                error: errors.address,
                required: true,
                containerClass: "mb-6",
              })}

              {/* Location Fields: grid-cols-1 md:grid-cols-2 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* City */}
                {renderInputField({
                  label: "City / Town",
                  name: "city",
                  type: "text",
                  placeholder: "Dhaka",
                  value: formData.city,
                  onChange: handleInputChange,
                  error: errors.city,
                  required: true,
                })}

                {/* Post Code */}
                {renderInputField({
                  label: "Post Code",
                  name: "postalCode",
                  type: "text",
                  placeholder: "1200 (Optional)",
                  value: formData.postalCode,
                  onChange: handleInputChange,
                  error: errors.postalCode,
                })}
              </div>

              {/* Submit Button */}
              <div className="mt-10">
                <button
                  type="submit"
                  disabled={isProcessing} // প্রসেসিং চলাকালীন ডিসেবল
                  className={`font-bold font-josefin py-3 px-8 rounded-lg w-full flex items-center justify-center gap-2 transition duration-300 shadow-lg text-lg ${
                    isProcessing
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-[#19D16F] hover:bg-[#15b35c] text-white"
                  }`}
                >
                  {isProcessing ? (
                    <>
                      <FaSpinner className="animate-spin" /> Processing Order...
                    </>
                  ) : (
                    "Place Order"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </Container>
    </div>
  );
};

// Helper function to render a single input field (makes the form cleaner)
const renderInputField = ({
  label,
  name,
  type,
  placeholder,
  value,
  onChange,
  error,
  required,
  maxLength,
  containerClass = "",
}) => (
  <div className={containerClass}>
    <label className="block text-[#1D3178] font-semibold mb-2 font-lato text-sm sm:text-base">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className={`w-full p-3 border rounded-lg transition focus:ring-2 focus:ring-[#FB2E86] focus:border-[#FB2E86] text-sm sm:text-base ${
        error ? "border-red-500" : "border-gray-300"
      }`}
      placeholder={placeholder}
      maxLength={maxLength}
    />
    {error && (
      <p className="text-red-500 text-xs sm:text-sm mt-1 flex items-center gap-1">
        <BiErrorCircle className="shrink-0" /> {error}
      </p>
    )}
  </div>
);

export default Checkout;
