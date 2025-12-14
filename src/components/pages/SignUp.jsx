import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import {
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
  signOut,
  createUserWithEmailAndPassword, // নতুন: ইমেইল/পাসওয়ার্ড সাইনআপের জন্য
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore"; // Firestore
import { auth, db } from "../../firebase.config"; // Firestore এবং Auth ইমপোর্ট করুন
import Container from "../Container"; // ধরে নিলাম Container কম্পোনেন্ট একই ফোল্ডারে আছে
import { FaFacebook } from "react-icons/fa";

// *** ১. Firestore এ ইউজার ডেটা সেভ/আপডেট করার ফাংশন ***
const saveUserToDB = async (user, additionalData = {}) => {
  // Firestore এ 'users' কালেকশনের মধ্যে ইউজার আইডি (uid) কে ডকুমেন্ট আইডি হিসেবে ব্যবহার করা হচ্ছে
  const userDocRef = doc(db, "users", user.uid);

  // সেভ করার জন্য ডেটা অবজেক্ট
  const userData = {
    uid: user.uid,
    displayName: user.displayName || additionalData.fullName || "", // Social বা Form থেকে নাম
    email: user.email,
    photoURL: user.photoURL || "",
    providerId: user.providerId, // লগইন পদ্ধতি
    createdAt: user.metadata.creationTime, // অ্যাকাউন্ট তৈরির সময়
    lastSignInTime: user.metadata.lastSignInTime, // শেষ লগইন সময়
    ...additionalData, // ইমেইল সাইনআপের অতিরিক্ত তথ্য (phone, address ইত্যাদি)
  };

  try {
    // setDoc ব্যবহার করা হচ্ছে, যা ডেটা সেভ করে। merge: true মানে Existing data ঠিক রেখে নতুন/আপডেট করা ডেটা যোগ করা হবে।
    await setDoc(userDocRef, userData, { merge: true });
    console.log("User data successfully saved/updated in Firestore!");
  } catch (e) {
    console.error("Error writing document to Firestore: ", e);
  }
};

const SignUp = () => {
  let navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ইমেইল এবং পাসওয়ার্ড দিয়ে সাইনআপ হ্যান্ডেলার
  const handleEmailSignUp = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      // Firebase Auth এ ইউজার তৈরি করা
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const loggedUser = userCredential.user;
      setUser(loggedUser);

      // Firestore এ ইউজার ডেটা সেভ করা
      await saveUserToDB(loggedUser, {
        fullName: formData.fullName,
        providerId: "password",
      });

      console.log("Email SignUp Success:", loggedUser);
      // সফল হলে অন্য পেজে রিডাইরেক্ট করতে পারেন: navigate('/home');
    } catch (err) {
      console.error("Email SignUp Error:", err.message);
      setError(err.message);
    }
  };

  // *** ২. Google দিয়ে লগইন ফাংশন (Social Login) ***
  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const loggedUser = result.user;
      setUser(loggedUser);
      navigate("/dashboard");
      // Firestore এ ডেটা সেভ/আপডেট
      await saveUserToDB(loggedUser);
    } catch (err) {
      console.error("Google Error:", err.message);
      setError(err.message);
    }
  };

  // *** ৩. Facebook দিয়ে লগইন ফাংশন (Social Login) ***
  const handleFacebookLogin = async () => {
    const provider = new FacebookAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const loggedUser = result.user;
      setUser(loggedUser);

      // Firestore এ ডেটা সেভ/আপডেট
      await saveUserToDB(loggedUser);
    } catch (err) {
      console.error("Facebook Error:", err.message);
      setError(err.message);
    }
  };

  // লগআউট ফাংশন (অপশনাল)
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        setUser(null);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <section className="py-10">
      <Container>
        <div className="w-full md:w-2/3 lg:w-1/3 mx-auto">
          <h2 className="text-[26px] text-black font-bold font-josefin pb-2 text-center">
            {user ? "Account Created!" : "Create Account"}
          </h2>
          <p className="text-[17px] text-[#9096B2] font-medium font-lato pb-6 text-center">
            {user
              ? `Welcome, ${user.displayName || user.email}! You are logged in.`
              : "Please fill the information below or use social media to create your account."}
          </p>

          {/* Error Message */}
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}

          {/* Logged in view (Optional: For testing) */}
          {user && (
            <div className="text-center mb-6">
              <button
                onClick={handleLogout}
                className="bg-gray-500 text-white py-2 px-4 rounded"
              >
                Sign Out
              </button>
            </div>
          )}

          {/* Form for Email/Password Signup */}
          <form className="max-w-[432px] mx-auto" onSubmit={handleEmailSignUp}>
            <input
              type="text"
              required
              name="fullName"
              placeholder="Full Name"
              onChange={handleInputChange}
              value={formData.fullName}
              className="w-full px-4 py-2 border-2 border-[#0000004e] rounded-[5px] outline-0 focus:border-[#5353c5a3] mb-4"
            />
            <input
              type="email"
              required
              name="email"
              autoComplete="email"
              placeholder="Email Address"
              onChange={handleInputChange}
              value={formData.email}
              className="w-full px-4 py-2 border-2 border-[#0000004e] rounded-[5px] outline-0 focus:border-[#5353c5a3] mb-4"
            />
            <input
              type="password"
              required
              name="password"
              autoComplete="new-password"
              placeholder="Password"
              onChange={handleInputChange}
              value={formData.password}
              className="w-full px-4 py-2 border-2 border-[#0000004e] rounded-[5px] outline-0 focus:border-[#5353c5a3] mb-4"
            />
            <input
              type="password"
              required
              name="confirmPassword"
              autoComplete="new-password"
              placeholder="Confirm Password"
              onChange={handleInputChange}
              value={formData.confirmPassword}
              className="w-full px-4 py-2 border-2 border-[#0000004e] rounded-[5px] outline-0 focus:border-[#5353c5a3] mb-4"
            />
            <button
              type="submit"
              className="w-full text-center py-2 text-[#fff] text-[17px] font-bold font-lato bg-[#FB2E86] rounded-[5px] mt-6 hover:bg-[#aa2760] cursor-pointer mb-6"
            >
              Sign Up
            </button>
          </form>

          {/* Social Login Buttons */}
          <div className="text-center mb-6">
            <p className="text-[17px] text-[#9096B2] font-medium font-lato mb-4">
              Or Sign Up with
            </p>
            <button
              onClick={handleGoogleLogin}
              className="py-2 px-6 text-5xl text-white font-bold rounded-[5px] hover:bg-[#e3e3e3] mr-4 transition duration-200"
            >
              <FcGoogle />
            </button>
            <button
              onClick={handleFacebookLogin}
              className="py-2 px-6 text-5xl text-[#32518e] font-bold rounded-[5px] hover:bg-[#e3e3e3] transition duration-200"
            >
              <FaFacebook />
            </button>
          </div>

          <div className="text-center">
            <Link
              to={"/login"}
              target="_top"
              className="text-[17px] text-[#9096B2] font-medium font-lato hover:underline"
            >
              Already have an account? Login
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default SignUp;
