import React, { useContext, useEffect, useState } from "react";
import Container from "./Container";
import logo from "../assets/Hekto.png";
import { ApiData } from "./ContextApi";
import { Link, useNavigate } from "react-router-dom";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

// ⭐️ Firebase Auth Imports
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../firebase.config";
// Firestore সেভের জন্য:
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase.config";

import { RiContactsLine } from "react-icons/ri";

// *** Firestore এ ইউজার ডেটা সেভ/আপডেট করার ফাংশন ***
const saveUserToDB = async (user, additionalData = {}) => {
  const userDocRef = doc(db, "users", user.uid);

  const userData = {
    uid: user.uid,
    email: user.email,
    providerId: "password", // Email/Password সাইন আপ
    createdAt: user.metadata.creationTime,
    ...additionalData,
  };

  try {
    await setDoc(userDocRef, userData, { merge: true });
    console.log("New user data saved in Firestore from Footer Sign Up!");
  } catch (e) {
    console.error("Error writing document to Firestore: ", e);
  }
};

const Footer = () => {
  let data = useContext(ApiData);
  let navigate = useNavigate();
  let [showCategory, setShowCategory] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState(null);

  // ⭐️ নতুন স্টেট: ফুটার সাইন আপ ইনপুট হ্যান্ডেল করার জন্য
  const [emailInput, setEmailInput] = useState("");
  const [signupError, setSignupError] = useState("");
  const [signupSuccess, setSignupSuccess] = useState("");

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      setLoggedInUser(user);
    });

    let categoryList = [...new Set(data.info.map((item) => item.category))];
    setShowCategory(categoryList);

    // Cleanup function for auth listener
    return () => unsubscribeAuth();
  }, [data]);

  // ⭐️ নতুন ফাংশন: ইমেইল সাইন আপ হ্যান্ডেল করা
  const handleFooterSignUp = async (e) => {
    e.preventDefault();
    setSignupError("");
    setSignupSuccess("");

    if (!emailInput) {
      setSignupError("Please enter a valid email address.");
      return;
    }

    const dummyPassword = "defaultSecurePassword123";

    try {
      // Firebase Auth এ ইউজার তৈরি করা
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        emailInput,
        dummyPassword
      );
      const newUser = userCredential.user;

      // Firestore এ ইউজার ডেটা সেভ করা
      await saveUserToDB(newUser);

      setSignupSuccess("Account created successfully! Redirecting to login...");
      setEmailInput("");

      // সফল হলে ইউজারকে লগইন পেজে রিডাইরেক্ট করা
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (err) {
      console.error("Footer Sign Up Error:", err.message);
      // Firebase এর নির্দিষ্ট ত্রুটি মেসেজ দেখানো
      if (err.code === "auth/email-already-in-use") {
        setSignupError("This email is already registered. Please login.");
      } else if (err.code === "auth/invalid-email") {
        setSignupError("Invalid email format.");
      } else {
        setSignupError(
          "Sign up failed. Please check your network or try again."
        );
      }
    }
  };

  return (
    <section className="bg-[#EEEFFB]">
      <Container>
        {/* রেসপনসিভ গ্রিড লেআউট */}
        <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-y-10 py-10 md:py-20 text-[13px] md:text-[16px]">
          {/* Column 1: Logo & Signup Form */}
          <div className="col-span-2 md:col-span-1 pr-4">
            <div className="w-[120px] mb-4">
              <img src={logo} alt="Hekto Logo" className="w-full" />
            </div>

            {/* ⭐️ ফর্ম ও ইনপুট আপডেট করা হলো - ফ্লেক্স এবং রেসপনসিভ উইডথ */}
            <form onSubmit={handleFooterSignUp} className="my-5 flex w-full">
              <input
                className="bg-[#fff] py-2 px-2 flex-grow min-w-0 focus:outline-none"
                type="email"
                placeholder="Enter Email Address"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                required
              />
              <button
                type="submit"
                className="bg-[#FB2E86] text-[#EEEFFB] py-2 px-3 md:px-4 text-sm font-semibold flex-shrink-0 hover:bg-[#ff559f] transition-colors"
              >
                Sign Up
              </button>
            </form>

            {/* ⭐️ সাইন আপ মেসেজ */}
            {signupError && (
              <p className="text-red-500 text-sm mt-1">{signupError}</p>
            )}
            {signupSuccess && (
              <p className="text-green-600 text-sm mt-1">{signupSuccess}</p>
            )}

            <p className="text-[#8A8FB9] mt-3">Contact Info</p>
            <p className="text-[#8A8FB9] text-sm">
              17 Princess Road, London, Greater London NW1 8JR, UK
            </p>
          </div>

          {/* Column 2: Categories */}
          <div className="mx-auto md:text-start pl-4 md:pl-0">
            <h2 className="font-jose md:mb-5 mb-3 md:text-[22px] text-lg text-[#0D0139] font-bold">
              Categories
            </h2>
            <ul className="font-lato capitalize md:text-[16px] text-[#8A8FB9] space-y-2">
              {showCategory.map((item) => (
                <li
                  key={item}
                  className="hover:text-[#FB2E86] transition-colors"
                >
                  <Link to={`/shop?category=${item}`}>{item}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Customer Care */}
          <div className="md:mx-auto pl-4 md:pl-0">
            <h2 className="font-jose md:mb-5 mb-3 md:text-[22px] text-lg text-[#0D0139] font-bold">
              Customer Care
            </h2>
            <ul className="font-lato capitalize md:text-[16px] text-[#8A8FB9] space-y-2">
              <li className="mb-2 hover:text-[#FB2E86] transition-colors">
                {/* ⭐️ Auth স্টেট অনুযায়ী লিংক আপডেট করা হলো */}
                <Link to={loggedInUser ? "/dashboard" : "/login"}>
                  <div className="flex items-center gap-1">
                    <p>{loggedInUser ? "My Account" : "Login"}</p>
                    <RiContactsLine className="text-xl" />
                  </div>
                </Link>
              </li>
              <li className="hover:text-[#FB2E86] transition-colors">
                <Link to="/discounts">Discount</Link>
              </li>
              <li className="hover:text-[#FB2E86] transition-colors">
                <Link to="/returns">Returns</Link>
              </li>
              <li className="hover:text-[#FB2E86] transition-colors">
                <Link to="/orders">Orders History</Link>
              </li>
              <li className="hover:text-[#FB2E86] transition-colors">
                <Link to="/tracking">Order Tracking</Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Pages (Hidden on small/extra small screens) */}
          <div className="md:mx-auto hidden lg:block pl-4 md:pl-0">
            <h2 className="font-jose md:mb-5 mb-3 md:text-[22px] text-lg text-[#0D0139] font-bold">
              Pages
            </h2>
            <ul className="font-lato capitalize md:text-[16px] text-[#8A8FB9] space-y-2">
              <li className="hover:text-[#FB2E86] transition-colors">
                <Link to="/blog">Blog</Link>
              </li>
              <li className="hover:text-[#FB2E86] transition-colors">
                <Link to="/shop">Browse the Shop</Link>
              </li>
              <li className="hover:text-[#FB2E86] transition-colors">
                <Link to="/category">Category</Link>
              </li>
              <li className="hover:text-[#FB2E86] transition-colors">
                <Link to="/pages">Pre-Built Pages</Link>
              </li>
              <li className="hover:text-[#FB2E86] transition-colors">
                <Link to="/elements">Visual Composer Elements</Link>
              </li>
              <li className="hover:text-[#FB2E86] transition-colors">
                <Link to="/woocommerce">WooCommerce Pages</Link>
              </li>
            </ul>
          </div>
        </div>
      </Container>

      {/* Footer Bottom */}
      <div className="bg-[#E7E4F8] py-3">
        <Container>
          <div className="flex flex-col sm:flex-row justify-between items-center text-center sm:text-left gap-2">
            <div className="">
              <h5 className="font-lato text-[#9DA0AE] text-sm md:text-base">
                ©Webecy - All Rights Reserved
              </h5>
            </div>
            <div className="flex justify-center">
              <ul className="flex gap-4 text-xl text-[#151875]">
                <li className="hover:text-[#FB2E86] transition-colors">
                  <Link to="https://facebook.com" target="_blank">
                    <FaFacebook />
                  </Link>
                </li>
                <li className="hover:text-[#FB2E86] transition-colors">
                  <Link to="https://instagram.com" target="_blank">
                    <FaInstagram />
                  </Link>
                </li>
                <li className="hover:text-[#FB2E86] transition-colors">
                  <Link to="https://twitter.com" target="_blank">
                    <FaTwitter />
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
};

export default Footer;
