import React from "react";
import Container from "../Container";
import { IoMdCheckmark } from "react-icons/io";
import { Link } from "react-router-dom";

const CompleteOrder = () => {
  return (
    <section className="py-16">
      <Container>
        <div className="relative">
          <div className="flex justify-center">
            <div className="text-center">
              <div className="">
                <IoMdCheckmark className="text-[#FF1788] text-8xl bg-[#F6F7FA] rounded-full p-2 text-center inline-block mb-2" />
              </div>
              <h2 className="text-[#101750] text-[36px] font-bold font-josefin pb-2">
                Your Order Is Completed!{" "}
              </h2>
              <p className="text-[#8D92A7] text-[16px] font-normal font-lato leading-[30px] max-w-[600px] pb-6">
                Thank you for your order! Your order is being processed and will
                be completed within 3-6 hours. You will receive an email
                confirmation when your order is completed.
              </p>
              <div className="pb-12">
                <Link
                  to={"/products"}
                  className="text-[16px] font-semibold font-josefin bg-[#FB2E86] rounded-[5px] px-8 py-4 text-white"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default CompleteOrder;
