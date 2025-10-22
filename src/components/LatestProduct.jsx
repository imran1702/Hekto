import React, { useState } from 'react'
import Container from './Container'
import img from "../assets/image 1166.png"
import img2 from "../assets/image 15.png"
import img3 from "../assets/image 1168 (1).png"
import img4 from "../assets/image 3.png"
import img5 from "../assets/image 32.png"
import img6 from "../assets/image 23.png"
import { CiHeart, CiZoomIn } from 'react-icons/ci'
import { IoCartOutline } from 'react-icons/io5'

const LatestProduct = () => {
    let [activeTab, setActiveTab] = useState("newArrival")

    return (
        <section>
            <Container>
                <div className="text-center">
                    <div className="">
                        <h2 className='font-jose text-[#151875] text-[42px]'>Leatest Products</h2>
                        <div className="">
                            <ul className='flex gap-7 justify-center'>
                                <li onClick={() => setActiveTab("newArrival")} className={`text-[#151875] text-[18px] hover:underline hover:text-[#FB2E86] cursor-pointer ${activeTab == "newArrival" ? "text-[#FB2E86]" : ""}`}>New Arrival</li>
                                <li onClick={() => setActiveTab("bestSeller")} className={`text-[#151875] text-[18px] hover:underline hover:text-[#FB2E86] cursor-pointer ${activeTab == "bestSeller" ? "text-[#FB2E86]" : ""}`}>Best Seller</li>
                                <li onClick={() => setActiveTab("featured")} className={`text-[#151875] text-[18px] hover:underline hover:text-[#FB2E86] cursor-pointer ${activeTab == "featured" ? "text-[#FB2E86]" : ""}`}>Featured</li>
                                <li onClick={() => setActiveTab("specialOffer")} className={`text-[#151875] text-[18px] hover:underline hover:text-[#FB2E86] cursor-pointer ${activeTab == "specialOffer" ? "text-[#FB2E86]" : ""}`}>Special Offer</li>
                            </ul>
                        </div>
                    </div>
                    {activeTab === "newArrival" && (
                        <div className="grid grid-cols-3 items-center">
                            <div className="relative group">
                                <div className="bg-[#F7F7F7]">
                                    <img src={img} alt="" />
                                </div>
                                <div className="flex">
                                    <p>Comfort Handy Craft</p>
                                    <p>$42.00</p>
                                    <s className='text-[#FB2448]'>$65.00</s>
                                </div>
                                <div className="absolute left-3 top-1 text-[25px] invisible group-hover:visible group-hover:text-[#000]">
                                    <div className="hover:text-[#FB2E86]">
                                        <IoCartOutline />
                                    </div>
                                    <div className="hover:text-[#FB2E86]">
                                        <CiHeart />
                                    </div>
                                    <div className="hover:text-[#FB2E86]">
                                        <CiZoomIn />
                                    </div>
                                </div>
                            </div>
                            <div className="relative group">
                                <div className="bg-[#F7F7F7]">
                                    <img src={img2} alt="" />
                                </div>
                                <div className="flex">
                                    <p>Comfort Handy Craft</p>
                                    <p>$42.00</p>
                                    <s className='text-[#FB2448]'>$65.00</s>
                                </div>
                                <div className="absolute left-3 top-1 text-[25px] invisible group-hover:visible group-hover:text-[#000]">
                                    <div className="hover:text-[#FB2E86]">
                                        <IoCartOutline />
                                    </div>
                                    <div className="hover:text-[#FB2E86]">
                                        <CiHeart />
                                    </div>
                                    <div className="hover:text-[#FB2E86]">
                                        <CiZoomIn />
                                    </div>
                                </div>
                            </div>
                            <div className="relative group">
                                <div className="bg-[#F7F7F7]">
                                    <img src={img3} alt="" />
                                </div>
                                <div className="flex">
                                    <p>Comfort Handy Craft</p>
                                    <p>$42.00</p>
                                    <s className='text-[#FB2448]'>$65.00</s>
                                </div>
                                <div className="absolute left-3 top-1 text-[25px] invisible group-hover:visible group-hover:text-[#000]">
                                    <div className="hover:text-[#FB2E86]">
                                        <IoCartOutline />
                                    </div>
                                    <div className="hover:text-[#FB2E86]">
                                        <CiHeart />
                                    </div>
                                    <div className="hover:text-[#FB2E86]">
                                        <CiZoomIn />
                                    </div>
                                </div>
                            </div>
                            <div className="relative group">
                                <div className="bg-[#F7F7F7]">
                                    <img src={img4} alt="" />
                                </div>
                                <div className="flex">
                                    <p>Comfort Handy Craft</p>
                                    <p>$42.00</p>
                                    <s className='text-[#FB2448]'>$65.00</s>
                                </div>
                                <div className="absolute left-3 top-1 text-[25px] invisible group-hover:visible group-hover:text-[#000]">
                                    <div className="hover:text-[#FB2E86]">
                                        <IoCartOutline />
                                    </div>
                                    <div className="hover:text-[#FB2E86]">
                                        <CiHeart />
                                    </div>
                                    <div className="hover:text-[#FB2E86]">
                                        <CiZoomIn />
                                    </div>
                                </div>
                            </div>
                            <div className="relative group">
                                <div className="bg-[#F7F7F7]">
                                    <img src={img5} alt="" />
                                </div>
                                <div className="flex">
                                    <p>Comfort Handy Craft</p>
                                    <p>$42.00</p>
                                    <s className='text-[#FB2448]'>$65.00</s>
                                </div>
                                <div className="absolute left-3 top-1 text-[25px] invisible group-hover:visible group-hover:text-[#000]">
                                    <div className="hover:text-[#FB2E86]">
                                        <IoCartOutline />
                                    </div>
                                    <div className="hover:text-[#FB2E86]">
                                        <CiHeart />
                                    </div>
                                    <div className="hover:text-[#FB2E86]">
                                        <CiZoomIn />
                                    </div>
                                </div>
                            </div>
                            <div className="relative group">
                                <div className="bg-[#F7F7F7]">
                                    <img src={img6} alt="" />
                                </div>
                                <div className="flex">
                                    <p>Comfort Handy Craft</p>
                                    <p>$42.00</p>
                                    <s className='text-[#FB2448]'>$65.00</s>
                                </div>
                                <div className="absolute left-3 top-1 text-[25px] invisible group-hover:visible group-hover:text-[#000]">
                                    <div className="hover:text-[#FB2E86]">
                                        <IoCartOutline />
                                    </div>
                                    <div className="hover:text-[#FB2E86]">
                                        <CiHeart />
                                    </div>
                                    <div className="hover:text-[#FB2E86]">
                                        <CiZoomIn />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    {activeTab === "bestSeller" && (
                        <div className="grid grid-cols-3 items-center">
                            <div className="group relative">
                                <div className="bg-[#F7F7F7]">
                                    <img src={img2} alt="" />
                                </div>
                                <div className="flex">
                                    <p>Comfort Handy Craft</p>
                                    <p>$42.00</p>
                                    <s className='text-[#FB2448]'>$65.00</s>
                                </div>
                                <div className="absolute left-3 top-1 text-[25px] invisible group-hover:visible group-hover:text-[#000]">
                                    <div className="hover:text-[#FB2E86]">
                                        <IoCartOutline />
                                    </div>
                                    <div className="hover:text-[#FB2E86]">
                                        <CiHeart />
                                    </div>
                                    <div className="hover:text-[#FB2E86]">
                                        <CiZoomIn />
                                    </div>
                                </div>
                            </div>
                            <div className="relative group">
                                <div className="bg-[#F7F7F7]">
                                    <img src={img2} alt="" />
                                </div>
                                <div className="flex">
                                    <p>Comfort Handy Craft</p>
                                    <p>$42.00</p>
                                    <s className='text-[#FB2448]'>$65.00</s>
                                </div>
                                <div className="absolute left-3 top-1 text-[25px] invisible group-hover:visible group-hover:text-[#000]">
                                    <div className="hover:text-[#FB2E86]">
                                        <IoCartOutline />
                                    </div>
                                    <div className="hover:text-[#FB2E86]">
                                        <CiHeart />
                                    </div>
                                    <div className="hover:text-[#FB2E86]">
                                        <CiZoomIn />
                                    </div>
                                </div>
                            </div>
                            <div className="relative group">
                                <div className="bg-[#F7F7F7]">
                                    <img src={img3} alt="" />
                                </div>
                                <div className="flex">
                                    <p>Comfort Handy Craft</p>
                                    <p>$42.00</p>
                                    <s className='text-[#FB2448]'>$65.00</s>
                                </div>
                                <div className="absolute left-3 top-1 text-[25px] invisible group-hover:visible group-hover:text-[#000]">
                                    <div className="hover:text-[#FB2E86]">
                                        <IoCartOutline />
                                    </div>
                                    <div className="hover:text-[#FB2E86]">
                                        <CiHeart />
                                    </div>
                                    <div className="hover:text-[#FB2E86]">
                                        <CiZoomIn />
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                    )}
                    {activeTab === "featured" && (
                        <div className="grid grid-cols-3 items-center">
                            <div className="">
                                <div className="bg-[#F7F7F7]">
                                    <img src={img2} alt="" />
                                </div>
                                <div className="flex">
                                    <p>Comfort Handy Craft</p>
                                    <p>$42.00</p>
                                    <s className='text-[#FB2448]'>$65.00</s>
                                </div>
                            </div>
                            <div className="">
                                <div className="bg-[#F7F7F7]">
                                    <img src={img2} alt="" />
                                </div>
                                <div className="flex">
                                    <p>Comfort Handy Craft</p>
                                    <p>$42.00</p>
                                    <s className='text-[#FB2448]'>$65.00</s>
                                </div>
                            </div>
                            <div className="">
                                <div className="bg-[#F7F7F7]">
                                    <img src={img2} alt="" />
                                </div>
                                <div className="flex">
                                    <p>Comfort Handy Craft</p>
                                    <p>$42.00</p>
                                    <s className='text-[#FB2448]'>$65.00</s>
                                </div>
                            </div>
                        </div>
                    )}
                    {activeTab === "specialOffer" && (
                        <div className="grid grid-cols-3 items-center">
                            <div className="">
                                <div className="bg-[#F7F7F7]">
                                    <img src={img} alt="" />
                                </div>
                                <div className="flex">
                                    <p>Comfort Handy Craft</p>
                                    <p>$42.00</p>
                                    <s className='text-[#FB2448]'>$65.00</s>
                                </div>
                            </div>
                            <div className="">
                                <div className="bg-[#F7F7F7]">
                                    <img src={img} alt="" />
                                </div>
                                <div className="flex">
                                    <p>Comfort Handy Craft</p>
                                    <p>$42.00</p>
                                    <s className='text-[#FB2448]'>$65.00</s>
                                </div>
                            </div>
                            <div className="">
                                <div className="bg-[#F7F7F7]">
                                    <img src={img} alt="" />
                                </div>
                                <div className="flex">
                                    <p>Comfort Handy Craft</p>
                                    <p>$42.00</p>
                                    <s className='text-[#FB2448]'>$65.00</s>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </Container>
        </section>
    )
}

export default LatestProduct