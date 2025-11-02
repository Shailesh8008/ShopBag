import { useState } from "react";
import Modal from "../components/Modal";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function SigninPage({ isOpen, setIsOpen }) {
  const location = useLocation();
  const [isPass, setIsPass] = useState(false);
  const navigate = useNavigate();
  return (
    <Modal
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      header={<h1 className="font-semibold text-center text-xl">Sign In</h1>}
      footer={
        <div className="text-center">
          <p>
            Don't have an account?{" "}
            <Link
              to={"/signup"}
              state={location}
              className="text-blue-700 hover:underline"
            >
              Sign up
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
          <label htmlFor="pass" className="text-lg">
            Password
          </label>
          <div className="relative">
            <input
              id="pass"
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
        <button
          onClick={(e) => {
            setIsOpen(false);
            navigate(-1);
          }}
          className="hover:bg-purple-600 hover:text-white border border-purple-600 text-purple-600 rounded-xl px-3 py-2 w-full cursor-pointer transition active:bg-purple-800"
        >
          Sign In
        </button>
      </form>
    </Modal>
  );
}
