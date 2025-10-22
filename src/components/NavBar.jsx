import React, { useContext, useState } from 'react'
import logo from "../assets/Hekto.png"
import Container from './Container'
import { IoIosSearch } from 'react-icons/io'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { ApiData } from './ContextApi'

const NavBar = () => {
    let data = useContext(ApiData)
    let navigate = useNavigate()
    let [search, setSearch] = useState("")
    let [searchFilter, setSearchFilter] = useState([])
    let handleSearch = (e)=>{
        setSearch(e.target.value)
        if(e.target.value == ""){
            setSearchFilter([])
        }else{
            let searchItem = data.filter((item)=>item.name.toLowerCase().includes(e.target.value.toLowerCase()))
            setSearchFilter(searchItem);
        }
    }
    let handleSearchItem = (item)=>{
        navigate(`/products/${item.id}`)
        setSearch("")
        setSearchFilter([])
    }
    
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
                        <input onChange={handleSearch} className='bg-[#E7E6EF] py-1 w-[220px] ps-2' value={search} type="search" placeholder='Search...' />
                        <div className="absolute right-0 bg-[#FB2E86] text-[#fff] p-2 cursor-pointer">
                            <IoIosSearch />
                        </div>
                        {searchFilter.length > 0 &&
                        <div className="absolute z-[9999] p-3 right-0 top-8 w-[400px] h-[450px] overflow-y-scroll bg-[#ffffff] shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]">
                            {searchFilter.map((item)=>(
                                <div onClick={()=>handleSearchItem(item)} className="flex gap-3 mb-2 p-2 items-center cursor-pointer bg-[#ffffff] shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]">
                                    <div className="w-[100px]">
                                    <img className='w-full' src={item.image_path} alt="" />
                                </div>
                                <div className="">
                                <h2>{item.name}</h2>
                                <h2 className='text-[#FB2E86]'>{item.price}TK</h2>
                                </div>
                                </div>
                            ))}
                        </div>
                        }
                    </div>
                </div>
            </Container>
        </section>
    )
}

export default NavBar