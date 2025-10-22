import React from 'react'
import Container from '../Container'
import { Link } from 'react-router-dom'

const SignUp = () => {
  return (
    <section className="py-10">
      <Container>
        <div className="w-full md:w-2/3 lg:w-1/3 mx-auto">
          <h2 className="text-[26px] text-black font-bold font-josefin pb-2 text-center">
            Create Account
          </h2>
          <p className="text-[17px] text-[#9096B2] font-medium font-lato pb-6 text-center">
            Please fill the information below to create your account.
          </p>

          <form className='max-w-[432px] mx-auto'>
            <input
              type="text"
              required
              placeholder="Full Name"
              className="w-full px-4 py-2 border-2 border-[#0000004e] rounded-[5px] outline-0 focus:border-[#5353c5a3] mb-4"
            />
            <input
              type="email"
              required
              autoComplete="email"
              placeholder="Email Address"
              className="w-full px-4 py-2 border-2 border-[#0000004e] rounded-[5px] outline-0 focus:border-[#5353c5a3] mb-4"
            />
            <input type="number"
              placeholder='Your phone number'
              className="w-full px-4 py-2 border-2 border-[#0000004e] rounded-[5px] outline-0 focus:border-[#5353c5a3] mb-4"
              required 
              autoComplete='number' />
            <input type="text"
              placeholder='address'
              className="w-full px-4 py-2 border-2 border-[#0000004e] rounded-[5px] outline-0 focus:border-[#5353c5a3] mb-4"
              required autoComplete='street-address' />
            <input
              type="password"
              required
              autoComplete="new-password"
              placeholder="Password"
              className="w-full px-4 py-2 border-2 border-[#0000004e] rounded-[5px] outline-0 focus:border-[#5353c5a3] mb-4"
            />
            <input
              type="password"
              required
              autoComplete="new-password"
              placeholder="Confirm Password"
              className="w-full px-4 py-2 border-2 border-[#0000004e] rounded-[5px] outline-0 focus:border-[#5353c5a3] mb-4"
            />
            <button
              type="submit"
              className="w-full text-center py-2 text-[#fff] text-[17px] font-bold font-lato bg-[#FB2E86] rounded-[5px] mt-6 hover:bg-[#aa2760] cursor-pointer mb-6"
            >
              Sign Up
            </button>
            <div className="text-center">
              <Link to={"/login"}
                target="_top"
                className="text-[17px] text-[#9096B2] font-medium font-lato hover:underline"
              >
                Already have an account? Login
              </Link>
            </div>
          </form>
        </div>
      </Container>
    </section>
  )
}

export default SignUp