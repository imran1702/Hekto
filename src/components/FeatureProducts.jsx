import React, { useContext } from 'react'
import Container from './Container'
import img from "../assets/image 1.png"
import { IoCartOutline } from 'react-icons/io5'
import { CiHeart, CiZoomIn } from 'react-icons/ci'
import { ApiData } from './ContextApi'

const FeatureProducts = () => {
  let data = useContext(ApiData)
  console.log(data);

  return (
    <section className='py-10'>
      <Container>
        <div className="">
          <div className="text-center">
            <h2 className='text-[#1A0B5B] font-jose text-[42px]'>Featured Products</h2>
          </div>
          <div className="flex justify-between">
            <div className="w-1/5 group relative shadow-[0px_4px_6px_0px_rgba(0,_0,_0,_0.1)]">
              <div className="flex gap-3 absolute left-1 top-1 invisible group-hover:visible">
                <IoCartOutline />
                <CiHeart />
                <CiZoomIn />
              </div>
              <div className="bg-[#F6F7FB]">
                <img className='mx-auto' src={img} alt="" />
              </div>
              <div className="text-center py-2 group-hover:bg-[#2F1AC4] group-hover:text-[#fff]">
                <h5 className='text-[#FB2E86] font-[Leto] text-[18px] group-hover:text-[#fff]'>Cantilever chair</h5>
                <p className='font-jose text-[14px]'>Code - Y523201</p>
                <p className='font-[Leto] text-[14px]'>$42.00</p>
              </div>
            </div>
            <div className="w-1/5 group relative shadow-[0px_4px_6px_0px_rgba(0,_0,_0,_0.1)]">
              <div className="flex gap-3 absolute left-1 top-1 invisible group-hover:visible">
                <IoCartOutline />
                <CiHeart />
                <CiZoomIn />
              </div>
              <div className="bg-[#F6F7FB]">
                <img className='mx-auto' src={img} alt="" />
              </div>
              <div className="text-center py-2 group-hover:bg-[#2F1AC4] group-hover:text-[#fff]">
                <h5 className='text-[#FB2E86] font-[Leto] text-[18px] group-hover:text-[#fff]'>Cantilever chair</h5>
                <p className='font-jose text-[14px]'>Code - Y523201</p>
                <p className='font-[Leto] text-[14px]'>$42.00</p>
              </div>
            </div>
            <div className="w-1/5 group relative shadow-[0px_4px_6px_0px_rgba(0,_0,_0,_0.1)]">
              <div className="flex gap-3 absolute left-1 top-1 invisible group-hover:visible">
                <IoCartOutline />
                <CiHeart />
                <CiZoomIn />
              </div>
              <div className="bg-[#F6F7FB]">
                <img className='mx-auto' src={img} alt="" />
              </div>
              <div className="text-center py-2 group-hover:bg-[#2F1AC4] group-hover:text-[#fff]">
                <h5 className='text-[#FB2E86] font-[Leto] text-[18px] group-hover:text-[#fff]'>Cantilever chair</h5>
                <p className='font-jose text-[14px]'>Code - Y523201</p>
                <p className='font-[Leto] text-[14px]'>$42.00</p>
              </div>
            </div>
            <div className="w-1/5 group relative shadow-[0px_4px_6px_0px_rgba(0,_0,_0,_0.1)]">
              <div className="flex gap-3 absolute left-1 top-1 invisible group-hover:visible">
                <IoCartOutline />
                <CiHeart />
                <CiZoomIn />
              </div>
              <div className="bg-[#F6F7FB]">
                <img className='mx-auto' src={img} alt="" />
              </div>
              <div className="text-center py-2 group-hover:bg-[#2F1AC4] group-hover:text-[#fff]">
                <h5 className='text-[#FB2E86] font-[Leto] text-[18px] group-hover:text-[#fff]'>Cantilever chair</h5>
                <p className='font-jose text-[14px]'>Code - Y523201</p>
                <p className='font-[Leto] text-[14px]'>$42.00</p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

export default FeatureProducts