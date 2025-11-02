import { Link, useLocation, useNavigate } from "react-router-dom";
import Modal from "../components/Modal";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function Signup({ isOpen, setIsOpen }) {
  const location = useLocation();
  const [isPass, setIsPass] = useState(false);
  const navigate = useNavigate();

  return (
    <Modal
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      header={<h1 className="font-semibold text-center text-xl">Register</h1>}
      footer={
        <div className="text-center">
          <p>
            Have an account?{" "}
            <Link
              to={"/signin"}
              state={location}
              className="text-blue-700 hover:underline"
            >
              Sign In
            </Link>
          </p>
        </div>
      }
    >
      <form
        className="mb-2 mt-4 w-full space-y-2.5"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <div className="flex gap-2 sm:gap-3">
          <div className="flex-1">
            <label htmlFor="fname" className="text-lg block ml-0.5">
              First Name
            </label>
            <input
              id="fname"
              type="text"
              placeholder="First Name"
              className="w-full mt-1 px-3 py-2 border border-purple-200 rounded focus:outline-none focus:ring-1 focus:ring-purple-600"
            />
          </div>
          <div className="flex-1">
            <label htmlFor="lname" className="text-lg block ml-1">
              Last Name
            </label>
            <input
              id="lname"
              type="text"
              placeholder="Last Name"
              className="w-full mt-1 px-3 py-2 border border-purple-200 rounded focus:outline-none focus:ring-1 focus:ring-purple-600"
            />
          </div>
        </div>
        <div>
          <label htmlFor="email" className="text-lg">
            Email or Mobile number
          </label>
          <input
            id="email"
            type="text"
            placeholder="Email/phone"
            className="w-full mt-1 px-3 py-2 border border-purple-200 rounded focus:outline-none focus:ring-1 focus:ring-purple-600"
          />
        </div>
        <div>
          <label htmlFor="pass1" className="text-lg">
            Password
          </label>
          <div className="relative">
            <input
              id="pass1"
              type={isPass ? "password" : "text"}
              placeholder="Password"
              className="w-full mt-1 pr-8 pl-3 py-2 border border-purple-200 rounded focus:outline-none focus:ring-1 focus:ring-purple-600"
            />
            {isPass ? (
              <FaEyeSlash
                onClick={(e) => setIsPass(!isPass)}
                className="absolute top-4 right-3 cursor-pointer text-lg hover:text-purple-600 text-gray-700"
              />
            ) : (
              <FaEye
                className="absolute top-4 right-3 cursor-pointer text-lg hover:text-purple-600 text-gray-700"
                onClick={(e) => {
                  e.preventDefault();
                  setIsPass(!isPass);
                }}
              />
            )}
          </div>
        </div>
        <div>
          <label htmlFor="pass2" className="text-lg">
            Confirm Password
          </label>
          <div className="relative">
            <input
              id="pass2"
              type={isPass ? "password" : "text"}
              placeholder="Password"
              className="w-full mt-1 pr-8 pl-3 py-2 border border-purple-200 rounded focus:outline-none focus:ring-1 focus:ring-purple-600"
            />
          </div>
        </div>
        <button
          onClick={(e) => {
            setIsOpen(false);
            navigate(-1);
          }}
          className="hover:bg-purple-600 hover:text-white border border-purple-600 text-purple-600 rounded-xl px-3 py-2 w-full cursor-pointer transition active:bg-purple-800"
        >
          Sign Up
        </button>
      </form>
    </Modal>
  );
}
