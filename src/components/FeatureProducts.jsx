import React, { useContext } from "react";
import Container from "./Container";
import img from "../assets/image 1.png"; // এটি ব্যবহার হচ্ছে না, চাইলে রিমুভ করা যায়
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
    const { onClick } = props;
    return (
      <div
        className="absolute top-[50%] right-0 xl:right-[-25px] translate-y-[-50%] bg-[#c4c0c0] p-3 md:p-5 rounded-full cursor-pointer z-[1] transition-all hover:bg-[#FB2E86] hover:text-white"
        onClick={onClick}
      >
        <FaAngleRight />
      </div>
    );
  }

  function SamplePrevArrow(props) {
    const { onClick } = props;
    return (
      <div
        className="absolute top-[50%] left-0 xl:left-[-25px] translate-y-[-50%] bg-[#c4c0c0] p-3 md:p-5 rounded-full cursor-pointer z-[1] transition-all hover:bg-[#FB2E86] hover:text-white"
        onClick={onClick}
      >
        <FaAngleLeft />
      </div>
    );
  }
  // slick arrows end

  const settings = {
    dots: false,
    infinite: true,
    focusOnSelect: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024, // Large screens (Laptops)
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768, // Medium screens (Tablets)
        settings: {
          slidesToShow: 2,
          arrows: false, // Tablet-এ তীরচিহ্ন বন্ধ রাখা হলো
        },
      },
      {
        breakpoint: 640, // Small screens (Mobile)
        settings: {
          slidesToShow: 1,
          arrows: false, // Mobile-এ তীরচিহ্ন বন্ধ রাখা হলো
        },
      },
    ],
  };

  return (
    <section className="md:py-10 py-5">
      <Container>
        <div className="">
          <div className="text-center mb-5 md:mb-10">
            <h2 className="text-[#1A0B5B] font-jose md:text-[42px] text-3xl">
              Featured Products
            </h2>
          </div>

          {/* স্লাইডারকে একটি রেসপনসিভ কন্টেইনারে মোড়ানো হলো */}
          <div className="relative md:px-0">
            <Slider {...settings}>
              {data.info.map((item) => (
                // প্রতিটি স্লাইড আইটেমকে একটি মূল ডিভে মোড়া হয়েছে
                <div key={item.id} className="px-2 sm:px-3">
                  <div className="group relative w-full overflow-hidden">
                    {/* আইকনস - হোভারে দেখা যাবে */}
                    <div className="flex gap-3 absolute left-1/2 -translate-x-1/2 top-4 text-[25px] transition-all duration-300 invisible opacity-0 group-hover:visible group-hover:opacity-100 group-hover:text-[#fff] z-10">
                      {/* Cart Icon */}
                      <div
                        onClick={() => dispatch(addToCart({ ...item, qun: 1 }))}
                        className="hover:text-[#FB2E86] transition duration-200 cursor-pointer p-1 bg-white/20 rounded-full"
                      >
                        <IoCartOutline />
                      </div>

                      {/* Wishlist Icon */}
                      <Link
                        to="/favouriteProducts"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div
                          onClick={() => dispatch(favouriteProduct(item))}
                          className="hover:text-[#FB2E86] transition duration-200 cursor-pointer p-1 bg-white/20 rounded-full"
                        >
                          <CiHeart />
                        </div>
                      </Link>

                      {/* Zoom/Detail Icon - এখানে প্রোডাক্ট ডিটেইল লিংক যোগ করা যেতে পারে */}
                      <Link
                        to={`/products/${item.id}`}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="hover:text-[#FB2E86] transition duration-200 cursor-pointer p-1 bg-white/20 rounded-full">
                          <CiZoomIn />
                        </div>
                      </Link>
                    </div>

                    {/* প্রোডাক্ট ইমেজ ও ব্যাকগ্রাউন্ড */}
                    <Link to={`/products/${item.id}`}>
                      {" "}
                      {/* ছবিতে ক্লিক করলে ডিটেইলস পেজে যাবে */}
                      <div className="bg-[#F6F7FB] w-full aspect-square flex items-center justify-center">
                        <img
                          className="w-full max-h-[250px] object-contain transition-transform duration-300 group-hover:scale-105"
                          src={item.image_path}
                          alt={item.name}
                        />
                      </div>
                    </Link>

                    {/* প্রোডাক্ট ইনফো */}
                    <div className="text-center py-2 transition-all duration-300 group-hover:bg-[#2F1AC4] group-hover:text-[#fff] w-full">
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
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default FeatureProducts;
