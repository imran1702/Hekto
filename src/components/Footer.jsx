import React, { useContext, useEffect, useState } from "react";
import Container from "./Container";
import logo from "../assets/Hekto.png";
import { ApiData } from "./ContextApi";
import { Link, useNavigate } from "react-router-dom"; // useNavigate ইমপোর্ট করা হলো
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

// ⭐️ Firebase Auth Imports
import { onAuthStateChanged, createUserWithEmailAndPassword } from "firebase/auth"; // createUserWithEmailAndPassword ইমপোর্ট করা হলো
import { auth } from "../firebase.config"; 
// Firestore সেভের জন্য:
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase.config"; 

import { RiContactsLine } from "react-icons/ri";


// *** Firestore এ ইউজার ডেটা সেভ/আপডেট করার ফাংশন ***
const saveUserToDB = async (user, additionalData = {}) => {
    // এই ফাংশনটি Footer-এর ক্ষেত্রে শুধুমাত্র email ও uid সেভ করবে, কারণ অন্যান্য তথ্য এখানে নেই।
    const userDocRef = doc(db, "users", user.uid); 
    
    const userData = {
        uid: user.uid,
        email: user.email,
        providerId: 'password', // Email/Password সাইন আপ
        createdAt: user.metadata.creationTime, 
        ...additionalData
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
    let navigate = useNavigate(); // useNavigate ইনিশিয়ালাইজ করা হলো
    let [showCategory, setShowCategory] = useState([]);
    const [loggedInUser, setLoggedInUser] = useState(null);
    
    // ⭐️ নতুন স্টেট: ফুটার সাইন আপ ইনপুট হ্যান্ডেল করার জন্য
    const [emailInput, setEmailInput] = useState('');
    const [signupError, setSignupError] = useState('');
    const [signupSuccess, setSignupSuccess] = useState('');

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
        setSignupError('');
        setSignupSuccess('');

        if (!emailInput) {
            setSignupError("Please enter a valid email address.");
            return;
        }

        // ফুটার সাইন আপে পাসওয়ার্ড নেওয়ার ব্যবস্থা নেই, তাই আমরা একটি ডিফল্ট পাসওয়ার্ড ব্যবহার করব। 
        // **সতর্কতা:** রিয়েল অ্যাপ্লিকেশনে এভাবে হার্ডকোডেড পাসওয়ার্ড ব্যবহার করা উচিত নয়।
        // তবে এই উদাহরণে, যেহেতু ফর্মে পাসওয়ার্ড ফিল্ড নেই, তাই এই পদ্ধতি অনুসরণ করা হলো।
        // ইউজারকে পরবর্তীতে পাসওয়ার্ড রিসেট করতে বলা উচিত।
        const dummyPassword = "defaultSecurePassword123"; 

        try {
            // Firebase Auth এ ইউজার তৈরি করা
            const userCredential = await createUserWithEmailAndPassword(auth, emailInput, dummyPassword);
            const newUser = userCredential.user;

            // Firestore এ ইউজার ডেটা সেভ করা
            await saveUserToDB(newUser);

            setSignupSuccess("Account created successfully! Please proceed to login.");
            setEmailInput('');

            // সফল হলে ইউজারকে লগইন পেজে রিডাইরেক্ট করা
            navigate('/login'); 

        } catch (err) {
            console.error("Footer Sign Up Error:", err.message);
            // Firebase এর নির্দিষ্ট ত্রুটি মেসেজ দেখানো
            if (err.code === 'auth/email-already-in-use') {
                 setSignupError("This email is already registered. Please login.");
            } else if (err.code === 'auth/invalid-email') {
                 setSignupError("Invalid email format.");
            } else {
                 setSignupError(err.message);
            }
        }
    };


    return (
        <section className="bg-[#EEEFFB]">
            <Container>
                <div className="grid md:grid-cols-4 grid-cols-2 text-[13px] md:text-[16px] py-15">
                    <div className="col-span-2 md:col-span-1 mb-3 md:mb-0">
                        <div className="">
                            <img src={logo} alt="" />
                        </div>
                        
                        {/* ⭐️ ফর্ম ও ইনপুট আপডেট করা হলো */}
                        <form onSubmit={handleFooterSignUp} className="my-5">
                            <input
                                className="bg-[#fff] py-2 md:ps-2 md:pr-7"
                                type="email"
                                placeholder="Enter Email Address"
                                value={emailInput}
                                onChange={(e) => setEmailInput(e.target.value)}
                                required
                            />
                            <button 
                                type="submit"
                                className="bg-[#FB2E86] text-[#EEEFFB] py-2 px-4"
                            >
                                Sing Up
                            </button>
                        </form>

                        {/* ⭐️ সাইন আপ মেসেজ */}
                        {signupError && <p className="text-red-500 text-[14px]">{signupError}</p>}
                        {signupSuccess && <p className="text-green-600 text-[14px]">{signupSuccess}</p>}
                        
                        <p className="text-[#8A8FB9] mt-3">Contact Info</p>
                        <p className="text-[#8A8FB9]">
                            17 Princess Road, London, Greater London NW1 8JR, UK
                        </p>
                    </div>

                    {/* Catagories (unchanged) */}
                    <div className="mx-auto md:text-start ">
                        <h2 className="font-jose md:mb-5 mb-2 md:text-[22px]">
                            Catagories
                        </h2>
                        <ul className="font-lato capitalize md:text-[16px] text-[#8A8FB9]">
                            {showCategory.map((item) => (
                                <li className="mb-2" key={item}>
                                    <Link>{item}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    
                    {/* Customer Care (Auth State Check - My Account/Login) */}
                    <div className="md:mx-auto">
                        <h2 className="font-jose md:mb-5 mb-2 md:text-[22px]">
                            Customer Care
                        </h2>
                        <ul className="font-lato capitalize md:text-[16px] text-[#8A8FB9]">
                            <li className="mb-2">
                                {/* ⭐️ Auth স্টেট অনুযায়ী লিংক আপডেট করা হলো */}
                                <Link to={loggedInUser ? "/dashboard" : "/login"}>
                                    <div className="flex items-center">
                                        <p>
                                            {loggedInUser ? "My Account" : "Login"}
                                        </p>
                                        <RiContactsLine />
                                    </div>
                                </Link>
                            </li>
                            <li className="mb-2">Discount</li>
                            <li className="mb-2">Returns</li>
                            <li className="mb-2">Orders History</li>
                            <li className="mb-2">Order Tracking</li>
                        </ul>
                    </div>

                    {/* Pages (unchanged) */}
                    <div className="md:mx-auto hidden md:block">
                        <h2 className="font-jose md:mb-5 mb-2 md:text-[22px]">Pages</h2>
                        <ul className="font-lato capitalize md:text-[16px] text-[#8A8FB9]">
                            <li className="mb-2">
                                <Link to="/blog">Blog</Link>
                            </li>
                            <li className="mb-2">Browse the Shop</li>
                            <li className="mb-2">Category</li>
                            <li className="mb-2">Pre-Built Pages</li>
                            <li className="mb-2">Visual Composer Elements</li>
                            <li className="mb-2">WooCommerce Pages</li>
                        </ul>
                    </div>
                </div>
            </Container>
            {/* Footer Bottom (unchanged) */}
            <div className="bg-[#E7E4F8] py-3">
                <Container>
                    <div className="flex justify-around items-center">
                        <div className="">
                            <h5 className="font-lato text-[#9DA0AE]">
                                ©Webecy - All Rights Reserved
                            </h5>
                        </div>
                        <div className="">
                            <ul className="flex gap-3 text-[18px]">
                                <li>
                                    <Link>
                                        <FaFacebook />
                                    </Link>
                                </li>
                                <li>
                                    <Link>
                                        <FaInstagram />
                                    </Link>
                                </li>
                                <li>
                                    <Link>
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