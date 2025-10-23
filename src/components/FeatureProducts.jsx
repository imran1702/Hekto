import React, { useContext } from "react";
import Container from "./Container";
import img from "../assets/image 1.png";
import { IoCartOutline } from "react-icons/io5";
import { CiHeart, CiZoomIn } from "react-icons/ci";
import { ApiData } from "./ContextApi";
import { useDispatch } from "react-redux";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { addToCart, favouriteProduct } from "./slices/productSlice";

const FeatureProducts = () => {
  let data = useContext(ApiData);
  let dispatch = useDispatch();

  // slick arrows start
  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className="absolute top-[50%] right-5 translate-y-[-50%] bg-[#c4c0c0] p-5 rounded-full cursor-pointer"
        onClick={onClick}
      >
        <FaAngleRight></FaAngleRight>
      </div>
    );
  }

  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className="absolute top-[50%] left-5 translate-y-[-50%] bg-[#c4c0c0] p-5 rounded-full cursor-pointer z-[1]"
        onClick={onClick}
      >
        <FaAngleLeft></FaAngleLeft>
      </div>
    );
  }
  // slick arrows end

  const settings = {
    dots: false,
    infinite: true,
    focusOnSelect: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  return (
    <section className="py-10">
      <Container>
        <div className="">
          <div className="text-center">
            <h2 className="text-[#1A0B5B] font-jose text-[42px]">
              Featured Products
            </h2>
          </div>
          <div className="justify-between">
            <Link to="/products">
              <Slider {...settings}>
                {data.map((item) => (
                  <div className="group relative px-3">
                    <div className="flex gap-3 absolute left-3 top-1 text-[25px] invisible group-hover:visible group-hover:text-[#fff]">
                      <div
                        onClick={() => dispatch(addToCart({ ...item, qun: 1 }))}
                        className="hover:text-[#FB2E86]"
                      >
                        <IoCartOutline />
                      </div>
                      <Link to="/favouriteProducts">
                        <div
                          onClick={() => dispatch(favouriteProduct(item))}
                          className="hover:text-[#FB2E86]"
                        >
                          <CiHeart />
                        </div>
                      </Link>
                      <div className="hover:text-[#FB2E86]">
                        <CiZoomIn />
                      </div>
                    </div>
                    <div className="bg-[#F6F7FB]">
                      <img className="mx-auto" src={item.image_path} alt="" />
                    </div>
                    <div className="text-center py-2 group-hover:bg-[#2F1AC4] group-hover:text-[#fff]">
                      <h5 className="text-[#FB2E86] font-[Leto] text-[18px] group-hover:text-[#fff]">
                        {item.name}
                      </h5>
                      <p className="font-jose text-[14px]">Code - Y523201</p>
                      <p className="font-[Leto] text-[14px]">
                        {item.discount_price} TK
                      </p>
                      <p className="font-[Leto] text-[14px]">
                        <s>{item.price} TK</s>
                      </p>
                    </div>
                  </div>
                ))}
              </Slider>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default FeatureProducts;
