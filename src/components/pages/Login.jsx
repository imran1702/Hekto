import React from 'react'
import Container from '../Container'
import { Link } from 'react-router-dom'

const Login = () => {
  return (
    <section className='py-10'>
        <Container>
          <div className='w-full md:w-2/3 lg:w-1/3 mx-auto'>
            <h2 className='text-[26px] text-black font-bold font-josefin pb-2 text-center'>Login</h2>
            <p className='text-[17px] text-[#9096B2] font-medium font-lato pb-6 text-center'>Please login using account detail bellow.</p>
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
          </div>
        </Container>
      </section>
  )
}

export default Login