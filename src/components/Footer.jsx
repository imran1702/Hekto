import React, { useContext, useEffect, useState } from 'react'
import Container from './Container'
import logo from "../assets/Hekto.png"
import { ApiData } from './ContextApi'
import { Link } from 'react-router-dom'
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa'

const Footer = () => {
    let data = useContext(ApiData)
    let [showCategory, setShowCategory] = useState([])
    useEffect(()=>{
        let categoryList = ([...new Set(data.map((item)=>item.category))])
        setShowCategory(categoryList)
    },[data])
  return (
   <section className='bg-[#EEEFFB]'>
    <Container>
        <div className="flex justify-between py-15">
            <div className="">
                <div className="">
                    <img src={logo} alt="" />
                </div>
                <div className="flex my-5">
                    <input className='bg-[#fff] py-2 ps-2 pr-7' type="text" placeholder='Enter Email Address' />
                    <button className='bg-[#FB2E86] text-[#EEEFFB] py-2 px-4'>Sing Up</button>
                </div>
                <p className='text-[#8A8FB9]'>Contact Info</p>
                <p className='text-[#8A8FB9]'>17 Princess Road, London, Greater London NW1 8JR, UK</p>
            </div>
            <div className="">
                <h2 className='font-jose mb-5 text-[22px]'>Catagories</h2>
                <ul className='font-lato capitalize text-[16px] text-[#8A8FB9]'>
                    {showCategory.map((item)=>(
                    <li className='mb-2'>
                        <Link>{item}</Link>
                    </li>
                    ))}
                </ul>
            </div>
            <div className="">
                <h2 className='font-jose mb-5 text-[22px]'>Customer Care</h2>
                <ul className='font-lato capitalize text-[16px] text-[#8A8FB9]'>
                    <li className='mb-2'>My Account</li>
                    <li className='mb-2'>Discount</li>
                    <li className='mb-2'>Returns</li>
                    <li className='mb-2'>Orders History</li>
                    <li className='mb-2'>Order Tracking</li>
                </ul>
            </div>
            <div className="">
                <h2 className='font-jose mb-5 text-[22px]'>Pages</h2>
                <ul className='font-lato capitalize text-[16px] text-[#8A8FB9]'>
                    <li className='mb-2'>Blog</li>
                    <li className='mb-2'>Browse the Shop</li>
                    <li className='mb-2'>Category</li>
                    <li className='mb-2'>Pre-Built Pages</li>
                    <li className='mb-2'>Visual Composer Elements</li>
                    <li className='mb-2'>WooCommerce Pages</li>
                </ul>
            </div>
        </div>
    </Container>
    <div className="bg-[#E7E4F8] py-3">
        <Container>
        <div className="flex justify-around items-center">
            <div className="">
                <h5 className='font-lato text-[#9DA0AE]'>©Webecy - All Rights Reserved</h5>
            </div>
            <div className="">
                <ul className='flex gap-3 text-[18px]'>
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
  )
}

export default Footer