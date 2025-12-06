import React, { useContext, useEffect, useState } from "react";
import Container from "./Container";
import { initFlowbite } from "flowbite";
import { CiHeart, CiZoomIn } from "react-icons/ci";
import { IoCartOutline } from "react-icons/io5";
import { ApiData } from "./ContextApi";
import { useDispatch } from "react-redux";
import { addToCart, favouriteProduct } from "./slices/productSlice";
import { Link } from "react-router-dom";

const LatestProduct = () => {
  let data = useContext(ApiData);
  let [newArrival, setNewArrival] = useState([]);
  let [bestSellet, setBestSellet] = useState([]);
  let [grocerys, setGrocerys] = useState([]);
  let [beauty, setBeauty] = useState([]);

  let dispatch = useDispatch()

  useEffect(() => {
    initFlowbite();
    let gardenProduct = data.info.filter((item) => item.category === "garden");
    let newArrivalProduct = gardenProduct.slice(5, 14);
    setNewArrival(newArrivalProduct);

    let bestSelletProduct = gardenProduct.slice(18, 30);
    setBestSellet(bestSelletProduct);

    let groceryItems = data.dummy.filter((item)=> item.category === "groceries")
    setGrocerys(groceryItems)
    let beautyItems = data.dummy.filter((item)=> item.category === "beauty")
    setBeauty(beautyItems)
  }, [data]);

  return (
    <section>
      <Container>
        <div className="text-center">
          <div className="">
            <h2 className="font-jose text-[#151875] mb-3 md:text-[42px]">
              Leatest Products
            </h2>
            <div className="">
              <ul
                className="flex justify-center mb-2 gap-x-3 sm:gap-x-0 flex-wrap text-[10px] sm:text-sm md:text-xl font-medium font-josefin text-center"
                id="default-tab"
                data-tabs-toggle="#default-tab-content"
                role="tablist"
              >
                <li
                  className={`text-[#151875] hover:underline hover:text-[#FB2E86] cursor-pointer`}
                >
                  <button
                    className="inline-block p-0 sm:p-4 text-[#151875] cursor-pointer hover:text-red-500"
                    id="newArival-tab"
                    data-tabs-target="#newArival"
                    type="button"
                    role="tab"
                    aria-controls="newArival"
                    aria-selected="false"
                  >
                    New Arrival
                  </button>
                </li>
                <li className="me-2" role="presentation">
                  <button
                    className="inline-block p-0 sm:p-4 hover:text-red-500  text-[#151875] cursor-pointer"
                    id="bestSellet-tab"
                    data-tabs-target="#bestSellet"
                    type="button"
                    role="tab"
                    aria-controls="bestSellet"
                    aria-selected="false"
                  >
                    Best Seller
                  </button>
                </li>
                <li className="me-2" role="presentation">
                  <button
                    className="inline-block p-0 sm:p-4 hover:text-red-500 text-[#151875] cursor-pointer"
                    id="featured-tab"
                    data-tabs-target="#featured"
                    type="button"
                    role="tab"
                    aria-controls="featured"
                    aria-selected="false"
                  >
                    Groceries
                  </button>
                </li>
                <li className="" role="presentation">
                  <button
                    className="inline-block p-0 sm:p-4 hover:text-red-500 text-[#151875] cursor-pointer"
                    id="beauty-tab"
                    data-tabs-target="#beauty"
                    type="button"
                    role="tab"
                    aria-controls="beauty"
                    aria-selected="false"
                  >
                    Beauty
                  </button>
                </li>
              </ul>
            </div>
          </div>
          <div className="" id="default-tab-content">
            <div
              className="hidden p-4 max-w-[1152px]"
              id="newArival"
              role="tabpanel"
              aria-labelledby="newArival-tab"
            >
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {newArrival.map((item) => (
                  <div className="">
                    <div className="relative group">
                      <div className="bg-[#F7F7F7]">
                        <img src={item.image_path} alt="" />
                      </div>
                      <div className="sm:flex justify-between">
                        <p className="text-[13px] sm:text-[18px]">{item.name}</p>
                        <p  className="text-[13px] sm:text-[18px]">{item.discount_price} TK</p>
                        <s className="text-[#FB2448] text-[13px] sm:text-[18px]">{item.price} TK</s>
                      </div>
                      <div className="absolute left-3 top-1 text-[25px] invisible group-hover:visible group-hover:text-[#000]">
                        <div onClick={()=>dispatch(addToCart({...item, qun: 1}))} className="hover:text-[#FB2E86]">
                          <IoCartOutline />
                        </div>
                        <div onClick={()=>dispatch(favouriteProduct({...item}))} className="hover:text-[#FB2E86]">
                          <CiHeart />
                        </div>
                        <div className="hover:text-[#FB2E86]">
                          <CiZoomIn />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div
              className="hidden p-4 rounded-lg bg-gray-50 dark:bg-gray-800"
              id="bestSellet"
              role="tabpanel"
              aria-labelledby="bestSellet-tab"
            >
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {bestSellet.map((item) => (
                    <Link to={`/products/${item.id}`}>
                    <div className="group relative">
                      <div className="bg-[#F7F7F7]">
                        <img src={item.image_path} alt="" />
                      </div>
                      <div className="sm:flex">
                        <p className="text-[13px] sm:text-[18px]">{item.name}</p>
                        <p className="text-[13px] sm:text-[18px]">{item.discount_price} TK</p>
                        <s className="text-[#FB2448] text-[13px] sm:text-[18px]">{item.price} TK</s>
                      </div>
                      <div className="absolute left-3 top-1 text-[25px] invisible group-hover:visible group-hover:text-[#000]">
                        <div onClick={()=>dispatch(addToCart({...item, qun: 1}))} className="hover:text-[#FB2E86]">
                          <IoCartOutline />
                        </div>
                        <div onClick={()=>dispatch(favouriteProduct({...item}))} className="hover:text-[#FB2E86]">
                          <CiHeart />
                        </div>
                        <div className="hover:text-[#FB2E86]">
                          <CiZoomIn />
                        </div>
                      </div>
                    </div>
                    </Link>
                ))}
              </div>
            </div>

            <div
              className="hidden p-4 rounded-lg bg-gray-50 dark:bg-gray-800"
              id="featured"
              role="tabpanel"
              aria-labelledby="featured-tab"
            >
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {grocerys.map((item)=>(
                    <Link to={`/products/${item.id}`}>
                  <div className="relative group">
                    <div className="bg-[#F7F7F7]">
                      <img src={item.thumbnail} alt="" />
                    </div>
                    <div className="sm:flex">
                      <p className="text-[13px] sm:text-[18px]">{item.title}</p>
                      <p className="text-[13px] sm:text-[18px]">{item.price} TK</p>
                      <s className="text-[#FB2448] text-[13px] sm:text-[18px]">{item.price}</s>
                    </div>
                    <div className="absolute left-3 top-1 text-[25px] invisible group-hover:visible group-hover:text-[#000]">
                        <div onClick={()=>dispatch(addToCart({...item, qun: 1}))} className="hover:text-[#FB2E86]">
                          <IoCartOutline />
                        </div>
                        <div onClick={()=>dispatch(favouriteProduct({...item}))} className="hover:text-[#FB2E86]">
                          <CiHeart />
                        </div>
                        <div className="hover:text-[#FB2E86]">
                          <CiZoomIn />
                        </div>
                      </div>
                  </div>
                    </Link>
                  ))}
              </div>
            </div>
            <div
              className="hidden p-4 rounded-lg bg-gray-50 dark:bg-gray-800"
              id="beauty"
              role="tabpanel"
              aria-labelledby="beauty-tab"
            >
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {beauty.map((item)=>(
                  <Link to={`/products/${item.id}`}>
                  <div className="relative group">
                    <div className="bg-[#F7F7F7]">
                      <img src={item.thumbnail} alt="" />
                    </div>
                    <div className="sm:flex">
                      <p className="text-[13px] sm:text-[18px]">{item.title}</p>
                      <p className="text-[13px] sm:text-[18px]">{item.price} TK</p>
                      <s className="text-[#FB2448] text-[13px] sm:text-[18px]">{item.price} TK</s>
                    </div>
                    <div className="absolute left-3 top-1 text-[25px] invisible group-hover:visible group-hover:text-[#000]">
                        <div onClick={()=>dispatch(addToCart({...item, qun: 1}))} className="hover:text-[#FB2E86]">
                          <IoCartOutline />
                        </div>
                        <div onClick={()=>dispatch(favouriteProduct({...item}))} className="hover:text-[#FB2E86]">
                          <CiHeart />
                        </div>
                        <div className="hover:text-[#FB2E86]">
                          <CiZoomIn />
                        </div>
                      </div>
                  </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default LatestProduct;
