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
      acc.totalPrice += item.price * item.qun;
      acc.totalDisAmount += (item.price - item.discount_price || 0 ) * item.qun;
      acc.totalQuantity += item.qun;
      return acc;
    },
    { totalPrice: 0, totalQuantity: 0, totalDisAmount: 0 }
  );

  useEffect(() => {
    let finterSuggested = [...furApi.info].sort(() => 0.5 - Math.random());
    let product = finterSuggested.slice(0, 16);
    setSuggested(product);
  }, [furApi]);

  return (
    <section className="py-16">
      <Container>
        {data.length > 0 ? (
          <div className="lg:flex justify-between gap-6">
            <div className="lg:w-2/3 w-full pb-12 lg:pb-0">
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="text-start py-2 sm:py-6 text-[#1D3178] text-[12px] sm:text-[16px] md:text-[20px] font-bold font-josefin">
                      Product
                    </th>
                    <th className="text-start py-2 sm:py-6 text-[#1D3178] text-[12px] sm:text-[16px] md:text-[20px] font-bold font-josefin px-2 sm:px-8">
                      Price
                    </th>
                    <th className="text-start py-2 sm:py-6 text-[#1D3178] text-[12px] sm:text-[16px] md:text-[20px] font-bold font-josefin px-2 sm:px-8">
                      Quantity
                    </th>
                    <th className="text-start py-2 sm:py-6 text-[#1D3178] text-[12px] sm:text-[16px] md:text-[20px] font-bold font-josefin px-2 sm:px-8">
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item, i) => (
                    <tr className="border-b-2 border-[#E1E1E4]">
                      <Link to={`/products/${item.id}`}>
                        <th className="text-start text-[#1D3178] text-[14px] font-medium font-josefin py-4">
                          <div className="flex items-center gap-x-2 sm:gap-x-4">
                            <div className="relative">
                              <img
                                src={item.image_path || item.thumbnail}
                                alt=""
                                className="h-10 w-12 sm:h-25 sm:w-30"
                              />
                              <div
                                onClick={() => dispatch(cartItemRemove(i))}
                                className="absolute top-[-8px] right-[-8px]"
                              >
                                <IoMdClose className="bg-white rounded-full text-lg sm:text-2xl p-[2px] sm:p-[4px] font-bold cursor-pointer border border-[#0000002e] hover:text-red-600" />
                              </div>
                            </div>
                            <div>
                              <h2 className="font-bold font-josefin text-[#000] pb-1 sm:pb-2 text-[8px] sm:text-[16px]">
                                {item.name || item.title}
                              </h2>
                              <p className="font-medium font-josefin text-[#A1A8C1] pb-1 sm:pb-2 text-[8px] sm:text-[14px]">
                                Finish: {item.finish}
                              </p>
                              <p className="font-medium font-josefin text-[#A1A8C1] text-[8px] sm:text-[14px]">
                                Wood Type: {item.wood_type}
                              </p>
                            </div>
                          </div>
                        </th>
                      </Link>
                      <th className="text-start text-[#1D3178] text-[8px] sm:text-[14px] font-medium font-josefin px-2 sm:px-8">
                        <p>{item.price} TK</p>
                      </th>
                      <th className="text-start text-[#1D3178] text-[8px] sm:text-[14px] font-medium font-josefin px-2 sm:px-8">
                        <div className="flex items-center gap-x-2">
                          <button className="cursor-pointer">
                            {item.qun > 1 ? (
                              <FaMinus onClick={() => dispatch(decrement(i))} />
                            ) : (
                              <RiDeleteBin6Line
                                onClick={() => dispatch(cartItemRemove(i))}
                              />
                            )}
                          </button>
                          <p className="text-[#15245E] text-[8px] sm:text-[16px] font-bold font-josefin">
                            {item.qun}
                          </p>
                          <button
                            onClick={() => dispatch(increment(i))}
                            className="cursor-pointer"
                          >
                            <FaPlus />
                          </button>
                        </div>
                      </th>
                      <th className="text-start text-[#1D3178] text-[8px] sm:text-[14px] font-medium font-josefin px-2 sm:px-8">
                        {(item.price * item.qun).toFixed(2)} TK
                      </th>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="flex justify-between items-center pt-8">
                <div>
                  <Link
                    to={"/products"}
                    className="text-[16px] font-semibold font-josefin bg-[#FB2E86] rounded-[5px] px-8 py-2 text-white cursor-pointer inline-block"
                  >
                    Update Curt
                  </Link>
                </div>
                <div>
                  <button
                    onClick={() => dispatch(clearCartItem())}
                    className="text-[16px] font-semibold font-josefin bg-[#FB2E86] rounded-[5px] px-8 py-2 text-white cursor-pointer"
                  >
                    Clear Curt
                  </button>
                </div>
              </div>
            </div>

            <div className="lg:w-1/3 w-full">
              <div className="w-full pl-0 lg:pl-4 mt-6">
                <h2 className="pb-6 text-center text-[#1D3178] text-[20px] font-bold font-josefin">
                  Cart Totals
                </h2>
                <table className="bg-[#F4F4FC] w-full rounded-[5px]">
                  <tbody>
                    <tr className="border-b-2 border-[#E8E6F1]">
                      <th className="py-6 text-start pl-6">
                        <h4>Subtotals:</h4>
                      </th>
                      <th className="py-6 text-start">
                        {totalPrice.toFixed(2)} TK
                      </th>
                    </tr>
                    <tr className="border-b-2 border-[#E8E6F1]">
                      <th className="py-6 text-start pl-6">
                        <h4>Total Quantity:</h4>
                      </th>
                      <th className="py-6 text-start">{totalQuantity}</th>
                    </tr>
                    <tr className="border-b-2 border-[#E8E6F1]">
                      <th className="py-6 text-start pl-6">
                        <h4>Less Discount:</h4>
                      </th>
                      <th className="py-6 text-start">
                        {totalDisAmount.toFixed(2)}
                      </th>
                    </tr>
                    <tr className="border-b-2 border-[#E8E6F1]">
                      <th className="py-6 pl-6 text-start">
                        <h4>Totals:</h4>
                      </th>
                      <th className="py-6 text-start">
                        {(totalPrice - totalDisAmount).toFixed(2)} TK
                      </th>
                    </tr>
                    <tr>
                      <td colSpan={2} className="py-6">
                        <div className="pb-6">
                          <label
                            htmlFor=""
                            className="text-[14px] pl-6 flex gap-x-2"
                          >
                            <input
                              type="checkbox"
                              required
                              className="rounded-full accent-[#19D16F]"
                            />
                            Shipping & taxes calculated at checkout
                          </label>
                        </div>
                        <div className="text-center px-6">
                          <Link
                            to={"/checkout"}
                            className="bg-[#19D16F] w-full py-2 rounded-[5px] inline-block text-white text-[14px] font-bold font-lato"
                          >
                            Proceed To Checkout
                          </Link>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="w-full pl-0 lg:pl-4 mt-8">
                <h2 className="pb-6 text-center text-[#1D3178] text-[20px] font-bold font-josefin">
                  Calculate Shopping
                </h2>
                <table className="bg-[#F4F4FC] w-full rounded-[5px]">
                  <tbody>
                    <tr className="border-b-2 border-[#E8E6F1]">
                      <th className="pb-2 pt-6 text-start pl-6">
                        <input
                          type="text"
                          className="w-full py-2 border-0 outline-0"
                          required
                          autoComplete="address"
                          placeholder="Bangladesh"
                        />
                      </th>
                    </tr>
                    <tr className="border-b-2 border-[#E8E6F1]">
                      <th className="pb-2 pt-6 text-start pl-6">
                        <input
                          type="text"
                          className="w-full py-2 border-0 outline-0"
                          required
                          autoComplete="address"
                          placeholder="Mirpur Dhaka - 1200"
                        />
                      </th>
                    </tr>
                    <tr className="border-b-2 border-[#E8E6F1]">
                      <th className="pb-2 pt-6 text-start pl-6">
                        <input
                          type="text"
                          className="w-full py-2 border-0 outline-0"
                          required
                          autoComplete="address"
                          placeholder="Postal Code"
                        />
                      </th>
                    </tr>
                    <tr className="">
                      <th className="pb-6 pt-6 text-start pl-6">
                        <button className="text-[16px] font-semibold font-josefin bg-[#FB2E86] rounded-[5px] px-12 py-3 text-white cursor-pointer">
                          Calculate Shiping
                        </button>
                      </th>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div className="text-center pb-16">
              <h2 className="text-3xl text-[#262626] font-bold font-dms text-center pb-6">
                Your Cart is Empty <BsCartXFill className="inline-block" />
              </h2>
              <div className="text-center">
                <Link
                  to={"/products"}
                  className="text-md sm:text-2xl text-[#fff] font-bold font-dms bg-[#262626] py-2 px-6 sm:px-12 rounded-[5px] hover:bg-[#262626a8]"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
            <div>
              <h1 className="text-blue-500 pb-6 text-[25px] font-bold font-josefin">
                Just for you
              </h1>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4">
                {suggested.map((item) => (
                  <div className="shadow-lg mb-4">
                    <div className="relative group overflow-hidden">
                      <Link to={`/products/${item.id}`} target="_top">
                        <img
                          src={item.image_path}
                          alt=""
                          className="rounded-t-[5px]"
                        />
                      </Link>
                      <div className="absolute -left-15 group-hover:left-2 bottom-8 opacity-0 group-hover:opacity-100 transition-all ease-in-out duration-500">
                        <div
                          onClick={() =>
                            dispatch(addToCart({ ...item, qun: 1 }))
                          }
                          className="pb-4"
                        >
                          <AiOutlineShoppingCart className="text-[#fff] cursor-pointer hover:text-gray-200 text-[37px] shadow-2xl shadow-black p-1 rounded-full" />
                        </div>
                        <div
                          onClick={() =>
                            dispatch(favouriteProduct({ ...item }))
                          }
                          className="pb-4"
                        >
                          <FaRegHeart className="text-[#fff] cursor-pointer hover:text-gray-200 text-[34px] shadow-2xl shadow-black p-1 rounded-full" />
                        </div>
                        <div className="pb-2">
                          <FaSearchPlus className="text-[#fff] cursor-pointer hover:text-gray-200 text-[34px] shadow-2xl shadow-black p-1 rounded-full" />
                        </div>
                      </div>
                    </div>
                    <div className="bg-[#F7F7F7] px-2 sm:flex justify-between items-center py-4">
                      <h4 className="text-[12px] text-[#151875] font-josefin font-semibold pb-2 sm:pb-0">
                        {item.name}
                      </h4>
                      <div className="flex items-center gap-x-4">
                        <p className="text-[12px] text-[#151875] font-josefin font-semibold">
                          {item.discount_price} TK
                        </p>
                        <p className="line-through text-[12px] text-[#FB2448] font-josefin font-semibold">
                          {item.price} TK
                        </p>
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
