// BottomNav.jsx

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { CiShoppingCart } from "react-icons/ci";
import { RiContactsLine } from "react-icons/ri";
import { useSelector } from "react-redux";
// ধরে নিলাম আপনার firebase.config ফাইলের সঠিক পাথ আছে এবং এতে 'auth' এক্সপোর্ট করা আছে
import { auth } from "../firebase.config";
import { onAuthStateChanged } from "firebase/auth";

const BottomNav = () => {
  // Redux থেকে কার্ট আইটেমের সংখ্যা নেওয়া
  const cartItems = useSelector((state) => state.product.cartItem);
  const cartCount = cartItems ? cartItems.length : 0; // 🎯 নতুন State: ইউজারের তথ্য এবং লগইন স্ট্যাটাস ট্র্যাক করার জন্য

  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    // Firebase Auth State Observer সেট করা
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // ইউজার লগইন করা থাকলে
        setCurrentUser(user);
      } else {
        // ইউজার লগইন করা না থাকলে
        setCurrentUser(null);
      }
    }); // Component unmount হলে observer বন্ধ করা

    return () => unsubscribe();
  }, []); // নেভিগেশন পাথ নির্ধারণ

  const accountPath = currentUser ? "/dashboard" : "/login"; // 'sm:hidden' ক্লাস নিশ্চিত করে যে এই নেভিগেশন বারটি শুধু ছোট ডিভাইসে দেখা যাবে

  return (
    <div className="fixed bottom-0 z-50 flex justify-around w-full h-14 bg-white border-t border-gray-200 shadow-lg sm:hidden">
      {/* Home Link */}
      <Link
        to="/"
        className="flex flex-col items-center justify-center text-gray-700 hover:text-[#FB2E86] transition-colors"
      >
        <FaHome className="text-xl" />
        <span className="text-xs mt-0.5">Home</span>
      </Link>
      {/* Cart Link */}
      <Link
        to="/cart"
        className="flex flex-col items-center justify-center text-gray-700 hover:text-[#FB2E86] transition-colors relative"
      >
        <CiShoppingCart className="text-2xl" />
        <span className="text-xs mt-0.5">Cart</span>
        {/* Cart Count Badge */}
        {cartCount > 0 && (
          <span className="absolute top-1 right-2 w-4 h-4 bg-[#FB2E86] text-white text-[10px] rounded-full flex items-center justify-center font-bold">
            {cartCount}
          </span>
        )}
      </Link>
      {/* Account/Dashboard Link - Logic Updated */}
      <Link
        to={accountPath}
        className="flex flex-col items-center justify-center text-gray-700 hover:text-[#FB2E86] transition-colors"
      >
        {currentUser && currentUser.photoURL ? (
          // User logged in and has a profile picture
          <img
            src={currentUser.photoURL}
            alt="User" // ছোট গোল করে ছবি দেখানোর জন্য স্টাইল
            className="w-6 h-6 rounded-full object-cover border border-[#FB2E86]"
          />
        ) : (
          // User not logged in OR logged in but no photoURL
          <RiContactsLine className="text-xl" />
        )}
        <span className="text-xs mt-0.5">Account</span>
      </Link>
    </div>
  );
};

export default BottomNav;
