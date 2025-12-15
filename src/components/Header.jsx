import React, { useContext, useEffect, useRef, useState } from "react";
import Container from "./Container";
import { CiHeart, CiMail, CiShoppingCart } from "react-icons/ci";
import { MdOutlinePhoneInTalk } from "react-icons/md";
import { RiContactsLine } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import logo from "../assets/Hekto.png";
import { ApiData } from "./ContextApi";
import { IoIosSearch, IoMdArrowBack } from "react-icons/io";
import { FaBars } from "react-icons/fa"; // এটি এখন আর মোবাইলে ব্যবহার হচ্ছে না, তবে ডেস্কটপ বা ভবিষ্যতের জন্য রাখা হলো
import { ImCross } from "react-icons/im";

// ⭐️ Firebase Auth Imports
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase.config";

const Header = () => {
  let data = useSelector((state) => state.product.cartItem);
  let apiData = useContext(ApiData);
  let navigate = useNavigate();

  // Search States
  let [search, setSearch] = useState("");
  let [searchFilter, setSearchFilter] = useState([]);

  // ⭐️ Mobile Search Toggle State
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  // Auth State
  const [loggedInUser, setLoggedInUser] = useState(null);

  let handleSearch = (e) => {
    setSearch(e.target.value);
    if (e.target.value === "") {
      setSearchFilter([]);
    } else {
      let searchItem = apiData.info.filter((item) =>
        item.name.toLowerCase().includes(e.target.value.toLowerCase())
      );
      let searchItemDummy = apiData.dummy.filter((item) =>
        item.title.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setSearchFilter([...searchItem, ...searchItemDummy]);
    }
  };

  let handleSearchItem = (item) => {
    navigate(`/products/${item.id}`);
    setSearch("");
    setSearchFilter([]);
    setShowMobileSearch(false);
  };

  let [activeIndex, setActiveIndex] = useState(-1);
  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) =>
        prev < searchFilter.length - 1 ? prev + 1 : prev
      );
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) => (prev > 0 ? prev - 1 : -1));
    }
    if (e.key === "Enter") {
      if (activeIndex !== -1) {
        handleSearchItem(searchFilter[activeIndex]);
      }
    }
  };

  let itemRefs = useRef([]);
  let searchRef = useRef();
  let [searchRefState, setSearchRefState] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setLoggedInUser(user);
    });

    if (activeIndex !== -1 && itemRefs.current[activeIndex]) {
      itemRefs.current[activeIndex].scrollIntoView({
        block: "nearest",
      });
    }

    const handleClick = (e) => {
      if (searchRef.current && searchRef.current.contains(e.target)) {
        setSearchRefState(true);
      } else {
        setSearchRefState(false);
      }
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
      unsubscribe();
    };
  }, [activeIndex]);

  return (
    <section className="bg-[#7E33E0] text-[#F1F1F1] py-3 hidden md:block">
      <Container>
        {/* =========================================
            ⭐️ MOBILE VIEW START (md:hidden)
           ========================================= */}
        <div className="md:hidden relative">
          {/* CONDITION 1: যখন সার্চ বার খোলা থাকবে */}
          {showMobileSearch ? (
            <div className="flex items-center w-full gap-2 animate-fadeIn">
              {/* Back Button */}
              <div
                onClick={() => setShowMobileSearch(false)}
                className="text-white text-2xl cursor-pointer"
              >
                <IoMdArrowBack />
              </div>

              {/* Search Input Area */}
              <div className="flex items-center relative flex-grow">
                <input
                  ref={searchRef}
                  onChange={handleSearch}
                  onKeyDown={handleKeyDown}
                  className="bg-[#E7E6EF] py-1 ps-2 pe-10 w-full text-black placeholder-gray-500 rounded-s focus:outline-none"
                  value={search}
                  type="search"
                  placeholder="Search products..."
                  autoFocus
                />
                <div className="absolute right-0 bg-[#FB2E86] text-[#fff] h-full w-[40px] flex justify-center items-center cursor-pointer rounded-e">
                  <IoIosSearch />
                </div>

                {/* Search Result Dropdown */}
                {searchRefState && searchFilter.length > 0 && (
                  <div className="absolute z-[9999] p-2 left-0 right-0 top-10 w-full max-h-[350px] overflow-y-scroll bg-[#ffffff] shadow-xl rounded-md">
                    {searchFilter.map((item, index) => (
                      <div
                        onClick={() => handleSearchItem(item)}
                        ref={(el) => (itemRefs.current[index] = el)}
                        className={`flex gap-3 mb-2 p-2 items-center cursor-pointer text-black rounded-md border-b last:border-0 ${
                          activeIndex === index
                            ? "bg-gray-200"
                            : "hover:bg-gray-100"
                        }`}
                        key={item.id || item.title}
                      >
                        <div className="w-[40px] h-[40px] flex-shrink-0">
                          <img
                            className="w-full h-full object-contain"
                            src={item.image_path || item.thumbnail}
                            alt={item.name}
                          />
                        </div>
                        <div className="flex-grow">
                          <h2 className="text-xs font-bold line-clamp-1">
                            {item.name || item.title}
                          </h2>
                          <h2 className="text-[#FB2E86] font-semibold text-xs">
                            {item.price}TK
                          </h2>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ) : (
            /* CONDITION 2: সাধারণ অবস্থা (শুধুমাত্র Logo + Search Icon) */
            <div className="flex items-center justify-between gap-x-2">
              {/* Logo */}
              <Link to="/">
                <div className="w-[80px] sm:w-[100px]">
                  <img src={logo} alt="Hekto Logo" className="w-full" />
                </div>
              </Link>

              {/* Right Side - ONLY Search Icon */}
              <div className="flex items-center text-white">
                <div
                  onClick={() => setShowMobileSearch(true)}
                  className="text-[24px] cursor-pointer hover:text-[#FB2E86] transition-colors p-1"
                >
                  <IoIosSearch />
                </div>
              </div>
            </div>
          )}
        </div>
        {/* ⭐️ MOBILE VIEW END */}

        {/* =========================================
            DESKTOP VIEW (md:block) - No Changes
           ========================================= */}
        <div className="hidden md:block">
          <div className="flex items-center justify-between">
            <div className="flex gap-10 items-center">
              <div className="flex items-center gap-1">
                <div className="text-[#fff] text-[20px] font-bold">
                  <CiMail />
                </div>
                <p className="font-[Josefin Sans] text-sm">
                  arfozian@gmail.com
                </p>
              </div>
              <div className="flex items-center gap-1">
                <div className="text-[#fff] text-[20px] font-bold">
                  <MdOutlinePhoneInTalk />
                </div>
                <p className="text-sm">+8801626681923</p>
              </div>
            </div>
            <div className="flex items-center gap-5">
              <div className="flex items-center">
                <select
                  id="language"
                  className="bg-transparent text-white focus:outline-none text-sm cursor-pointer"
                >
                  <option value="english" className="text-black">
                    English
                  </option>
                  <option value="bengali" className="text-black">
                    Bengali
                  </option>
                </select>
              </div>
              <div className="flex items-center">
                <select
                  id="curency"
                  className="bg-transparent text-white focus:outline-none text-sm cursor-pointer"
                >
                  <option value="usd" className="text-black">
                    USD
                  </option>
                  <option value="bdt" className="text-black">
                    BDT
                  </option>
                </select>
              </div>

              <Link to="/dashboard">
                <div className="flex items-center gap-1 hover:opacity-80 transition duration-150">
                  {loggedInUser ? (
                    loggedInUser.photoURL ? (
                      <img
                        src={loggedInUser.photoURL}
                        alt="User"
                        className="w-6 h-6 rounded-full object-cover border border-white"
                      />
                    ) : (
                      <RiContactsLine className="text-[20px] font-bold" />
                    )
                  ) : (
                    <p className="font-lato text-sm">Login</p>
                  )}
                  {loggedInUser &&
                    (loggedInUser.photoURL ? (
                      <p className="font-lato text-sm">
                        {loggedInUser.displayName || "My Account"}
                      </p>
                    ) : (
                      <RiContactsLine className="text-[20px] font-bold" />
                    ))}
                  {!loggedInUser && (
                    <RiContactsLine className="text-[20px] font-bold" />
                  )}
                </div>
              </Link>

              <Link to="/favouriteProducts">
                <div className="flex items-center gap-1 hover:opacity-80 transition duration-150">
                  <p className="text-sm">Wishlist</p>
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
                  <div className="absolute -bottom-1 -right-1 bg-[#dedede] h-4 w-4 rounded-full flex items-center justify-center text-[10px] text-[#FB2E86] font-bold">
                    {data.length}
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Header;
