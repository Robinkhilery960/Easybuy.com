import React, { useState } from "react";
import { productData, categoriesData } from "../../Static/data";
import styles from "../../Styles/style";
import { Link } from "react-router-dom";
import {
  AiOutlineSearch,
  AiOutlineHeart,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { IoIosArrowForward, IoIosArrowDown } from "react-icons/io";
import { BiMenuAltLeft } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import DropDown from "./DropDown/DropDown.jsx";
import Navbar from "./Navbar.jsx";
import { useSelector } from "react-redux";
import { backend_url } from "../../server.js";
import Cart from "../../Components/cart/Cart.jsx";
import Wishlist from "../../Components/Wishlist/Wishlist.jsx";
import { RxCross1 } from "react-icons/rx";

const Header = ({ activeHeading }) => {
  const { isShopAuthenticated, isShopLoading } = useSelector(
    (state) => state.shop
  );
  const { allProducts } = useSelector((state) => state.product);
  const { cart } = useSelector((state) => state.cart);
  const { wishlist } = useSelector((state) => state.wishlist);
  const [search, setSearch] = useState("");
  const [searchData, setSearchData] = useState(null);
  const [active, setActive] = useState(false);
  const [dropDown, setDropDown] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const [openWishlist, setOpenWishlist] = useState(false);
  const { isAuthenticated, user, isLoading } = useSelector(
    (state) => state.user
  );
  const [open, setOpen] = useState(false);

  const handleSearch = (e) => {
    const searchTerm = e.target.value;
    setSearch(searchTerm);
    const filteredProducts = [...allProducts].filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchData(filteredProducts);
  };

  window.addEventListener("scroll", () => {
    if (window.scrollY > 70) {
      setActive(true);
    } else {
      setActive(false);
    }
  });

  return (
    <>
      <div className={`${styles.section}`}>
        <div className="hidden 800px:h-[50px] 800px:my-[20px] 800px:flex items-center justify-between">
          <div>
            <Link to="/">
              <img
                src="https://res.cloudinary.com/dsaofytf2/image/upload/v1701399357/dmjgtxscrlw5e506jqoa.jpg"
                alt=""
                className="w-[70px] "
              />{" "}
            </Link>
          </div>
          <div className="w-[50%] relative">
            <input
              type="text"
              placeholder="Search Products...."
              value={search}
              onChange={handleSearch}
              className="h-[40px] w-full px-2 border-[#3957db] border-[2px] rounded-md"
            />
            <AiOutlineSearch
              size={30}
              className="absolute right-2 top-1.5 cursor-pointer"
            />

            {search && searchData.length ? (
              <div className="absolute min-h-[130vh] bg-slate-50 shadow-sm-2 z-[9] p-4">
                {searchData.map((product, index) => {
                  return (
                    <Link to={`/product/${product._id}`}>
                      <div className="w-fullflex items-start py-3">
                        <img
                          src={`${backend_url}${product.images[0]}`}
                          alt=""
                          className="w-[40px] h-[40px] mr-[10px]"
                        />
                        <h1>{product.name}</h1>
                      </div>
                    </Link>
                  );
                })}
              </div>
            ) : null}
          </div>
          <div className={`${styles.button}`}>
            <Link to="/create-shop">
              <h1 className="text-[#fff] flex items-center ">
                {isShopAuthenticated ? "Dashboard" : "Become Seller"}
                <IoIosArrowForward className="ml-1"/>
              </h1>
            </Link>
          </div>
        </div>
      </div>

      <div
        className={`${
          active === true ? "shadow-sm fixed top-0 left-0 z-10" : null
        } transition hidden 800px:flex items-center justify-between w-full bg-[#2d247a] h-[70px]`}
      >
        {/* CATEGORIES */}

        <div
          className={`${styles.section} relative ${styles.normalFlex} justify-between`}
        >
          <div onClick={() => setDropDown(!dropDown)}>
            <div className="relative h-[60px] mt-[10px] w-[270px] hidden 1000px:block z-50  ">
              <BiMenuAltLeft size={30} className="absolute top-3 left-2" />
              <button
                className={`h-[100%] w-full flex justify-between items-center pl-10 bg-white font-sans text-lg font-[500] select-none rounded-t-md  `}
              >
                All Cateogries
              </button>
              <IoIosArrowDown
                className="absolute right-2 top-4 cursor-pointer "
                onClick={() => setDropDown(!dropDown)}
              />
              {dropDown ? (
                <DropDown
                  categoriesData={categoriesData}
                  setDropDown={setDropDown}
                />
              ) : null}
            </div>
          </div>

          {/* NAVBAR */}
          <div className={`${styles.normalFlex}`}>
            <Navbar active={activeHeading} />
          </div>

          <div className="flex relative ">
            {/* wishlist  */}

            <div>
              <div className={`${styles.normalFlex}`}>
                <div
                  className="relative cursor-pointer mr-[15px]"
                  onClick={() => setOpenWishlist(!openWishlist)}
                >
                  <AiOutlineHeart size={30} color="rgb(255 255 255 / 83%)" />
                  <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] text-center leading-tight">
                    {wishlist && wishlist.length}
                  </span>
                </div>
              </div>
            </div>

            {/* SHOPPING CART */}

            <div>
              <div className={`${styles.normalFlex}`}>
                <div
                  className="relative cursor-pointer mr-[15px]"
                  onClick={() => setOpenCart(!openCart)}
                >
                  <AiOutlineShoppingCart
                    size={30}
                    color="rgb(255 255 255 / 83%)"
                  />
                  <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] text-center leading-tight">
                    {cart && cart.length}
                  </span>
                </div>
              </div>
            </div>

            {/* profile */}

            <div>
              <div className={`${styles.normalFlex}`}>
                <div className="relative cursor-pointer mr-[15px]">
                  {isAuthenticated ? (
                    <Link to="/profile">
                      <img
                        src={`${backend_url}` + user?.avatar}
                        className="w-[35px] h-[35px] rounded-full"
                      />
                    </Link>
                  ) : (
                    <Link to="/login">
                      <CgProfile size={30} color="rgb(255 255 255 / 83%)" />
                    </Link>
                  )}
                </div>
              </div>
            </div>

            {/* cart popup */}

            {openCart && <Cart setOpenCart={setOpenCart} />}

            {/* wishlist popup */}

            {openWishlist && <Wishlist setOpenWishlist={setOpenWishlist} />}
          </div>
        </div>
      </div>

      {/* Mobile header */}
      <div
        className={`${
          active === true ? "shadow-sm fixed top-0 left-0 z-10" : null
        } w-full h-[60px]   bg-[#fff] z-50 top-0 left-0 shadow-sm 800px:hidden`}
      >
        <div className="w-full flex items-center justify-between">
          <div>
            <BiMenuAltLeft
              size={40}
              className="ml-4"
              onClick={() => setOpen(true)}
            />
          </div>
          <div>
            <Link to="/">
              <img
                src="https://res.cloudinary.com/dsaofytf2/image/upload/v1701399357/dmjgtxscrlw5e506jqoa.jpg"
                alt=""
                className="w-[50px] "
              />
            </Link>
          </div>
          <div>
            <div
              className="relative cursor-pointer mr-[25px]"
              onClick={() => setOpenCart(!openCart)}
            >
              <AiOutlineShoppingCart size={30} />
              <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] text-center leading-tight">
                {cart && cart.length}
              </span>
            </div>
          </div>
        </div>

        {/* header sidebar  */}
        {open && (
          <div className="fixed w-full bg-[#0000005f] z-20 h-full top-0 left-0">
            <div className="fixed w-[60%] bg-[#fff] h-screen top-0 left-0 z-10 flex  flex-col  overflow-y-scroll">
              <div className="w-full justify-between flex pr-3">
                <div>
                  <div className="relative mr-[15px]">
                    <AiOutlineHeart size={30} className="mt-5 ml-3" />
                    <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] text-center leading-tight">
                      0
                    </span>
                  </div>
                </div>
                <RxCross1
                  size={30}
                  className="ml-4 mt-5"
                  onClick={() => setOpen(false)}
                />
              </div>

              <div className="w-[92%]   relative my-8 ml-4">
                <input
                  type="text"
                  placeholder="Search Products...."
                  value={search}
                  onChange={handleSearch}
                  className="h-[40px] w-full px-2 border-[#3957db] border-[2px] rounded-md"
                />
                <AiOutlineSearch
                  size={30}
                  className="absolute right-2 top-1.5 cursor-pointer"
                />

                {search && searchData.length ? (
                  <div className="absolute min-h-[130vh] bg-slate-50 shadow-sm-2 z-[9] p-4">
                    {searchData.map((product, index) => {
                      return (
                        <Link to={`/product/${product.id}`}>
                          <div className="w-fullflex items-start py-3">
                            <img
                              src={`${backend_url}${product.images[0]}`}
                              alt=""
                              className="w-[40px] h-[40px] mr-[10px]"
                            />
                            <h1>{product.name}</h1>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                ) : null}
              </div>
              <Navbar active={activeHeading} />
              <div className={`${styles.button} ml-5 !rounded-[4px]  `}>
                <Link to="/create-shop">
                  <h1 className="text-[#fff] flex items-center ">
                    Become Seller
                    <IoIosArrowForward className="ml-1 pt-1" />
                  </h1>
                </Link>
              </div>
              <br />
              <br />
              <br />

              <div className={`${styles.normalFlex} `}>
                <div className=" cursor-pointer ml-[20px] ">
                  {isAuthenticated ? (
                    <Link to="/profile">
                      <img
                        src={`${backend_url}` + user.avatar}
                        className="w-[35px] h-[35px] rounded-full"
                      />
                    </Link>
                  ) : (
                    <>
                      <Link to="/login">
                        <CgProfile size={30} color="black" /> Login
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Header;
