import React from "react";
import Container from "./Container";
import { CiHeart, CiMail, CiShoppingCart } from "react-icons/ci";
import { MdOutlinePhoneInTalk } from "react-icons/md";
import { RiContactsLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  let data = useSelector((state) => state.product.cartItem);
  return (
    <section className="bg-[#7E33E0] text-[#F1F1F1] py-3">
      <Container>
        <div className="flex items-center justify-between">
          <div className="flex gap-10 items-center">
            <div className="flex items-center gap-1">
              <div className="text-[#fff] text-[20px] font-bold">
                <CiMail />
              </div>
              <p className="font-[Josefin Sans]">arfozian@gmail.com</p>
            </div>
            <div className="flex items-center gap-1">
              <div className="text-[#fff] text-[20px] font-bold">
                <MdOutlinePhoneInTalk />
              </div>
              <p>+8801626681923</p>
            </div>
          </div>
          <div className="flex items-center gap-5">
            <div className="flex items-center">
              <select name="" id="language">
                <option value="english">English</option>
                <option value="bengali">Bengali</option>
              </select>
            </div>
            <div className="flex items-center">
              <select name="" id="curency">
                <option value="usd">USD</option>
                <option value="bdt">BDT</option>
              </select>
            </div>
            <Link to="/login">
              <div className="flex items-center">
                <p>Login</p>
                <RiContactsLine />
              </div>
            </Link>
            <Link to="/favouriteProducts">
              <div className="flex items-center">
                <p>Wishlist</p>
                <div className="text-[#fff] text-[20px] font-bold">
                  <CiHeart />
                </div>
              </div>
            </Link>
            <div className="relative text-[#fff] text-[25px] ">
              <Link to="/cart">
                <div className="font-bold ">
                  <CiShoppingCart />
                </div>
                <div className="absolute bottom-3 left-5 bg-[#dedede] min-h-[25px] min-w-[25px] rounded-full leading-[25px] text-center text-[#FB2E86]">
                  {data.length}
                </div>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Header;
