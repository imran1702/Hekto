import React from 'react'
import Container from '../Container'
import contactImage from "../../assets/contactImage.png"

const Contact = () => {
  return (
    <section className='py-12'>
      <Container>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-x-4 md:gap-x-14 pb-12 md:pb-16'>
          <div className='pb-8 lg:pb-0'>
            <h2 className='text-[30px] md:text-[36px] text-[#151875] font-bold font-josefin pb-4 lg:pb-6'>Information About us</h2>
            <p className='text-[14px] md:text-[16px] text-[#8A8FB9] font-semibold font-lato pb-4 md:pb-6 max-w-lg'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mattis neque ultrices mattis aliquam, malesuada diam est. Malesuada sem tristique amet erat vitae eget dolor lobortis. Accumsan faucibus vitae lobortis quis bibendum quam.</p>
            <div className='flex gap-x-3'>
              <div className='w-4 h-4 rounded-full bg-[#5625DF]'></div>
              <div className='w-4 h-4 rounded-full bg-[#FF27B7]'></div>
              <div className='w-4 h-4 rounded-full bg-[#37DAF3]'></div>
            </div>
          </div>
          <div>
            <h2 className='text-[30px] md:text-[36px] text-[#151875] font-bold font-josefin pb-4 lg:pb-6'>Contact Way</h2>
            <div className='grid grid-cols-1 sm:grid-cols-2'>
              <div className='flex gap-x-4 mb-4 sm:mb-8'>
                <div>
                  <div className='w-8 h-8 rounded-full bg-[#5625DF]'>
                  </div>
                </div>
                <div>
                  <div>
                    <p className='text-[14px] md:text-[16px] text-[#8A8FB9] font-semibold font-lato inline'>Tel: 877-67-88-99</p>
                  </div>
                  <div>
                    <p className='text-[14px] md:text-[16px] text-[#8A8FB9] font-semibold font-lato inline'>E-Mail: shop@store.com</p>
                  </div>
                </div>
              </div>
              <div className='flex gap-x-4 mb-4 sm:mb-8'>
                <div>
                  <div className='w-8 h-8 rounded-full bg-[#FF27B7]'>
                  </div>
                </div>
                <div>
                  <div>
                    <p className='text-[14px] md:text-[16px] text-[#8A8FB9] font-semibold font-lato inline'>Support Forum</p>
                  </div>
                  <div>
                    <p className='text-[14px] md:text-[16px] text-[#8A8FB9] font-semibold font-lato inline'>For over 24hr</p>
                  </div>
                </div>
              </div>
              <div className='flex gap-x-4 mb-4 sm:mb-0'>
                <div>
                  <div className='w-8 h-8 rounded-full bg-[#FFB265]'>
                  </div>
                </div>
                <div>
                  <div>
                    <p className='text-[14px] md:text-[16px] text-[#8A8FB9] font-semibold font-lato inline'>20 Margaret st, London</p>
                  </div>
                  <div>
                    <p className='text-[14px] md:text-[16px] text-[#8A8FB9] font-semibold font-lato inline'>Great britain, 3NM98-LK</p>
                  </div>
                </div>
              </div>
              <div className='flex gap-x-4'>
                <div>
                  <div className='w-8 h-8 rounded-full bg-[#1BE982]'>
                  </div>
                </div>
                <div>
                  <div>
                    <p className='text-[14px] md:text-[16px] text-[#8A8FB9] font-semibold font-lato inline'>Free standard shipping</p>
                  </div>
                  <div>
                    <p className='text-[14px] md:text-[16px] text-[#8A8FB9] font-semibold font-lato inline'>on all orders.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-x-4 py-8'>
          <div className='pb-12 md:pb-0'>
            <h2 className='text-[30px] md:text-[36px] text-[#151875] font-bold font-josefin pb-4 lg:pb-6'>Get In Touch</h2>
            <p className='text-[14px] md:text-[16px] text-[#8A8FB9] font-semibold font-lato pb-4 md:pb-6 max-w-[550px]'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mattis neque ultrices  tristique amet erat vitae eget dolor los vitae lobortis quis bibendum quam.</p>
            <div>
              <form action="" className='max-w-[550px]'>
                <div className='w-full pb-2 md:flex items-center justify-between'>
                  <input type="name"
                    placeholder='Your Name*'
                    className='border-2 border-[#00000030] px-2 py-1 rounded-[5px] text-[#8A8FB9] outline-0 focus:text-black w-[100%] md:w-[49%] mb-2 md:mb-0'
                    required
                    autoComplete='name'/>
                  <input type="email"
                    placeholder='Your E-mail'
                    className='border-2 border-[#00000030] px-2 py-1 rounded-[5px] text-[#8A8FB9] outline-0 focus:text-black w-[100%] md:w-[49%]'
                    required
                    autoComplete='email'/>
                </div>
                <div className='pb-6'>
                  <input type="text"
                    placeholder='Subject*'
                    className='border-2 border-[#00000030] px-2 py-1 rounded-[5px] text-[#8A8FB9] outline-0 focus:text-black w-full mb-2'
                    required
                    autoComplete='text' />
                    <textarea name="message" id="message"
                      placeholder='Type Your Messege*'
                      required
                      className='border-2 border-[#00000030] px-2 py-1 rounded-[5px] text-[#8A8FB9] outline-0 focus:text-black w-full min-h-[106px] lg:min-h-[146px] pt-2'>

                    </textarea>
                </div>
                <div className=''>
                  <button type='submit' className='text-[#fff] text-[16px] font-semibold font-josefin px-[40px] py-[9px] bg-[#FB2E86] rounded-[5px] hover:bg-[#952656] transition-all duration-300 ease-in-out cursor-pointer'>
                    Send Mail
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div>
            <img src={contactImage} alt="" />
          </div>
        </div>
      </Container>
    </section>
                                            
  )
}

export default Contact