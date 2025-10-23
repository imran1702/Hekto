import React from "react";
import Container from "../Container";
import { Link } from "react-router-dom";

const Pages = () => {
  return (
    <section>
      <Container>
        <div className="grid grid-cols-4 text-center gap-2">
          <Link to="/cart">
            <div className="text-[#FB2E86] shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] h-[150px] leading-[150px] text-[25px] font-bold font-lato hover:bg-[#F5276C] hover:text-[#fff]">
              <h2>Cart Items</h2>
            </div>
          </Link>
          <Link to="/favouriteProducts">
            <div className="text-[#FB2E86] shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] h-[150px] leading-[150px] text-[25px] font-bold font-lato hover:bg-[#F5276C] hover:text-[#fff]">
              <h2>Favourite Items</h2>
            </div>
          </Link>
          <Link to="/blog">
            <div className="text-[#FB2E86] shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] h-[150px] leading-[150px] text-[25px] font-bold font-lato hover:bg-[#F5276C] hover:text-[#fff]">
              <h2>Blog</h2>
            </div>
          </Link>
          <Link to="/contact">
            <div className="text-[#FB2E86] shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] h-[150px] leading-[150px] text-[25px] font-bold font-lato hover:bg-[#F5276C] hover:text-[#fff]">
              <h2>Contact</h2>
            </div>
          </Link>
          <Link to="/blog">
            <div className="text-[#FB2E86] shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] h-[150px] leading-[150px] text-[25px] font-bold font-lato hover:bg-[#F5276C] hover:text-[#fff]">
              <h2>Blog</h2>
            </div>
          </Link>
          <Link>
            <div className="text-[#FB2E86] shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] h-[150px] leading-[150px] text-[25px] font-bold font-lato hover:bg-[#F5276C] hover:text-[#fff]">
              <h2>Blog</h2>
            </div>
          </Link>
          <Link>
            <div className="text-[#FB2E86] shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] h-[150px] leading-[150px] text-[25px] font-bold font-lato hover:bg-[#F5276C] hover:text-[#fff]">
              <h2>Blog</h2>
            </div>
          </Link>
          <Link>
            <div className="text-[#FB2E86] shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] h-[150px] leading-[150px] text-[25px] font-bold font-lato hover:bg-[#F5276C] hover:text-[#fff]">
              <h2>Blog</h2>
            </div>
          </Link>
          <Link>
            <div className="text-[#FB2E86] shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] h-[150px] leading-[150px] text-[25px] font-bold font-lato hover:bg-[#F5276C] hover:text-[#fff]">
              <h2>Blog</h2>
            </div>
          </Link>
          <Link>
            <div className="text-[#FB2E86] shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] h-[150px] leading-[150px] text-[25px] font-bold font-lato hover:bg-[#F5276C] hover:text-[#fff]">
              <h2>Blog</h2>
            </div>
          </Link>
        </div>
      </Container>
    </section>
  );
};

export default Pages;
