import { Link } from "react-router-dom";
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaWhatsapp,
  FaRegCopyright,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="mt-14 px-6 sm:px-8 pt-4 pb-4 bg-gradient-to-r from-purple-100 via-white to-white border border-gray-100">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-24 pb-2">
        <div>
          <h1 className="text-xl">ShopBag</h1>
          <p className="text-[15px] mt-4">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea nisi
            placeat ex labore voluptatum fugiat cumque ut sint maxime illum.
          </p>
        </div>
        <div className="">
          <h1 className="text-lg font-semibold">Quick Links</h1>
          <div className="flex flex-col text-[14px] pl-1 mt-1 w-fit">
            <Link to={"/"} className="hover:text-purple-600">
              Home
            </Link>
            <Link to={"/about"} className="hover:text-purple-600">
              About
            </Link>
            <Link to={"/contact"} className="hover:text-purple-600">
              Contact
            </Link>
            <Link to={"/t&c"} className="hover:text-purple-600">
              T&C
            </Link>
          </div>
        </div>
        <div className="">
          <h1 className="text-lg font-semibold">Follow Us</h1>
          <div className="flex text-xl space-x-2 mt-2">
            <Link to={"/"} className="hover:text-blue-700">
              <FaFacebook />
            </Link>
            <Link to={"/"} className="hover:text-pink-400">
              <FaInstagram />
            </Link>
            <Link to={"/"} className="hover:text-blue-700">
              <FaTwitter />
            </Link>
            <Link to={"/"} className="hover:text-green-600">
              <FaWhatsapp />
            </Link>
          </div>
        </div>
      </div>
      <div className="mt-6 pt-3 flex gap-1 justify-center items-center text-gray-500 text-sm border-t border-gray-600">
          <FaRegCopyright />
        <p>
          2025 ShopBag Private Limited
        </p>
      </div>
    </footer>
  );
}
