import React from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from 'react-router-dom';

const Banner = ({image}) => {
    

    var bannerSlick = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
    
    return (
        <section>
             <Slider {...bannerSlick}>
                <div className="">
                    <Link>
                    <img className='min-w-full' src={image} alt="" />
                    </Link>
                </div>
                {/* <div className="">
                    <Link>
                    <img className='min-w-full' src={image} alt="" />
                    </Link>
                </div>
                <div className="">
                    <Link>
                    <img className='min-w-full' src={image} alt="" />
                    </Link>
                </div> */}
                </Slider>
           
        </section>
    )
}

export default Banner