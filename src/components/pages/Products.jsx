import React, { useContext, useEffect, useState } from "react";
import { LuLayoutGrid, LuList } from "react-icons/lu";
import Container from "../Container";
import Post from "../Post";
import { ApiData } from "../ContextApi";

const Products = () => {
  let data = useContext(ApiData);
  let [cetegory, setCategory] = useState([]);
  useEffect(() => {
    // API data থাকলে ক্যাটাগরি সেট করা
    if (data && data.info) {
      setCategory([...new Set(data.info.map((item) => item.category))]);
    }
  }, [data]);

  let [perPage, setPerPage] = useState(12);
  let [currentPage, setCurrentPage] = useState(1);

  // Pagination Logic
  let lastPage = perPage * currentPage;
  let firstPage = lastPage - perPage;
  let allPage = data.info.slice(firstPage, lastPage);

  let pageNumber = [];
  // data.info.length চেক করা হয়েছে যাতে undefined না আসে
  if (data && data.info) {
    for (let i = 0; i < Math.ceil(data.info.length / perPage); i++) {
      pageNumber.push(i);
    }
  }

  let prev = () => {
    if (currentPage > 1) {
      setCurrentPage((state) => state - 1);
    }
  };
  let next = () => {
    if (currentPage < pageNumber.length) {
      setCurrentPage((state) => state + 1);
    }
  };

  let handlePerPageChange = (e) => {
    setPerPage(parseInt(e.target.value)); // ইন্টিজারে কনভার্ট করা হলো
    setCurrentPage(1); // প্রতি পেজে আইটেম পরিবর্তন হলে প্রথম পেজে ফিরে যাওয়া
  };

  let [filterProduct, setfilterProduct] = useState([]);
  let handleChangeCategory = (e) => {
    const selectedCategory = e.target.value;
    if (selectedCategory === "") {
      setfilterProduct([]); // "All Product" সিলেক্ট হলে ফিল্টার খালি
    } else {
      let filterCategoryProduct = data.info.filter(
        (item) => item.category === selectedCategory
      );
      setfilterProduct(filterCategoryProduct);
    }
    // যেহেতু filterProduct স্টেট পরিবর্তন হচ্ছে, Post কম্পোনেন্ট নিজেই Show More/Less লজিক দিয়ে হ্যান্ডেল করবে।
    setCurrentPage(1); // ফিল্টার পরিবর্তন হলে পেজিনেশন রিসেট
  };

  // View State (Added for future logic, although not implemented yet)
  const [viewMode, setViewMode] = useState("grid");

  return (
    <section className="py-5 md:py-10">
      <Container>
        {/* Filter/Header Bar - রেসপনসিভ গ্রিড ব্যবহার করা হলো */}
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-x-4 gap-y-3 mb-8 items-center font-lato text-sm">
          {/* Header Title */}
          <div className="font-jose text-[#151875] text-lg sm:text-xl md:text-[22px] col-span-2 sm:col-span-4 md:col-span-6 lg:col-span-4">
            <h2>Ecommerce Acceories & Fashion item </h2>
          </div>

          {/* Per Page Filter */}
          <div className="flex items-center gap-2 lg:col-span-1 text-[13px] md:text-sm whitespace-nowrap">
            <p className="font-medium text-[#151875]">Per Page:</p>
            <select
              onChange={handlePerPageChange}
              className="border border-gray-300 p-1 rounded focus:outline-none focus:ring-1 focus:ring-[#FB2E86]"
            >
              <option value="12">12</option>{" "}
              {/* Added 12 as default for initial slice */}
              <option value="16">16</option>
              <option value="20">20</option>
              <option value="30">30</option>
            </select>
          </div>

          {/* Sort By / Category Filter */}
          <div className="flex items-center gap-2 lg:col-span-2 text-[13px] md:text-sm whitespace-nowrap">
            <p className="font-medium text-[#151875]">Sort By:</p>
            <select
              onChange={handleChangeCategory}
              className="capitalize border border-gray-300 p-1 rounded focus:outline-none focus:ring-1 focus:ring-[#FB2E86]"
            >
              <option value="">All Product</option>
              {cetegory.map((categoryItem) => (
                <option
                  key={categoryItem}
                  className="capitalize"
                  value={categoryItem}
                >
                  {categoryItem}
                </option>
              ))}
            </select>
          </div>

          {/* View Icons (Responsive positioning in the grid) */}
          <div className="flex items-center gap-3 lg:col-span-1 text-[13px] md:text-sm whitespace-nowrap">
            <p className="font-medium text-[#151875]">View:</p>
            <div className="inline-flex gap-2 text-xl text-[#151875]">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-1 rounded transition-colors ${
                  viewMode === "grid"
                    ? "text-[#FB2E86] bg-gray-100"
                    : "hover:text-[#FB2E86]"
                }`}
                aria-label="Grid View"
              >
                <LuLayoutGrid />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-1 rounded transition-colors ${
                  viewMode === "list"
                    ? "text-[#FB2E86] bg-gray-100"
                    : "hover:text-[#FB2E86]"
                }`}
                aria-label="List View"
              >
                <LuList />
              </button>
            </div>
          </div>
        </div>

        {/* Products Post Component */}
        <Post
          allPage={allPage}
          pageNumber={pageNumber}
          prev={prev}
          next={next}
          currentPage={currentPage}
          filterProduct={filterProduct}
        />
      </Container>
    </section>
  );
};

export default Products;
