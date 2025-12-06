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
  let [singleProduct, setSingleProduct] = useState([]);

  let getProductId = async () => {
  try {
    // id number কিনা আলাদা করে যাচাই করা হচ্ছে
    let numericId = Number(id);

    // যদি id number হয় তাহলে dummyjson থেকে data পাওয়া যাবে
    if (!isNaN(numericId)) {
      let res = await axios.get(`https://dummyjson.com/products/${numericId}`);
      setSingleProduct(res.data);
      return;
    }

    // নাহলে furniture API থেকে পাওয়া যাবে
    let res = await axios.get("https://furniture-api.fly.dev/v1/products?limit=100&offset=0");
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
        <div className="grid grid-cols-3 gap-10">
          <div className="">
            <img
              className="w-full rounded-[10px]"
              src={singleProduct.image_path || singleProduct.thumbnail}
              alt=""
            />
          </div>
          <div className="col-span-2">
            <h2 className="font-lato text-[26px]">{singleProduct.name || singleProduct.title}</h2>
            <ul className="flex gap-3 my-4">
              <li className="bg-[#fc73af] px-3 py-1 rounded-[15px] font-lato">
                Special Price:{" "}
                <span className="font-bold">
                  {singleProduct.discount_price || singleProduct.price}TK
                </span>
              </li>
              <li className="bg-[#fc73af] px-3 py-1 rounded-[15px] font-lato">
                Regular Price:{" "}
                <s className="font-bold">{singleProduct.price}TK</s>
              </li>
              <li className="bg-[#fc73af] px-3 py-1 rounded-[15px] font-lato">
                Stock: <span className="font-bold">{singleProduct.stock}</span>
              </li>
              <li className="bg-[#fc73af] px-3 py-1 rounded-[15px] font-lato">
                Category:{" "}
                <span className="font-bold">{singleProduct.category}</span>
              </li>
            </ul>
            <ul>
              <li className="capitalize mb-2">
                <span className="font-semibold">Category:</span>
                <span className="ms-3">{singleProduct.category}</span>
              </li>
              <li className="capitalize mb-2">
                <span className="font-semibold">Wood Type:</span>
                <span className="ms-3">{singleProduct.wood_type}</span>
              </li>
              <li className="capitalize mb-2">
                <span className="font-semibold">Finish:</span>
                <span className="ms-3">{singleProduct.finish}</span>
              </li>
              <li className="capitalize mb-2">
                <span className="font-semibold">Weight:</span>
                <span className="ms-3">{singleProduct.weight}</span>
              </li>
              <li className="capitalize mb-2">
                <span className="font-semibold">Stock:</span>
                <span className="ms-3">{singleProduct.stock} PCS</span>
              </li>
              <li className="capitalize mb-2">
                <span className="font-semibold">Status:</span>
                <span className="ms-3">{singleProduct.status}</span>
              </li>
            </ul>
            <p className="mb-3">
              <a
                className="border-b-2 text-[#ff2282d0]"
                href="#moreDescription"
              >
                View More Info
              </a>
            </p>
            <div className="flex gap-5 items-center">
              <div className="">
                <input
                  onChange={qunNumber}
                  type="number"
                  placeholder="Chose Your Buying Quantity"
                />
              </div>
              <div
                onClick={() => handleCart(singleProduct)}
                className="flex gap-2 items-center border-[1px] px-3 py-2 rounded-[10px] border-[#535252] hover:border-[#fe559f] cursor-pointer hover:text-[#fe559f] font-lato"
              >
                <p>Add To Cart</p>
                <FaCartPlus />
              </div>
              <ToastContainer />
              <Link to="/favouriteProducts">
                <div
                  onClick={() =>
                    dispatch(favouriteProduct({ ...singleProduct }))
                  }
                  className="flex gap-2 items-center border-[1px] px-3 py-2 rounded-[10px] border-[#535252] hover:border-[#fe559f] cursor-pointer hover:text-[#fe559f] font-lato"
                >
                  <p>Add To Wishlish</p>
                  <CiHeart />
                </div>
              </Link>
            </div>
          </div>
        </div>
        <div id="moreDescription" className="mt-10">
          <div className="">
            <ul className="flex gap-3">
              <li className="hover:underline font-lato text-[20px] cursor-pointer py-2 px-3 rounded-[10px] font-bold text-white bg-[#fe559f]">
                Description
              </li>
              <li className="hover:underline hover:bg-[#fe559f] font-lato text-[20px] cursor-pointer py-2 px-3 rounded-[10px] font-bold text-[#fe559f] hover:text-white shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]">
                <a href="#Specification">Specification</a>
              </li>
              <li className="hover:underline hover:bg-[#fe559f] font-lato text-[20px] cursor-pointer py-2 px-3 rounded-[10px] font-bold text-[#fe559f] hover:text-white shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]">
                <a href="#Questions">Questions</a>
              </li>
              <li className="hover:underline hover:bg-[#fe559f] font-lato text-[20px] cursor-pointer py-2 px-3 rounded-[10px] font-bold text-[#fe559f] hover:text-white shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]">
                <a href="#Review">Review</a>
              </li>
            </ul>
          </div>
          <div className="w-[50%] bg-[#fff] mt-5 p-5 rounded-[5px] shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]">
            <h4 className="text-[24px] font-lato underline mb-3">
              Description
            </h4>
            <p className="font-lato text-[18px]">{singleProduct.description}</p>
          </div>
          <div
            id="Specification"
            className="w-[50%] bg-[#fff] mt-5 p-5 rounded-[5px] shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]"
          >
            <h4 className="text-[24px] font-lato underline mb-3">
              Specification
            </h4>
            <p className="font-lato text-[18px]">{singleProduct.description}</p>
          </div>
          <div
            id="Questions"
            className="w-[50%] bg-[#fff] mt-5 p-5 rounded-[5px] shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]"
          >
            <h4 className="text-[24px] font-lato underline mb-3">Questions</h4>
            <p className="font-lato text-[18px]">{singleProduct.description}</p>
          </div>
          <div
            id="Review"
            className="w-[50%] bg-[#fff] mt-5 p-5 rounded-[5px] shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]"
          >
            <h4 className="text-[24px] font-lato underline mb-3">Review</h4>
            <p className="font-lato text-[18px]">{singleProduct.description}</p>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default ProductDetails;
