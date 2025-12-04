import { useState } from "react";
import {
  FaSearch,
  FaShoppingCart,
  FaRegUserCircle,
  FaTimes,
  FaBars,
} from "react-icons/fa";
import { LuMessageSquareMore } from "react-icons/lu";
import { IoMdHome } from "react-icons/io";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useWindowWidth from "../../hooks/useWindowWidth";

export default function Navbar({ setIsOpen }) {
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;
  const windowWidth = useWindowWidth();

  const [isBarOpen, setIsBarOpen] = useState(false);
  const onClick = () => {
    setIsBarOpen(!isBarOpen);
  };

  return (
    <>
      <nav className="w-full shadow h-16 py-3 sm:px-6 px-4 bg-gradient-to-r from-purple-100 via-white to-white content-center">
        <div className="flex items-center relative justify-between max-w-7xl">
          <h1>ShopBag</h1>
          <div className="flex-1 mx-4">
            <div className="relative">
              {path != "/search" ? (
                <Link
                  to={"/search"}
                  className="block w-full rounded-full bg-gray-300/60 sm:px-5 px-3 py-1 cursor-pointer border border-gray-300 hover:border-purple-500 hover:text-purple-600"
                >
                  <p className="text-gray-700">
                    {windowWidth > 480
                      ? "Search in electronics, toys, mobiles, etc."
                      : "Search in anything..."}
                  </p>
                  <FaSearch className="absolute top-2 right-4  text-inherit " />
                </Link>
              ) : (
                <>
                  <input
                    type="text"
                    onKeyDown={(e) =>
                      e.key == "Enter" &&
                      navigate(
                        `/search?query=${e.target.value.replaceAll(" ", "+")}`
                      )
                    }
                    autoFocus
                    placeholder={`${
                      windowWidth > 480
                        ? "Search in electronics, toys, mobiles, etc."
                        : "Search in anything..."
                    }`}
                    className="w-full focus:outline-1 focus:outline-purple-600 rounded-full bg-gray-300/60 pl-4 pr-8 py-1 outline-1 outline-gray-300 hover:outline-1 hover:outline-purple-600"
                  />
                  <FaSearch className="absolute top-2 right-3" />
                </>
              )}
            </div>
          </div>
          <div className="hidden sm:block">
            <div className="flex gap-3 text-xl items-center">
              <Link to={"/"} state={location}>
                <IoMdHome className="cursor-pointer hover:text-purple-600 text-[22px]" />
              </Link>
              <Link to={"/query"} state={location}>
                <LuMessageSquareMore
                  onClick={(e) => setIsOpen(true)}
                  className="cursor-pointer hover:text-purple-600"
                />
              </Link>
              <Link to={"/cart"} state={location}>
                <FaShoppingCart
                  onClick={(e) => setIsOpen(true)}
                  className="cursor-pointer hover:text-purple-600"
                />
              </Link>
              <Link to={"/signin"} state={location}>
                <FaRegUserCircle
                  onClick={(e) => setIsOpen(true)}
                  className="cursor-pointer hover:text-purple-600"
                />
              </Link>
            </div>
          </div>

          {/* mobile view */}
          <div className="sm:hidden relative">
            {isBarOpen ? (
              <>
                <FaTimes
                  onClick={onClick}
                  className="cursor-pointer hover:text-purple-600"
                />
              </>
            ) : (
              <FaBars
                onClick={onClick}
                className="cursor-pointer hover:text-purple-600"
              />
            )}
          </div>
          {isBarOpen && (
            <div className="bg-white shadow shadow-purple-600 rounded-md p-2 absolute top-8 right-1 space-y-1.5 sm:hidden">
              <Link
                to={"/"}
                state={location}
                className="flex text-center cursor-pointer items-center space-x-1"
              >
                <span className="overflow-hidden w-4">
                  <IoMdHome className="text-[18px]" />
                </span>
                <span>Home</span>
              </Link>
              <Link
                to={"/cart"}
                state={location}
                className="flex text-center cursor-pointer items-center space-x-1"
                onClick={(e) => setIsOpen(true)}
              >
                <FaShoppingCart />
                <span>Cart</span>
              </Link>
              <Link
                to={"/query"}
                state={location}
                className="flex text-center cursor-pointer items-center space-x-1"
                onClick={(e) => setIsOpen(true)}
              >
                <LuMessageSquareMore />
                <span>Query</span>
              </Link>
              <Link
                to={"/signin"}
                state={location}
                className="flex text-center cursor-pointer items-center space-x-1"
                onClick={(e) => setIsOpen(true)}
              >
                <FaRegUserCircle />
                <span>Sign In</span>
              </Link>
            </div>
          )}
        </div>
      </nav>
    </>
  );
}
