import React from 'react'
import Header from './Header'
import NavBar from './NavBar'
import { Outlet } from 'react-router-dom'

const RootLayout = () => {
  return (
    <>
        <Header />
        <NavBar />
        <Outlet />
    </>
  )
}

export default RootLayout