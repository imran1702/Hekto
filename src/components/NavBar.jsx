import React, { useContext, useEffect, useRef, useState } from "react";
import logo from "../assets/Hekto.png";
import Container from "./Container";
import { IoIosSearch } from "react-icons/io";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { ApiData } from "./ContextApi";
import { HiMenu, HiX } from "react-icons/hi";

const NavBar = () => {
  let data = useContext(ApiData);
  let navigate = useNavigate();

  let [search, setSearch] = useState("");
  let [searchFilter, setSearchFilter] = useState([]);
  let [showMobileMenu, setShowMobileMenu] = useState(false);

  /* ✅ Navbar hide/show on scroll */
  let [showNavbar, setShowNavbar] = useState(true);
  let lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setShowNavbar(false); // scroll down
      } else {
        setShowNavbar(true); // scroll up
      }
      lastScrollY.current = currentScrollY;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* 🔍 Search */
  let handleSearch = (e) => {
    setSearch(e.target.value);
    setSearchRefState(true); // ✅ FIX: desktop typing issue

    if (e.target.value === "") {
      setSearchFilter([]);
    } else {
      let searchItem = data.info.filter((item) =>
        item.name.toLowerCase().includes(e.target.value.toLowerCase())
      );

      let searchItemDummy = data.dummy.filter((item) =>
        item.title.toLowerCase().includes(e.target.value.toLowerCase())
      );

      setSearchFilter([...searchItem, ...searchItemDummy]);
    }
  };

  let handleSearchItem = (item) => {
    navigate(`/products/${item.id}`);
    setSearch("");
    setSearchFilter([]);
    setShowMobileMenu(false);
  };

  /* ⌨️ Keyboard navigation */
  let [activeIndex, setActiveIndex] = useState(-1);

  /* 🔄 Reset activeIndex when search results change */
  useEffect(() => {
    setActiveIndex(-1);
  }, [searchFilter]);

  const handleKeyDown = (e) => {
    if (searchFilter.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((p) => (p < searchFilter.length - 1 ? p + 1 : p));
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((p) => (p > 0 ? p - 1 : -1));
    }

    if (e.key === "Enter") {
      handleSearchItem(searchFilter[activeIndex !== -1 ? activeIndex : 0]);
    }
  };

  let itemRefs = useRef([]);

  useEffect(() => {
    if (activeIndex !== -1 && itemRefs.current[activeIndex]) {
      itemRefs.current[activeIndex].scrollIntoView({ block: "nearest" });
    }
  }, [activeIndex]);

  /* 🖱️ Click outside */
  let searchRef = useRef();
  let [searchRefState, setSearchRefState] = useState(false);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && searchRef.current.contains(e.target)) {
        setSearchRefState(true);
      } else {
        setSearchRefState(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  /* 🔗 Nav links */
  const NavLinks = () => (
    <>
      {[
        { to: "/", label: "Home" },
        { to: "/pages", label: "Pages" },
        { to: "/products", label: "Products" },
        { to: "/blog", label: "Blog" },
        { to: "/shop", label: "Shop" },
        { to: "/contact", label: "Contact" },
      ].map((item, i) => (
        <li key={i}>
          <NavLink
            to={item.to}
            onClick={() => setShowMobileMenu(false)}
            className={({ isActive }) =>
              `py-2 block transition-colors ${
                isActive ? "text-[#FB2E86]" : "hover:text-[#FB2E86]"
              }`
            }
          >
            {item.label}
          </NavLink>
        </li>
      ))}
    </>
  );

  return (
    <section
      className={`py-4 md:py-7 bg-white shadow-md md:shadow-none w-full sticky top-0 z-50 left-0
      transition-transform duration-300 ${
        showNavbar ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <Container>
        {/* Top bar */}
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/">
            <img src={logo} alt="Hekto Logo" className="w-[100px]" />
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:block">
            <ul className="flex gap-5 lg:gap-7 font-lato text-[#0D0139]">
              <NavLinks />
            </ul>
          </div>

          {/* Desktop search */}
          <div className="hidden md:flex items-center relative" ref={searchRef}>
            <input
              value={search}
              onChange={handleSearch}
              onKeyDown={handleKeyDown}
              placeholder="Search..."
              className="bg-[#E7E6EF] py-1 w-[220px] ps-2 focus:outline-none"
            />
            <button className="absolute right-0 bg-[#FB2E86] p-2 text-white">
              <IoIosSearch />
            </button>

            {searchRefState && searchFilter.length > 0 && (
              <div className="absolute top-full mt-1 w-[400px] max-h-[400px] overflow-y-auto bg-white shadow-lg">
                {searchFilter.map((item, i) => (
                  <div
                    key={i}
                    ref={(el) => (itemRefs.current[i] = el)}
                    onClick={() => handleSearchItem(item)}
                    className={`flex gap-3 p-3 cursor-pointer ${
                      activeIndex === i
                        ? "bg-[#FB2E86] text-white"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    <img
                      src={item.image_path || item.thumbnail}
                      className="w-[60px] h-[60px] object-contain"
                    />
                    <div>
                      <p className="text-sm font-semibold">
                        {item.name || item.title}
                      </p>
                      <p className="text-sm text-[#FB2E86]">
                        {item.price || item.discount_price} TK
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Mobile menu icon */}
          <div className="md:hidden">
            <button
              onClick={() => {
                setShowMobileMenu(!showMobileMenu);
                setSearchFilter([]);
                setSearchRefState(false);
              }}
              className="text-2xl"
            >
              {showMobileMenu ? <HiX /> : <HiMenu />}
            </button>
          </div>
        </div>

        {/* ⭐ Mobile search */}
        <div className="md:hidden mt-3" ref={searchRef}>
          <div className="relative">
            <input
              value={search}
              onChange={handleSearch}
              onKeyDown={handleKeyDown}
              placeholder="Search products..."
              className="w-full bg-[#E7E6EF] py-2 ps-4"
            />
            <button className="absolute right-0 bg-[#FB2E86] p-3 text-white">
              <IoIosSearch />
            </button>
          </div>

          {searchRefState && searchFilter.length > 0 && (
            <div className="bg-white shadow-lg mt-1 max-h-[300px] overflow-y-auto">
              {searchFilter.map((item, i) => (
                <div
                  key={i}
                  onClick={() => handleSearchItem(item)}
                  className="flex gap-3 p-3 hover:bg-gray-100"
                >
                  <img
                    src={item.image_path || item.thumbnail}
                    className="w-[50px] h-[50px] object-contain"
                  />
                  <div>
                    <p className="text-sm font-semibold">
                      {item.name || item.title}
                    </p>
                    <p className="text-sm text-[#FB2E86]">
                      {item.price || item.discount_price} TK
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </Container>

      {/* Mobile menu */}
      <div
        className={`md:hidden absolute w-full bg-white transition-all duration-300 shadow-lg ${
          showMobileMenu ? "max-h-[500px] py-4" : "max-h-0 overflow-hidden"
        }`}
      >
        <Container>
          <ul className="space-y-1 font-lato text-[#0D0139]">
            <NavLinks />
          </ul>
        </Container>
      </div>
    </section>
  );
};

export default NavBar;
