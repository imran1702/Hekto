// Cart.jsx

import Container from "../Container";
import { IoMdClose } from "react-icons/io";
import { Link } from "react-router-dom";
import { FaMinus, FaPlus, FaRegHeart, FaSearchPlus } from "react-icons/fa";
import { BsCartXFill } from "react-icons/bs";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  cartItemRemove,
  clearCartItem,
  decrement,
  favouriteProduct,
  increment,
} from "../slices/productSlice";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useContext, useEffect, useState } from "react";
import { ApiData } from "../ContextApi";

const Cart = () => {
  let furApi = useContext(ApiData);
  let [suggested, setSuggested] = useState([]);
  let data = useSelector((state) => state.product.cartItem);
  let dispatch = useDispatch();

  let { totalPrice, totalDisAmount, totalQuantity } = data.reduce(
    (acc, item) => {
      // DummyJSON থেকে আসা পণ্যগুলোর discountPercentage থাকলে সেটাকে price-এ কনভার্ট করে discount_price হিসেবে ব্যবহার করা হয়েছে
      const discountAmount = item.discountPercentage
        ? (item.price * item.discountPercentage) / 100
        : item.price - (item.discount_price || item.price);

      acc.totalPrice += item.price * item.qun;
      acc.totalDisAmount += discountAmount * item.qun;
      acc.totalQuantity += item.qun;
      return acc;
    },
    { totalPrice: 0, totalQuantity: 0, totalDisAmount: 0 }
  );

  const finalTotal = (totalPrice - totalDisAmount).toFixed(2);
  const totalItemPrice = totalPrice.toFixed(2);
  const totalDiscount = totalDisAmount.toFixed(2);

  useEffect(() => {
    if (furApi.info.length > 0) {
      let finterSuggested = [...furApi.info].sort(() => 0.5 - Math.random());
      let product = finterSuggested.slice(0, 8); // 8টি সাজেস্টেড প্রোডাক্ট
      setSuggested(product);
    }
  }, [furApi]);

  return (
    <section className="py-8 md:py-16 bg-[#F8F8FD]">
      <Container>
        {data.length > 0 ? (
          <div className="lg:flex justify-between gap-8">
            {/* Cart Items Table (Left Side) */}
            <div className="lg:w-2/3 w-full pb-12 lg:pb-0">
              {/* Table Header (Visible on screen size 'sm' and up) */}
              <div className="hidden sm:grid grid-cols-[3fr_1fr_1.5fr_1fr] bg-white rounded-t-lg shadow-md mb-2">
                <div className="text-start py-4 text-[#1D3178] text-sm md:text-lg font-bold font-josefin pl-4">
                  Product
                </div>
                <div className="text-center py-4 text-[#1D3178] text-sm md:text-lg font-bold font-josefin">
                  Price
                </div>
                <div className="text-center py-4 text-[#1D3178] text-sm md:text-lg font-bold font-josefin">
                  Quantity
                </div>
                <div className="text-center py-4 text-[#1D3178] text-sm md:text-lg font-bold font-josefin pr-4">
                  Total
                </div>
              </div>

              {/* Table Body - Mobile friendly structure */}
              <div className="flex flex-col gap-4">
                {data.map((item, i) => (
                  <div
                    key={item.id + i}
                    className="bg-white p-4 sm:p-0 rounded-lg shadow-md sm:shadow-none sm:rounded-none border-b sm:border-b-2 border-[#E1E1E4]"
                  >
                    <div className="sm:grid sm:grid-cols-[3fr_1fr_1.5fr_1fr] items-center">
                      {/* Product Info */}
                      <Link
                        to={`/products/${item.id}`}
                        className="sm:col-span-1 flex items-center gap-x-3 sm:gap-x-4 py-2 sm:py-4"
                      >
                        <div className="relative flex-shrink-0">
                          <img
                            src={item.image_path || item.thumbnail}
                            alt={item.name || item.title}
                            className="h-16 w-16 sm:h-20 sm:w-24 object-contain rounded-md border"
                          />
                        </div>
                        <div>
                          <h2 className="font-bold font-josefin text-[#000] text-sm sm:text-lg hover:text-[#FB2E86] transition-colors">
                            {item.name || item.title}
                          </h2>
                          <p className="font-medium font-josefin text-[#A1A8C1] text-xs sm:text-sm">
                            Details: {item.finish || item.category || "N/A"}
                          </p>
                        </div>
                      </Link>

                      {/* Remove Button for Mobile */}
                      <div
                        onClick={(e) => {
                          e.preventDefault();
                          dispatch(cartItemRemove(i));
                        }}
                        className="absolute top-2 right-2 sm:hidden cursor-pointer"
                      >
                        <IoMdClose className="text-2xl text-red-500 bg-gray-100 rounded-full p-1 hover:text-red-700" />
                      </div>

                      {/* Price Column */}
                      <div className="sm:col-span-1 text-left sm:text-center text-[#1D3178] text-sm font-medium font-josefin py-2 sm:py-4">
                        <span className="sm:hidden font-bold pr-2">
                          Price:{" "}
                        </span>
                        {item.price} TK
                      </div>

                      {/* Quantity Column */}
                      <div className="sm:col-span-1 text-left sm:text-center text-[#1D3178] text-sm font-medium font-josefin py-2 sm:py-4">
                        <div className="flex items-center gap-x-3 w-max sm:mx-auto">
                          <span className="sm:hidden font-bold pr-2">
                            Qty:{" "}
                          </span>
                          <button
                            className="cursor-pointer bg-gray-100 p-2 rounded-full hover:bg-gray-200 transition"
                            onClick={(e) => {
                              e.preventDefault();
                              item.qun > 1
                                ? dispatch(decrement(i))
                                : dispatch(cartItemRemove(i));
                            }}
                          >
                            {item.qun > 1 ? (
                              <FaMinus className="text-xs text-[#1D3178]" />
                            ) : (
                              <RiDeleteBin6Line className="text-red-600 text-sm" />
                            )}
                          </button>
                          <p className="text-[#15245E] text-sm font-bold font-josefin w-4 text-center">
                            {item.qun}
                          </p>
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              dispatch(increment(i));
                            }}
                            className="cursor-pointer bg-gray-100 p-2 rounded-full hover:bg-gray-200 transition"
                          >
                            <FaPlus className="text-xs text-[#1D3178]" />
                          </button>
                        </div>
                      </div>

                      {/* Total Column */}
                      <div className="sm:col-span-1 text-left sm:text-center text-md font-bold font-josefin text-[#FB2E86] py-2 sm:py-4">
                        <span className="sm:hidden font-bold pr-2 text-[#1D3178]">
                          Total:{" "}
                        </span>
                        {(item.price * item.qun).toFixed(2)} TK
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Cart Actions */}
              <div className="flex justify-between items-center pt-8 flex-wrap gap-4">
                <Link
                  to={"/products"}
                  className="text-sm sm:text-base font-semibold font-josefin bg-[#FB2E86] rounded-[5px] px-6 sm:px-8 py-2 text-white cursor-pointer hover:bg-[#D7236E] transition inline-block"
                >
                  Continue Shopping
                </Link>
                <button
                  onClick={() => dispatch(clearCartItem())}
                  className="text-sm sm:text-base font-semibold font-josefin bg-red-500 rounded-[5px] px-6 sm:px-8 py-2 text-white cursor-pointer hover:bg-red-700 transition"
                >
                  Clear Cart
                </button>
              </div>
            </div>

            {/* Cart Totals & Shipping (Right Side) */}
            <div className="lg:w-1/3 w-full">
              {/* Cart Totals */}
              <div className="w-full mt-6 lg:mt-0 bg-white shadow-xl rounded-lg border border-gray-200">
                <h2 className="py-4 text-center text-[#1D3178] text-xl font-bold font-josefin border-b border-gray-200">
                  Cart Totals
                </h2>
                <div className="p-5">
                  <table className="w-full">
                    <tbody>
                      <tr className="border-b border-[#E8E6F1]">
                        <th className="py-3 text-start text-sm font-semibold text-[#1D3178]">
                          Subtotals:
                        </th>
                        <td className="py-3 text-end text-sm text-[#1D3178] font-medium">
                          {totalItemPrice} TK
                        </td>
                      </tr>
                      <tr className="border-b border-[#E8E6F1]">
                        <th className="py-3 text-start text-sm font-semibold text-[#1D3178]">
                          Total Quantity:
                        </th>
                        <td className="py-3 text-end text-sm text-[#1D3178] font-medium">
                          {totalQuantity}
                        </td>
                      </tr>
                      <tr className="border-b border-[#E8E6F1]">
                        <th className="py-3 text-start text-sm font-semibold text-red-500">
                          Less Discount:
                        </th>
                        <td className="py-3 text-end text-sm text-red-500 font-medium">
                          - {totalDiscount} TK
                        </td>
                      </tr>
                      <tr className="font-bold">
                        <th className="py-4 text-start text-base text-[#1D3178]">
                          Final Totals:
                        </th>
                        <td className="py-4 text-end text-base text-[#FB2E86]">
                          {finalTotal} TK
                        </td>
                      </tr>
                    </tbody>
                  </table>

                  <div className="pt-4">
                    <label
                      htmlFor="shipping-check"
                      className="text-sm flex gap-x-2 text-[#8D94B8] mb-4 items-center"
                    >
                      <input
                        id="shipping-check"
                        type="checkbox"
                        required
                        className="rounded accent-[#19D16F] h-4 w-4"
                      />
                      Shipping & taxes calculated at checkout
                    </label>
                  </div>

                  <Link
                    to={"/checkout"}
                    className="bg-[#19D16F] w-full py-3 rounded-lg inline-block text-white text-md font-bold font-lato text-center shadow-lg hover:bg-[#15b35c] transition"
                  >
                    Proceed To Checkout
                  </Link>
                </div>
              </div>

              {/* Calculate Shipping */}
              <div className="w-full mt-8 bg-white shadow-xl rounded-lg border border-gray-200">
                <h2 className="py-4 text-center text-[#1D3178] text-xl font-bold font-josefin border-b border-gray-200">
                  Calculate Shipping
                </h2>
                <div className="p-5">
                  <div className="mb-4">
                    <input
                      type="text"
                      className="w-full py-2 border border-gray-300 rounded px-3 outline-0 focus:border-[#FB2E86] text-sm"
                      required
                      autoComplete="country"
                      placeholder="Country (e.g., Bangladesh)"
                    />
                  </div>
                  <div className="mb-4">
                    <input
                      type="text"
                      className="w-full py-2 border border-gray-300 rounded px-3 outline-0 focus:border-[#FB2E86] text-sm"
                      required
                      autoComplete="address-line2"
                      placeholder="State / City (e.g., Mirpur Dhaka - 1200)"
                    />
                  </div>
                  <div className="mb-4">
                    <input
                      type="text"
                      className="w-full py-2 border border-gray-300 rounded px-3 outline-0 focus:border-[#FB2E86] text-sm"
                      required
                      autoComplete="postal-code"
                      placeholder="Postal Code"
                    />
                  </div>

                  <button className="text-sm font-semibold font-josefin bg-[#FB2E86] rounded-lg px-8 py-3 text-white cursor-pointer hover:bg-[#D7236E] transition w-full">
                    Calculate Shipping
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Empty Cart View */
          <div>
            <div className="text-center py-16 bg-white rounded-lg shadow-xl">
              <BsCartXFill className="inline-block text-6xl text-[#FB2E86] mb-4" />
              <h2 className="text-2xl sm:text-4xl text-[#1D3178] font-bold font-josefin pb-8">
                Your Cart is Empty!
              </h2>
              <Link
                to={"/products"}
                className="text-sm sm:text-lg text-white font-bold font-josefin bg-[#262626] py-3 px-8 rounded-lg hover:bg-[#1D3178] transition shadow-md"
              >
                Continue Shopping
              </Link>
            </div>

            {/* Suggested Products Section */}
            <div className="mt-16">
              <h1 className="text-[#1D3178] pb-8 text-xl sm:text-2xl font-bold font-josefin border-b-2 border-[#E1E1E4] mb-6">
                ✨ Just for You
              </h1>
              {/* Product Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 md:gap-6">
                {suggested.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white shadow-lg rounded-lg overflow-hidden transition-shadow hover:shadow-xl"
                  >
                    <div className="relative group h-40 md:h-52 overflow-hidden">
                      <Link
                        to={`/products/${item.id}`}
                        target="_top"
                        className="block h-full"
                      >
                        <img
                          src={item.image_path}
                          alt={item.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </Link>
                      {/* Hover Icons positioning fixed and styled */}
                      <div className="absolute top-1/2 -translate-y-1/2 right-0 transform translate-x-full group-hover:translate-x-0 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col gap-2 p-2 bg-[#00000030]">
                        <div
                          onClick={() =>
                            dispatch(addToCart({ ...item, qun: 1 }))
                          }
                          className="p-1.5 bg-white rounded-full text-[#FB2E86] shadow-md cursor-pointer hover:bg-[#FB2E86] hover:text-white transition"
                        >
                          <AiOutlineShoppingCart className="text-lg" />
                        </div>
                        <div
                          onClick={() =>
                            dispatch(favouriteProduct({ ...item }))
                          }
                          className="p-1.5 bg-white rounded-full text-[#FB2E86] shadow-md cursor-pointer hover:bg-[#FB2E86] hover:text-white transition"
                        >
                          <FaRegHeart className="text-lg" />
                        </div>
                        <Link
                          to={`/products/${item.id}`}
                          className="p-1.5 bg-white rounded-full text-[#FB2E86] shadow-md cursor-pointer hover:bg-[#FB2E86] hover:text-white transition"
                        >
                          <FaSearchPlus className="text-lg" />
                        </Link>
                      </div>
                    </div>
                    <div className="bg-[#F7F7F7] p-3 flex flex-col items-center">
                      <h4 className="text-sm text-[#151875] font-josefin font-semibold truncate w-full text-center pb-1">
                        {item.name}
                      </h4>
                      <div className="flex items-center gap-x-2">
                        <p className="text-sm text-[#151875] font-josefin font-bold">
                          {item.discount_price
                            ? item.discount_price
                            : item.price}{" "}
                          TK
                        </p>
                        {item.discount_price && (
                          <p className="line-through text-xs text-[#FB2448] font-josefin font-semibold">
                            {item.price} TK
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </Container>
    </section>
  );
};

export default Cart;
