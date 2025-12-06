import React, { useState } from 'react';
import Container from '../Container';
import { Link, useNavigate } from 'react-router-dom';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'; // ⭐️ signInWithPopup ইমপোর্ট করা হলো
import { auth, db } from '../../firebase.config'; // ⭐️ db (Firestore) ইমপোর্ট করা হলো
import { doc, setDoc } from "firebase/firestore"; // ⭐️ Firestore-এর জন্য প্রয়োজনীয় ফাংশন ইমপোর্ট

// *** Firestore এ ইউজার ডেটা সেভ/আপডেট করার ফাংশন (যা আপনার SignUp কম্পোনেন্টেও ব্যবহার করেছেন) ***
// এই ফাংশনটি এখানে ডিফাইন করা আবশ্যক কারণ এটি handleGoogleLogin ফাংশনের ভিতরে কল করা হচ্ছে।
const saveUserToDB = async (user) => {
    const userDocRef = doc(db, "users", user.uid); 
    
    const userData = {
        uid: user.uid,
        displayName: user.displayName || 'Social User',
        email: user.email,
        photoURL: user.photoURL || '',
        providerId: user.providerId,
        lastSignInTime: new Date().toISOString(), 
    };

    try {
        await setDoc(userDocRef, userData, { merge: true }); 
        console.log("User data successfully saved/updated in Firestore!");
    } catch (e) {
        console.error("Error writing document to Firestore: ", e);
    }
};


const Login = () => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState('');
    let navigate = useNavigate();

    // Google Login Handler
    const handleGoogleLogin = async () => {
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            const loggedUser = result.user;
            setUser(loggedUser);
            
            // Firestore এ ডেটা সেভ/আপডেট করা
            await saveUserToDB(loggedUser); 

            // লগইন সফল হলে ড্যাশবোর্ডে রিডাইরেক্ট করা
            navigate("/dashboard"); 

        } catch (err) {
            console.error("Google Error:", err.message);
            setError(err.message);
        }
    };

    // Note: Email/Password Login Logic (handleEmailLogin) এখানে যোগ করা হয়নি,
    // তবে আপনি চাইলে তা যোগ করতে পারেন।

    return (
        <section className='py-10'>
            <Container>
                <div className='w-full md:w-2/3 lg:w-1/3 mx-auto'>
                    <h2 className='text-[26px] text-black font-bold font-josefin pb-2 text-center'>Login</h2>
                    <p className='text-[17px] text-[#9096B2] font-medium font-lato pb-6 text-center'>Please login using account detail bellow.</p>
                    
                    {error && <p className="text-red-500 text-center mb-4">{error}</p>}

                    <form className='max-w-[432px] mx-auto'>
                        <input type="text" 
                            required
                            autoComplete='email'
                            placeholder='Email Address'
                            className='w-full px-4 py-1 border-2 border-[#0000004e] rounded-[5px] outline-0 focus:border-[#5353c5a3] mb-4'
                        />
                        <input type="password" 
                            required
                            autoComplete='current-password'
                            placeholder='Password'
                            className='w-full px-4 py-1 border-2 border-[#0000004e] rounded-[5px] outline-0 focus:border-[#5353c5a3] mb-4'
                        />
                        <Link to={"/forgotpassword"} 
                            target='_top' 
                            className="text-[17px] text-[#9096B2] font-medium font-lato hover:underline mb-6">
                            Forgot your password?
                        </Link>
                        <button type='submit'
                            className='w-full text-center py-2 text-[#fff] text-[17px] font-bold font-lato bg-[#FB2E86] rounded-[5px] mt-6 hover:bg-[#aa2760] cursor-pointer mb-6'>
                            Sign In
                        </button>
                        <div className='text-center'>
                            <Link to={"/signup"}
                                target='_top'
                                className="text-[17px] text-[#9096B2] font-medium font-lato hover:underline mb-6">
                                Don’t have an Account?Create account
                            </Link>
                        </div>
                    </form>
                    
                    {/* Social Login Section */}
                    <div className="text-center mt-6">
                        <p className="text-[17px] text-[#9096B2] font-medium font-lato mb-4">or</p>
                        <button 
                            onClick={handleGoogleLogin} 
                            className="py-2 px-6 bg-[#db4437] text-white font-bold rounded-[5px] hover:bg-[#a3332a] transition duration-200"
                        >
                            Google 🌐
                        </button>
                        {/* আপনি চাইলে এখানে Facebook Login বাটনও যোগ করতে পারেন */}
                    </div>
                </div>
            </Container>
        </section>
    );
};

export default Login;