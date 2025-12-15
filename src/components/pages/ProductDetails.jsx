import React, { useEffect, useState } from "react";
import Container from "../Container";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { CiHeart } from "react-icons/ci";
import { FaCartPlus } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch } from "react-redux";
import {
  addToCart,
  decrement,
  favouriteProduct,
  increment,
} from "../slices/productSlice";

const ProductDetails = () => {
  let navigate = useNavigate();
  let dispatch = useDispatch();
  let { id } = useParams();
  let [singleProduct, setSingleProduct] = useState({});

  let getProductId = async () => {
    try {
      let numericId = Number(id);

      // 1. DummyJSON API (যদি id সংখ্যা হয়)
      if (!isNaN(numericId) && numericId.toString() === id) {
        // নিশ্চিত করা হলো id শুধু সংখ্যা দ্বারা গঠিত
        let res = await axios.get(
          `https://dummyjson.com/products/${numericId}`
        );
        setSingleProduct(res.data);
        return;
      }

      // 2. Furniture API (যদি id সংখ্যা না হয় বা অন্য কোনো লজিক)
      let res = await axios.get(
        "https://furniture-api.fly.dev/v1/products?limit=100&offset=0"
      );
      let product = res.data.data.find((item) => item.id == id);
      setSingleProduct(product);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProductId();
  }, [id]);

  let handleCart = (item) => {
    dispatch(addToCart({ ...item, qun: 1 }));
    toast("Add To Cart Successfully Done!");
    setTimeout(() => {
      navigate("/cart");
    }, 2000);
  };

  let [cartQuantity, setCartQuantity] = useState(1);
  let qunNumber = (e) => {
    setCartQuantity(Number(e.target.value));
  };

  return (
    <section className="py-10">
      <Container>
        {/* Main Product Layout - Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-10">
          {/* Product Image Section */}
          <div className="md:col-span-1">
            <img
              className="w-full h-auto max-w-sm md:max-w-full mx-auto rounded-[10px] shadow-lg"
              src={singleProduct.image_path || singleProduct.thumbnail}
              alt={singleProduct.name || singleProduct.title}
            />
          </div>

          {/* Product Details Section */}
          <div className="md:col-span-2">
            <h2 className="font-lato text-xl md:text-[26px] font-bold text-[#151875] mb-2">
              {singleProduct.name || singleProduct.title}
            </h2>

            {/* Price/Stock Info Pills - flex-wrap for responsiveness */}
            <ul className="flex flex-wrap gap-2 my-4 text-xs md:text-sm">
              <li className="bg-[#fc73af] px-3 py-1 rounded-[15px] font-lato text-white">
                **Special Price:**{" "}
                <span className="font-bold">
                  {singleProduct.discount_price || singleProduct.price}TK
                </span>
              </li>
              <li className="bg-[#fc73af] px-3 py-1 rounded-[15px] font-lato text-white">
                **Regular Price:**{" "}
                <s className="font-bold">{singleProduct.price}TK</s>
              </li>
              {singleProduct.stock !== undefined && (
                <li className="bg-[#fc73af] px-3 py-1 rounded-[15px] font-lato text-white">
                  **Stock:**{" "}
                  <span className="font-bold">{singleProduct.stock}</span>
                </li>
              )}
              {singleProduct.category && (
                <li className="bg-[#fc73af] px-3 py-1 rounded-[15px] font-lato text-white capitalize">
                  **Category:**{" "}
                  <span className="font-bold">{singleProduct.category}</span>
                </li>
              )}
            </ul>

            {/* Product Specifications List */}
            <ul className="text-sm md:text-base text-[#151875]">
              <li className="capitalize mb-2">
                <span className="font-semibold w-24 inline-block">
                  Category:
                </span>
                <span className="ms-3">{singleProduct.category}</span>
              </li>
              <li className="capitalize mb-2">
                <span className="font-semibold w-24 inline-block">
                  Wood Type:
                </span>
                <span className="ms-3">{singleProduct.wood_type || "N/A"}</span>
              </li>
              <li className="capitalize mb-2">
                <span className="font-semibold w-24 inline-block">Finish:</span>
                <span className="ms-3">{singleProduct.finish || "N/A"}</span>
              </li>
              <li className="capitalize mb-2">
                <span className="font-semibold w-24 inline-block">Weight:</span>
                <span className="ms-3">{singleProduct.weight || "N/A"}</span>
              </li>
              <li className="capitalize mb-2">
                <span className="font-semibold w-24 inline-block">Stock:</span>
                <span className="ms-3">{singleProduct.stock || "N/A"} PCS</span>
              </li>
              <li className="capitalize mb-2">
                <span className="font-semibold w-24 inline-block">Status:</span>
                <span className="ms-3">
                  {singleProduct.status || "In Stock"}
                </span>
              </li>
            </ul>

            {/* View More Info Link */}
            <p className="mb-4 mt-3">
              <a
                className="border-b-2 text-[#ff2282d0] text-sm md:text-base hover:text-[#FB2E86] transition-colors"
                href="#moreDescription"
              >
                View More Info
              </a>
            </p>

            {/* Action Buttons & Quantity Input - flex-wrap for responsiveness */}
            <div className="flex flex-wrap gap-3 md:gap-5 items-center mt-4">
              {/* Quantity Input */}
              <div className="w-full sm:w-auto">
                <input
                  onChange={qunNumber}
                  type="number"
                  min="1"
                  defaultValue="1"
                  className="border border-[#535252] p-2 rounded-[10px] w-full sm:w-48 focus:border-[#fe559f] focus:outline-none"
                  placeholder="Quantity"
                />
              </div>

              {/* Add To Cart Button */}
              <div
                onClick={() => handleCart(singleProduct)}
                className="flex gap-2 items-center border-[1px] px-3 py-2 rounded-[10px] border-[#535252] hover:border-[#fe559f] cursor-pointer hover:text-[#fe559f] font-lato transition-colors text-sm"
              >
                <p>Add To Cart</p>
                <FaCartPlus />
              </div>

              <ToastContainer />

              {/* Add To Wishlist Button */}
              <Link to="/favouriteProducts">
                <div
                  onClick={() =>
                    dispatch(favouriteProduct({ ...singleProduct }))
                  }
                  className="flex gap-2 items-center border-[1px] px-3 py-2 rounded-[10px] border-[#535252] hover:border-[#fe559f] cursor-pointer hover:text-[#fe559f] font-lato transition-colors text-sm"
                >
                  <p>Add To Wishlist</p>
                  <CiHeart />
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* Description & Additional Info Section */}
        <div id="moreDescription" className="mt-10">
          {/* Navigation Tabs - flex-wrap for responsiveness */}
          <div className="">
            <ul className="flex flex-wrap gap-2 md:gap-3">
              <li className="font-lato text-sm md:text-[20px] cursor-pointer py-2 px-3 rounded-[10px] font-bold text-white bg-[#fe559f]">
                Description
              </li>
              <li className="hover:bg-[#fe559f] font-lato text-sm md:text-[20px] cursor-pointer py-2 px-3 rounded-[10px] font-bold text-[#fe559f] hover:text-white shadow-md transition-all">
                <a href="#Specification">Specification</a>
              </li>
              <li className="hover:bg-[#fe559f] font-lato text-sm md:text-[20px] cursor-pointer py-2 px-3 rounded-[10px] font-bold text-[#fe559f] hover:text-white shadow-md transition-all">
                <a href="#Questions">Questions</a>
              </li>
              <li className="hover:bg-[#fe559f] font-lato text-sm md:text-[20px] cursor-pointer py-2 px-3 rounded-[10px] font-bold text-[#fe559f] hover:text-white shadow-md transition-all">
                <a href="#Review">Review</a>
              </li>
            </ul>
          </div>

          {/* Content Areas - width made responsive */}

          <div className="w-full md:w-3/4 lg:w-1/2 bg-white mt-5 p-5 rounded-[5px] shadow-md">
            <h4 className="text-xl md:text-[24px] font-lato underline mb-3 text-[#151875]">
              Description
            </h4>
            <p className="font-lato text-sm md:text-[18px] text-gray-700">
              {singleProduct.description}
            </p>
          </div>

          <div
            id="Specification"
            className="w-full md:w-3/4 lg:w-1/2 bg-white mt-5 p-5 rounded-[5px] shadow-md"
          >
            <h4 className="text-xl md:text-[24px] font-lato underline mb-3 text-[#151875]">
              Specification
            </h4>
            <p className="font-lato text-sm md:text-[18px] text-gray-700">
              {singleProduct.description}
            </p>
          </div>

          <div
            id="Questions"
            className="w-full md:w-3/4 lg:w-1/2 bg-white mt-5 p-5 rounded-[5px] shadow-md"
          >
            <h4 className="text-xl md:text-[24px] font-lato underline mb-3 text-[#151875]">
              Questions
            </h4>
            <p className="font-lato text-sm md:text-[18px] text-gray-700">
              {singleProduct.description}
            </p>
          </div>

          <div
            id="Review"
            className="w-full md:w-3/4 lg:w-1/2 bg-white mt-5 p-5 rounded-[5px] shadow-md"
          >
            <h4 className="text-xl md:text-[24px] font-lato underline mb-3 text-[#151875]">
              Review
            </h4>
            <p className="font-lato text-sm md:text-[18px] text-gray-700">
              {singleProduct.description}
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default ProductDetails;
