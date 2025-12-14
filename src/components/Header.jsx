import React, { useContext, useEffect, useRef, useState } from "react";
import Container from "./Container";
import { CiHeart, CiMail, CiShoppingCart } from "react-icons/ci";
import { MdOutlinePhoneInTalk } from "react-icons/md";
import { RiContactsLine } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import logo from "../assets/Hekto.png";
import { ApiData } from "./ContextApi";
import { IoIosSearch } from "react-icons/io";
import { FaBars } from "react-icons/fa";
import { ImCross } from "react-icons/im";

// ⭐️ Firebase Auth Imports
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase.config"; // ধরে নিলাম আপনার auth এক্সপোর্ট এখানে আছে

const Header = () => {
  let data = useSelector((state) => state.product.cartItem);

  let apiData = useContext(ApiData);

  let navigate = useNavigate();
  let [search, setSearch] = useState("");
  let [searchFilter, setSearchFilter] = useState([]);

  // ⭐️ নতুন স্টেট: লগইন করা ইউজারকে ট্র্যাক করার জন্য
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

      // Merge results
      setSearchFilter([...searchItem, ...searchItemDummy]);
    }
  };

  let handleSearchItem = (item) => {
    navigate(`/products/${item.id}`);
    setSearch("");
    setSearchFilter([]);
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
  let menuRef = useRef();
  let [searchRefState, setSearchRefState] = useState(false);
  let [menu, setMenu] = useState(false);

  useEffect(() => {
    // ⭐️ Auth স্টেট পরিবর্তন ট্র্যাক করার জন্য নতুন লজিক
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

      if (menuRef.current && menuRef.current.contains(e.target)) {
        setMenu((prevMenu) => !prevMenu); // prevState ব্যবহার করে আপডেট করা হলো
      } else {
        setMenu(false);
      }
    };

    document.addEventListener("click", handleClick);

    // Cleanup function for both listeners
    return () => {
      document.removeEventListener("click", handleClick);
      unsubscribe(); // Auth listener clean up
    };
  }, [activeIndex]); // menu dependency সরানো হলো, কারণhandleClick ফাংশনের মাধ্যমে toggle করা হচ্ছে

  return (
    <section className="md:bg-[#7E33E0] text-[#F1F1F1] py-3">
      <Container>
        {/* Mobile Menu & Search (unchanged) */}
        <div className="md:hidden relative flex items-center justify-between gap-x-2">
          <Link to="/">
            <div className="w-full">
              <img src={logo} alt="" />
            </div>
          </Link>
          <div className="flex items-center relative">
            <input
              ref={searchRef}
              onChange={handleSearch}
              onKeyDown={handleKeyDown}
              className="bg-[#E7E6EF] py-1 w-[180px] ps-2 text-black"
              value={search}
              type="search"
              placeholder="Search..."
            />
            <div className="absolute right-0 bg-[#FB2E86] text-[#fff] p-2 cursor-pointer">
              <IoIosSearch />
            </div>
            {searchRefState && (
              <>
                {searchFilter.length > 0 && (
                  <div className="absolute z-[9999] p-3 right-0 top-8 w-[300px] h-[450px] overflow-y-scroll bg-[#ffffff] shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]">
                    {searchFilter.map((item, index) => (
                      <div
                        onClick={() => handleSearchItem(item)}
                        ref={(el) => (itemRefs.current[index] = el)}
                        className={`flex gap-3 mb-2 p-2 items-center cursor-pointer bg-[#ffffff] shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] ${
                          activeIndex === index
                            ? "bg-gray-200 text-[#262626] rounded-[5px]"
                            : ""
                        }`}
                        key={item.id || item.title}
                      >
                        <div className="w-[50px]">
                          <img
                            className="w-full"
                            src={item.image_path || item.thumbnail}
                            alt={item.name || item.title}
                          />
                        </div>
                        <div className="">
                          <h2 className="text-black">
                            {item.name || item.title}
                          </h2>
                          <h2 className="text-[#FB2E86]">{item.price}TK</h2>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
          <div className="">
            <div
              ref={menuRef}
              className="text-black text-[25px] font-bold cursor-pointer"
            >
              <FaBars />
            </div>
            {menu && (
              <div className="absolute left-0 top-0 bg-[#FF00FF] z-[9999] w-50 flex justify-between">
                <ul className="p-3">
                  <Link to="/">
                    <li className="hover:ps-5">Home</li>
                  </Link>
                  <Link to="/products">
                    <li className="hover:ps-5">Products</li>
                  </Link>
                  <Link to="/blog">
                    <li className="hover:ps-5">Blog</li>
                  </Link>
                  <Link to="shop">
                    <li className="hover:ps-5">Shop</li>
                  </Link>
                  <Link to="/contact">
                    <li className="hover:ps-5">Contact</li>
                  </Link>
                </ul>
                <div className="">
                  <ImCross />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Desktop View (Change applied here) */}
        <div className="hidden md:block">
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

              {/* ⭐️ এখানে পরিবর্তন করা হয়েছে: নাম/আইকন এর পরিবর্তে ছবি */}
              <Link to="/dashboard">
                <div className="flex items-center gap-1">
                  {loggedInUser ? (
                    loggedInUser.photoURL ? (
                      <img
                        src={loggedInUser.photoURL}
                        alt={loggedInUser.displayName || "User"}
                        className="w-6 h-6 rounded-full object-cover border border-white"
                      />
                    ) : (
                      // যদি ছবি না থাকে, কিন্তু লগইন থাকে, তবে RiContactsLine আইকন
                      <RiContactsLine className="text-[20px] font-bold" />
                    )
                  ) : (
                    // যদি লগইন না থাকে, তবে 'Login' টেক্সট এবং RiContactsLine আইকন
                    <>
                      <p className="font-lato">Login</p>
                      <RiContactsLine className="text-[20px] font-bold" />
                    </>
                  )}
                  {/* লগইন থাকা অবস্থায় নাম বা 'My Account' দেখানোর অংশটি হাইড করা হলো */}
                  {loggedInUser && loggedInUser.photoURL && (
                    <p className="hidden md:block font-lato">
                      {loggedInUser.displayName || "My Account"}
                    </p>
                  )}
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
        </div>
      </Container>
    </section>
  );
};

export default Header;
