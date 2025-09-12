import React from 'react'
import Banner from '../Banner'
import FeatureProducts from '../FeatureProducts'
import { ContextApi } from '../ContextApi'

const Home = () => {
  return (
    <>
       <Banner />
       <FeatureProducts />
       <ContextApi></ContextApi>
    </>
  )
}

export default Home