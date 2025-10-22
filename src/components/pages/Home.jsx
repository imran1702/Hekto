import React from 'react'
import Banner from '../Banner'
import FeatureProducts from '../FeatureProducts'
import LatestProduct from '../LatestProduct'
import img from "../../assets/banner.png"
import img2 from "../../assets/unique feature sofa.png"

const Home = () => {
  return (
    <>
       <Banner image={img}/>
       <FeatureProducts />
       <LatestProduct />
       <Banner image={img2}/>
    </>
  )
}

export default Home