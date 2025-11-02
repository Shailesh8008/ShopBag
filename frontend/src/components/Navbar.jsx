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
import { Link, useLocation } from "react-router-dom";

export default function Navbar({ setIsOpen }) {
  const location = useLocation();

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
              <input
                type="text"
                className="w-full focus:outline-none focus:ring-1 focus:ring-purple-600 rounded-full bg-gray-300 pl-4 pr-7 py-1"
              />
              <FaSearch className="absolute top-2 right-3 hover:text-purple-600" />
            </div>
          </div>
          <div className="hidden sm:block">
            <div className="flex gap-3 text-xl items-center">
              <IoMdHome className="cursor-pointer hover:text-purple-600 text-[22px]" />
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
            <div className="bg-white shadow p-2 absolute top-8 right-1 space-y-1.5 sm:hidden">
              <div className="flex text-center cursor-pointer hover:text-purple-600 items-center space-x-1">
                <IoMdHome />
                <span>Home</span>
              </div>
              <div className="flex text-center cursor-pointer hover:text-purple-600 items-center space-x-1">
                <FaShoppingCart />
                <span>Cart</span>
              </div>
              <div className="flex text-center cursor-pointer hover:text-purple-600 items-center space-x-1">
                <FaRegUserCircle />
                <span>Sign In</span>
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
}
