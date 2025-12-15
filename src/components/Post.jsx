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

  // Initial slicing to show only 12 products
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

  // Helper function to render product card
  const renderProductCard = (item) => (
    <div
      key={item.id}
      className="px-2 sm:px-3 mb-6 relative group shadow-md transition duration-300 hover:shadow-lg bg-white"
    >
      <Link to={`/products/${item.id}`}>
        {/* Product Image */}
        <div className="bg-[#F6F7FB] flex items-center justify-center p-4">
          <img
            className="w-full max-h-[180px] object-contain"
            src={item.image_path}
            alt={item.name || item.title}
          />
        </div>
        {/* Product Info */}
        <div className="text-center py-3">
          <h4 className="font-jose text-base text-[#151875] truncate px-1">
            {item.name || item.title}
          </h4>
          <p className="font-lato text-sm text-[#151875] mt-1 font-bold">
            {item.discount_price} TK
          </p>
          <p className="font-lato text-xs text-[#9DA0AE] mt-1">
            <s className="line-through">{item.price}</s>TK
          </p>
        </div>
      </Link>

      {/* Action Icons - Adjusted for better visibility and transition */}
      <div className="flex gap-3 absolute left-1/2 -translate-x-1/2 top-4 text-[25px] transition-all duration-300 invisible opacity-0 group-hover:visible group-hover:opacity-100 group-hover:text-[#fff] z-10">
        {/* Cart Icon */}
        <div
          onClick={() => dispatch(addToCart({ ...item, qun: 1 }))}
          className="hover:text-[#FB2E86] cursor-pointer p-1 bg-white/20 rounded-full"
        >
          <IoCartOutline />
        </div>

        {/* Wishlist Icon */}
        <Link to="/favouriteProducts" onClick={(e) => e.stopPropagation()}>
          <div
            onClick={() => dispatch(favouriteProduct(item))}
            className="hover:text-[#FB2E86] cursor-pointer p-1 bg-white/20 rounded-full"
          >
            <CiHeart />
          </div>
        </Link>

        {/* Zoom Icon */}
        <Link to={`/products/${item.id}`} onClick={(e) => e.stopPropagation()}>
          <div className="hover:text-[#FB2E86] cursor-pointer p-1 bg-white/20 rounded-full">
            <CiZoomIn />
          </div>
        </Link>
      </div>
    </div>
  );

  return (
    <section className="py-5 md:py-10">
      <Container>
        {categoryFilterProduct.length > 0 ? (
          <>
            {/* Products Grid - রেসপনসিভ গ্রিড ক্লাস ব্যবহার করা হলো */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {categoryFilterProduct.map((item) => renderProductCard(item))}
            </div>

            {/* Show More/Less Logic */}
            {filterProduct.length > 12 && showAll ? (
              <div className="text-center mt-8">
                <button
                  onClick={handleShowAll}
                  className="font-lato cursor-pointer bg-[#4368fe] text-[18px] md:text-[20px] text-white py-2 px-6 rounded-md w-full max-w-xs mx-auto block hover:bg-[#3350c7] transition-colors"
                >
                  Show More
                </button>
              </div>
            ) : (
              filterProduct.length > 12 && (
                <div className="text-center mt-8">
                  <button
                    onClick={handleLess}
                    className="font-lato cursor-pointer bg-[#4368fe] text-[18px] md:text-[20px] text-white py-2 px-6 rounded-md w-full max-w-xs mx-auto block hover:bg-[#3350c7] transition-colors"
                  >
                    Show Less
                  </button>
                </div>
              )
            )}
          </>
        ) : (
          <>
            {/* Paginated Products Grid - রেসপনসিভ গ্রিড ক্লাস ব্যবহার করা হলো */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {allPage.map((item) => renderProductCard(item))}
            </div>

            {/* Pagination Component */}
            <div className="mt-10">
              <Pagination
                pageNumber={pageNumber}
                prev={prev}
                next={next}
                currentPage={currentPage}
              />
            </div>
          </>
        )}
      </Container>
    </section>
  );
};

export default Post;
