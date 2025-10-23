import React, { useContext, useEffect, useState } from "react";
import Container from "./Container";
import { Link } from "react-router-dom";
import Pagination from "./Pagination";
import { useDispatch } from "react-redux";
import { addToCart, favouriteProduct } from "./slices/productSlice";
import { IoCartOutline } from "react-icons/io5";
import { CiHeart, CiZoomIn } from "react-icons/ci";

const Post = ({
  allPage,
  pageNumber,
  prev,
  next,
  currentPage,
  filterProduct,
}) => {
  let dispatch = useDispatch();
  let [categoryFilterProduct, setCategoryFilterProduct] = useState([]);
  useEffect(() => {
    let sliceCatePro = filterProduct.slice(0, 12);
    setCategoryFilterProduct(sliceCatePro);
  }, [filterProduct]);

  let [showAll, setShowAll] = useState(true);
  let handleShowAll = () => {
    setCategoryFilterProduct(filterProduct);
    setShowAll(false);
  };
  let handleLess = () => {
    let sliceCatePro = filterProduct.slice(0, 12);
    setCategoryFilterProduct(sliceCatePro);
    setShowAll(true);
  };
  return (
    <section>
      <Container>
        {categoryFilterProduct.length > 0 ? (
          <>
            <div className="flex flex-wrap">
              {categoryFilterProduct.map((item) => (
                <div className="w-1/4 px-3 mb-3 relative group shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]">
                  <Link to={`/products/${item.id}`}>
                    <div className="">
                      <img src={item.image_path} alt="" />
                    </div>
                    <div className="">
                      <h4>{item.name}</h4>
                      <p>{item.discount_price} TK</p>
                      <p>
                        <s>{item.price}</s>TK
                      </p>
                    </div>
                  </Link>
                  <div className="flex gap-3 absolute left-3 top-1 text-[25px] invisible group-hover:visible group-hover:text-[#fff]">
                    <div
                      onClick={() => dispatch(addToCart({ ...item, qun: 1 }))}
                      className="hover:text-[#FB2E86]"
                    >
                      <IoCartOutline />
                    </div>
                    <Link to="/favouriteProducts">
                      <div
                        onClick={() => dispatch(favouriteProduct(item))}
                        className="hover:text-[#FB2E86]"
                      >
                        <CiHeart />
                      </div>
                    </Link>
                    <div className="hover:text-[#FB2E86]">
                      <CiZoomIn />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {filterProduct.length > 12 && showAll ? (
              <div className="text-center">
                <h2
                  onClick={handleShowAll}
                  className="font-lato cursor-pointer bg-[#4368fe] text-[20px] text-[#fff]"
                >
                  Show More
                </h2>
              </div>
            ) : (
              filterProduct.length > 12 && (
                <div className="text-center">
                  <h2
                    onClick={handleLess}
                    className="font-lato cursor-pointer bg-[#4368fe] text-[20px] text-[#fff]"
                  >
                    Show Less
                  </h2>
                </div>
              )
            )}
          </>
        ) : (
          <>
            <div className="flex flex-wrap">
              {allPage.map((item) => (
                <div className="w-1/4 px-3 mb-3 relative group shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]">
                  <Link to={`/products/${item.id}`}>
                    <div className="">
                      <img src={item.image_path} alt="" />
                    </div>
                    <div className="">
                      <h4>{item.name}</h4>
                      <p>{item.discount_price} TK</p>
                      <p>
                        <s>{item.price}</s>TK
                      </p>
                    </div>
                  </Link>
                  <div className="flex gap-3 absolute left-3 top-1 text-[25px] invisible group-hover:visible group-hover:text-[#fff]">
                    <div
                      onClick={() => dispatch(addToCart({ ...item, qun: 1 }))}
                      className="hover:text-[#FB2E86]"
                    >
                      <IoCartOutline />
                    </div>
                    <Link to="/favouriteProducts">
                      <div
                        onClick={() => dispatch(favouriteProduct(item))}
                        className="hover:text-[#FB2E86]"
                      >
                        <CiHeart />
                      </div>
                    </Link>
                    <div className="hover:text-[#FB2E86]">
                      <CiZoomIn />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Pagination
              pageNumber={pageNumber}
              prev={prev}
              next={next}
              currentPage={currentPage}
            />
          </>
        )}
      </Container>
    </section>
  );
};

export default Post;
