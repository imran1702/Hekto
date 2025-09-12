import React from 'react'
import logo from "../assets/Hekto.png"
import Container from './Container'
import { IoIosSearch } from 'react-icons/io'
import { Link, NavLink } from 'react-router-dom'

const NavBar = () => {
    return (
        <section className='py-7'>
            <Container>
                <div className="flex justify-between">
                    <div className="">
                        <img src={logo} alt="" />
                    </div>
                    <div className="">
                        <ul className='flex gap-7'>
                            <li>
                                <NavLink to={"/"} className={({ isActive }) => `${isActive ? "text-[#FB2E86]" : ""}`}>
                                    Home
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to={"/pages"} className={({ isActive }) => `${isActive ? "text-[#FB2E86]" : ""}`}>
                                    Pages
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to={"/products"} className={({ isActive }) => `${isActive ? "text-[#FB2E86]" : ""}`}>
                                    Products
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to={"/blog"} className={({ isActive }) => `${isActive ? "text-[#FB2E86]" : ""}`}>
                                    Blog
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to={"/shop"} className={({ isActive }) => `${isActive ? "text-[#FB2E86]" : ""}`}>
                                    Shop
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to={"/contact"} className={({ isActive }) => `${isActive ? "text-[#FB2E86]" : ""}`}>
                                    Contact
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                    <div className="flex items-center relative">
                        <input className='bg-[#E7E6EF] py-1 ps-20' type="search" />
                        <div className="absolute right-0 bg-[#FB2E86] text-[#fff] p-2">
                            <IoIosSearch />
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    )
}

export default NavBar