import React, { useContext, useEffect, useState } from 'react'
import { ApiData } from '../ContextApi'
import Container from '../Container'
import blogTop from "../../assets/blogTop.png"
import blogMiddle from "../../assets/blogMiddle.png"
import blogBottom from "../../assets/blogBottom.png"
import {CiSearch} from 'react-icons/ci'
import {FaPenFancy} from 'react-icons/fa'
import {LuCalendarDays} from 'react-icons/lu'
import { Link } from 'react-router-dom'

const Blog = () => {
  let [aShow, setAShow] = useState(false)
  let [bShow, setBShow] = useState(false)
  let [cShow, setCShow] = useState(false)

  let data = useContext(ApiData)
    let [aCategory, setACategory] = useState([])
    let [blogProduct, setBlogProduct] = useState([])
    let [blogFilterPro, setBlogFilterPro] = useState([])

    useEffect(()=>{
      let cate = ([...new Set(data.map((item) => item.category))])
      let product = data.map((item)=>item)
      setBlogProduct(product)
      let cateWithCount = cate.map(cat => ({
        name: cat,
        count: data.filter(item => item.category === cat).length
      }))
      setACategory(cateWithCount)

      let blogItems = blogProduct.slice(0, 4)
      setBlogFilterPro(blogItems);
      
    },[data])
  return (
    <section className='py-16'>
      <Container>
        <div className='grid grid-cols-3'>
          <div className='col-span-2'>
            <div className='mb-8'>
              <div>
                <img src={blogTop} alt="" className='w-full' />
              </div>
              <div className='flex items-center gap-x-10'>
                <div className='flex items-center gap-x-2 py-4'>
                  <FaPenFancy className='text-red-500' />
                  <p className='text-[#151875] text-[14px] font-bold font-josefin bg-[#FFE7F9] px-6'>Surf Auxion</p>
                </div>
                <div className='flex items-center gap-x-2 py-4'>
                  <LuCalendarDays className='text-[#FFA454]' />
                  <p className='text-[#151875] text-[14px] font-bold font-josefin bg-[#FFECE2] px-6'>Aug 09 2020</p>
                </div>
              </div>
              <h2 className='text-[#151875] text-[30px] font-bold font-josefin py-2'>Mauris at orci non vulputate diam tincidunt nec.</h2>
              <p className='text-[#151875] text-[16px] font-medium font-lato leading-[30px]'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Velit facilisis quis auctor pretium ipsum, eu rutrum. Condimentum eu malesuada vitae ultrices in in neque, porta dignissim. Adipiscing purus, cursus vulputate id id dictum at.</p>
              {aShow && (
                <p className='text-[#151875] text-[16px] font-medium font-lato leading-[30px]'>Repellat minus reiciendis ipsam odio obcaecati hic fugit repudiandae velit, iure harum debitis illum rerum placeat provident.</p>
              )}
              <button
                onClick={() => setAShow(!aShow)}
                className='pt-4 text-[#151875] text-[16px] font-medium font-lato cursor-pointer pb-6 underline'>
                Read More
              </button>
            </div>
            <div className='mb-8'>
              <div>
                <img src={blogMiddle} alt="" className='w-full' />
              </div>
              <div className='flex items-center gap-x-10'>
                <div className='flex items-center gap-x-2 py-4'>
                  <FaPenFancy className='text-red-500' />
                  <p className='text-[#151875] text-[14px] font-bold font-josefin bg-[#FFE7F9] px-6'>Surf Auxion</p>
                </div>
                <div className='flex items-center gap-x-2 py-4'>
                  <LuCalendarDays className='text-[#FFA454]' />
                  <p className='text-[#151875] text-[14px] font-bold font-josefin bg-[#FFECE2] px-6'>Aug 09 2020</p>
                </div>
              </div>
              <h2 className='text-[#151875] text-[30px] font-bold font-josefin py-2'>Aenean vitae in aliquam ultrices lectus. Etiam.</h2>
              <p className='text-[#151875] text-[16px] font-medium font-lato leading-[30px]'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Velit facilisis quis auctor pretium ipsum, eu rutrum. Condimentum eu malesuada vitae ultrices in in neque, porta dignissim. Adipiscing purus, cursus vulputate id id dictum at.</p>
              {bShow && (
                <p className='text-[#151875] text-[16px] font-medium font-lato leading-[30px]'>Repellat minus reiciendis ipsam odio obcaecati hic fugit repudiandae velit, iure harum debitis illum rerum placeat provident.</p>
              )}
              <button
                onClick={() => setBShow(!bShow)}
                className='pt-4 text-[#151875] text-[16px] font-medium font-lato cursor-pointer pb-6 underline'>
                Read More
              </button>
            </div>
            <div className='mb-8'>
              <div>
                <img src={blogBottom} alt="" className='w-full' />
              </div>
              <div className='flex items-center gap-x-10'>
                <div className='flex items-center gap-x-2 py-4'>
                  <FaPenFancy className='text-red-500' />
                  <p className='text-[#151875] text-[14px] font-bold font-josefin bg-[#FFE7F9] px-6'>Surf Auxion</p>
                </div>
                <div className='flex items-center gap-x-2 py-4'>
                  <LuCalendarDays className='text-[#FFA454]' />
                  <p className='text-[#151875] text-[14px] font-bold font-josefin bg-[#FFECE2] px-6'>Aug 09 2020</p>
                </div>
              </div>
              <h2 className='text-[#151875] text-[30px] font-bold font-josefin py-2'>Sit nam congue feugiat nisl, mauris amet nisi.</h2>
              <p className='text-[#151875] text-[16px] font-medium font-lato leading-[30px]'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Velit facilisis quis auctor pretium ipsum, eu rutrum. Condimentum eu malesuada vitae ultrices in in neque, porta dignissim. Adipiscing purus, cursus vulputate id id dictum at.</p>
              {cShow && (
                <p className='text-[#151875] text-[16px] font-medium font-lato leading-[30px]'>Repellat minus reiciendis ipsam odio obcaecati hic fugit repudiandae velit, iure harum debitis illum rerum placeat provident.</p>
              )}
              <button
                onClick={() => setCShow(!cShow)}
                className='pt-4 text-[#151875] text-[16px] font-medium font-lato cursor-pointer pb-6 underline'>
                Read More
              </button>
            </div>
          </div>
          <div className='pl-12'>
            <div className=''>
              <div className='max-w-[270px] pb-8'>
                <h2 className='text-[#151875] font-bold font-josefin text-2xl pb-2'>Search</h2>
                <div className='relative'>
                  <input type="search"
                    placeholder='Search For Posts'
                    className='w-full border-2 border-[#BDBDD8] py-2 px-3 rounded-[5px] placeholder:text-[#15187531] placeholder:text-bold no-clear focus:border-blue-300 outline-0 placeholder:text-lg'
                  />
                  <CiSearch className='absolute top-[50%] right-4 translate-y-[-50%]' />
                </div>
              </div>
              <div>
                <h2 className='text-[#151875] font-bold font-josefin text-2xl pb-4'>Categories</h2>
                <div className='grid grid-cols-2'>
                    {aCategory.map((cat)=>(
                      <div
                        className='text-[18px] text-[#3F509E] font-bold font-josefin py-2 pl-3 hover:bg-[#F939BF] hover:text-white hover:rounded-[5px]'
                      >
                        {cat.name} ({cat.count})
                      </div>
                    ))}
                </div>
              </div>
              <div className='py-8'>
                <h2 className='text-[#151875] font-bold font-josefin text-2xl pb-4'>Recent Post</h2>
                  {blogFilterPro.map((item)=>(
                    <Link to="/products">
                      <div className='flex gap-x-2 my-6'>
                  <div className='w-[150px]'>
                    <img className='w-full' src={item.image_path} alt="" />
                  </div>
                  <div>
                    <h2 className='text-[16px] text-[#3F509E] font-bold font-josefin pb-1'>{item.name}</h2>
                    <p className='text-[11px] text-[#8A8FB9] font-bold font-lato'>Aug 09 2020</p>
                  </div>
                </div>
                    </Link>
                  ))}
              </div>
              <div className='pb-8'>
                <h2 className='text-[#151875] font-bold font-josefin text-2xl pb-4'>Sale Product</h2>
                <div className='flex gap-x-2 pb-6'>
                  <div>
                    {/* <img src={sol1} alt="" /> */}
                  </div>
                  <div>
                    <h2 className='text-[16px] text-[#3F509E] font-bold font-josefin pb-1'>Elit ornare in enim mauris.</h2>
                    <p className='text-[11px] text-[#8A8FB9] font-bold font-lato'>Aug 09 2020</p>
                  </div>
                </div>
                <div className='flex gap-x-2 pb-6'>
                  <div>
                    {/* <img src={sol2} alt="" /> */}
                  </div>
                  <div>
                    <h2 className='text-[16px] text-[#3F509E] font-bold font-josefin pb-1'>Viverra pulvinar et enim.</h2>
                    <p className='text-[11px] text-[#8A8FB9] font-bold font-lato'>Aug 09 2020</p>
                  </div>
                </div>
                <div className='flex gap-x-2 pb-6'>
                  <div>
                    {/* <img src={sol3} alt="" /> */}
                  </div>
                  <div>
                    <h2 className='text-[16px] text-[#3F509E] font-bold font-josefin pb-1'>Mattis varius donec fdsfd</h2>
                    <p className='text-[11px] text-[#8A8FB9] font-bold font-lato'>Aug 09 2020</p>
                  </div>
                </div>
              </div>
              <div className='pb-8'>
                <h2 className='text-[#151875] font-bold font-josefin text-2xl pb-4'>Sale Product</h2>
                <div className='flex gap-x-2 pb-6'>
                  <div>
                    {/* <img src={sol1} alt="" /> */}
                  </div>
                  <div>
                    <h2 className='text-[16px] text-[#3F509E] font-bold font-josefin pb-1'>Elit ornare in enim mauris.</h2>
                    <p className='text-[11px] text-[#8A8FB9] font-bold font-lato'>Aug 09 2020</p>
                  </div>
                </div>
                <div className='flex gap-x-2 pb-6'>
                  <div>
                    {/* <img src={sol2} alt="" /> */}
                  </div>
                  <div>
                    <h2 className='text-[16px] text-[#3F509E] font-bold font-josefin pb-1'>Viverra pulvinar et enim.</h2>
                    <p className='text-[11px] text-[#8A8FB9] font-bold font-lato'>Aug 09 2020</p>
                  </div>
                </div>
                <div className='flex gap-x-2 pb-6'>
                  <div>
                    {/* <img src={sol3} alt="" /> */}
                  </div>
                  <div>
                    <h2 className='text-[16px] text-[#3F509E] font-bold font-josefin pb-1'>Mattis varius donec fdsfd</h2>
                    <p className='text-[11px] text-[#8A8FB9] font-bold font-lato'>Aug 09 2020</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className=''>
          {/* <img src={jj} alt="" className='w-full bg-cover' /> */}
        </div>
      </Container>
    </section>
  )
}

export default Blog