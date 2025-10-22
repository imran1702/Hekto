import React from 'react'
import Header from './Header'
import NavBar from './NavBar'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'

const RootLayout = () => {
  return (
    <>
        <Header />
        <NavBar />
        <Outlet />
        <Footer />
    </>
  )
}

export default RootLayout