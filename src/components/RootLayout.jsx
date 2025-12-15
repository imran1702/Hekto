import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header'; // আপনার হেডার পাথ ঠিক আছে কিনা দেখুন
import Footer from './Footer'; // আপনার ফুটার পাথ ঠিক আছে কিনা দেখুন
import NavBar from './NavBar'; // আপনার ফুটার পাথ ঠিক আছে কিনা দেখুন
import BottomNav from './BottomNav'; // ⭐️ নতুন তৈরি করা কম্পোনেন্ট ইম্পোর্ট করুন

const RootLayout = () => {
  return (
    <>
      <Header />
      <NavBar />
      
      {/* মেইন কন্টেন্ট এরিয়া */}
      <main className='min-h-screen pb-16 sm:pb-0'> 
        {/* pb-16 দেওয়া হয়েছে যাতে মোবাইল মেনুর নিচে কন্টেন্ট ঢাকা না পড়ে */}
        <Outlet />
      </main>

      <Footer />
      
      {/* ⭐️ এখানে মোবাইল বটম মেনু যোগ করা হলো */}
      <BottomNav />
    </>
  );
};

export default RootLayout;