import React, { useContext, useEffect, useState } from "react";
import Container from "./Container";
import img from "../assets/image 1166.png";
import img2 from "../assets/image 15.png";
import img3 from "../assets/image 1168 (1).png";
import { initFlowbite } from "flowbite";
import { CiHeart, CiZoomIn } from "react-icons/ci";
import { IoCartOutline } from "react-icons/io5";
import { ApiData } from "./ContextApi";

const LatestProduct = () => {
  let data = useContext(ApiData);
  let [newArrival, setNewArrival] = useState([]);
  let [bestSellet, setBestSellet] = useState([]);

  useEffect(() => {
    initFlowbite();
    let gardenProduct = data.filter((item) => item.category === "garden");
    let newArrivalProduct = gardenProduct.slice(5, 14);
    setNewArrival(newArrivalProduct);

    let bestSelletProduct = gardenProduct.slice(18, 30);
    setBestSellet(bestSelletProduct);
  }, [data]);

  return (
    <section>
      <Container>
        <div className="text-center">
          <div className="">
            <h2 className="font-jose text-[#151875] text-[42px]">
              Leatest Products
            </h2>
            <div className="">
              <ul
                className="flex justify-center gap-x-3 sm:gap-x-0 flex-wrap -mb-px text-[10px] sm:text-sm md:text-xl font-medium font-josefin text-center"
                id="default-tab"
                data-tabs-toggle="#default-tab-content"
                role="tablist"
              >
                <li
                  className={`text-[#151875] text-[18px] hover:underline hover:text-[#FB2E86] cursor-pointer`}
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
                    Featured
                  </button>
                </li>
                <li className="" role="presentation">
                  <button
                    className="inline-block p-0 sm:p-4 hover:text-red-500 text-[#151875] cursor-pointer"
                    id="specialOffer-tab"
                    data-tabs-target="#specialOffer"
                    type="button"
                    role="tab"
                    aria-controls="specialOffer"
                    aria-selected="false"
                  >
                    Special Offer
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
                      <div className="flex justify-between">
                        <p>{item.name}</p>
                        <p>{item.discount_price} TK</p>
                        <s className="text-[#FB2448]">{item.price} TK</s>
                      </div>
                      <div className="absolute left-3 top-1 text-[25px] invisible group-hover:visible group-hover:text-[#000]">
                        <div className="hover:text-[#FB2E86]">
                          <IoCartOutline />
                        </div>
                        <div className="hover:text-[#FB2E86]">
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
                  <div className="">
                    <div className="group relative">
                      <div className="bg-[#F7F7F7]">
                        <img src={item.image_path} alt="" />
                      </div>
                      <div className="flex">
                        <p>{item.name}</p>
                        <p>{item.discount_price} TK</p>
                        <s className="text-[#FB2448]">{item.price} TK</s>
                      </div>
                      <div className="absolute left-3 top-1 text-[25px] invisible group-hover:visible group-hover:text-[#000]">
                        <div className="hover:text-[#FB2E86]">
                          <IoCartOutline />
                        </div>
                        <div className="hover:text-[#FB2E86]">
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
              id="featured"
              role="tabpanel"
              aria-labelledby="featured-tab"
            >
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="grid grid-cols-3 items-center">
                  <div className="">
                    <div className="bg-[#F7F7F7]">
                      <img src={img2} alt="" />
                    </div>
                    <div className="flex">
                      <p>Comfort Handy Craft</p>
                      <p>$42.00</p>
                      <s className="text-[#FB2448]">$65.00</s>
                    </div>
                  </div>
                  <div className="">
                    <div className="bg-[#F7F7F7]">
                      <img src={img2} alt="" />
                    </div>
                    <div className="flex">
                      <p>Comfort Handy Craft</p>
                      <p>$42.00</p>
                      <s className="text-[#FB2448]">$65.00</s>
                    </div>
                  </div>
                  <div className="">
                    <div className="bg-[#F7F7F7]">
                      <img src={img2} alt="" />
                    </div>
                    <div className="flex">
                      <p>Comfort Handy Craft</p>
                      <p>$42.00</p>
                      <s className="text-[#FB2448]">$65.00</s>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="hidden p-4 rounded-lg bg-gray-50 dark:bg-gray-800"
              id="specialOffer"
              role="tabpanel"
              aria-labelledby="specialOffer-tab"
            >
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="grid grid-cols-3 items-center">
                  <div className="">
                    <div className="bg-[#F7F7F7]">
                      <img src={img} alt="" />
                    </div>
                    <div className="flex">
                      <p>Comfort Handy Craft</p>
                      <p>$42.00</p>
                      <s className="text-[#FB2448]">$65.00</s>
                    </div>
                  </div>
                  <div className="">
                    <div className="bg-[#F7F7F7]">
                      <img src={img} alt="" />
                    </div>
                    <div className="flex">
                      <p>Comfort Handy Craft</p>
                      <p>$42.00</p>
                      <s className="text-[#FB2448]">$65.00</s>
                    </div>
                  </div>
                  <div className="">
                    <div className="bg-[#F7F7F7]">
                      <img src={img} alt="" />
                    </div>
                    <div className="flex">
                      <p>Comfort Handy Craft</p>
                      <p>$42.00</p>
                      <s className="text-[#FB2448]">$65.00</s>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default LatestProduct;
