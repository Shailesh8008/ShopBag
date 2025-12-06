import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import Modal from "../components/Modal";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function Signup({ isOpen, setIsOpen }) {
  const [form, setForm] = useState({
    fname: "",
    lname: "",
    email: "",
    pass1: "",
    pass2: "",
  });
  const [error, setError] = useState({
    fname: false,
    lname: false,
    email: false,
    pass: false,
    pass1: false,
    pass2: false,
  });
  const [isPass, setIsPass] = useState(false);

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
    setError({ ...error, [e.target.id]: false, pass: false });
  };
  const handleForm = async (e) => {
    e.preventDefault();

    if (!form.fname || !form.email || !form.pass1 || !form.pass2) {
      return setError({
        ...error,
        fname: form.fname ? false : true,
        email: form.email ? false : true,
        pass1: form.pass1 ? false : true,
        pass2: form.pass2 ? false : true,
      });
    }

    if (!isValidEmail(form.email)) {
      return toast.error("Please enter a valid email");
    }

    if (form.pass1 !== form.pass2) return setError({ ...error, pass: true });

    try {
      const res = await fetch("/api/reg", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!data.ok) {
        return toast.error(data.message || "Some error occurred");
      }
      toast.success(data.message || "Registered Successfully");
      setForm({
        fname: "",
        lname: "",
        email: "",
        pass1: "",
        pass2: "",
      });
    } catch (error) {
      console.log("error: ", error);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      header={<h1 className="font-semibold text-center text-xl">Register</h1>}
      footer={
        <div className="text-center">
          <p>
            Have an account?{" "}
            <Link to={"/signin"} className="text-blue-700 hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      }
    >
      <form className="mb-2 mt-4 w-full space-y-2.5" onSubmit={handleForm}>
        <div className="flex gap-2 sm:gap-3">
          <div className="flex-1">
            <label htmlFor="fname" className="text-lg block ml-0.5">
              First Name{" "}
              {error.fname ? (
                <span className="ml-1 text-sm text-red-600">Required *</span>
              ) : (
                ""
              )}
            </label>
            <input
              id="fname"
              type="text"
              value={form.fname}
              onChange={handleChange}
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
              value={form.lname}
              onChange={handleChange}
              placeholder="Last Name"
              className="w-full mt-1 px-3 py-2 border border-purple-200 rounded focus:outline-none focus:ring-1 focus:ring-purple-600"
            />
          </div>
        </div>
        <div>
          <label htmlFor="email" className="text-lg">
            Email or Mobile number{" "}
            {error.email ? (
              <span className="ml-1 text-sm text-red-600">Required *</span>
            ) : (
              ""
            )}
          </label>
          <input
            id="email"
            type="text"
            value={form.email}
            onChange={handleChange}
            placeholder="Email/phone"
            className="w-full mt-1 px-3 py-2 border border-purple-200 rounded focus:outline-none focus:ring-1 focus:ring-purple-600"
          />
        </div>
        <div>
          <label htmlFor="pass1" className="text-lg">
            Password{" "}
            <span className="ml-1 text-sm text-red-600">
              {error.pass1
                ? "Required *"
                : error.pass
                ? "Please enter same passwords"
                : ""}
            </span>
          </label>
          <div className="relative">
            <input
              id="pass1"
              type={isPass ? "password" : "text"}
              value={form.pass1}
              onChange={handleChange}
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
                  setIsPass(!isPass);
                }}
              />
            )}
          </div>
        </div>
        <div>
          <label htmlFor="pass2" className="text-lg">
            Confirm Password{" "}
            <span className="ml-1 text-sm text-red-600">
              {error.pass2
                ? "Required *"
                : error.pass
                ? "Please enter same passwords"
                : ""}
            </span>
          </label>
          <div className="relative">
            <input
              id="pass2"
              type={isPass ? "password" : "text"}
              value={form.pass2}
              onChange={handleChange}
              placeholder="Password"
              className="w-full mt-1 pr-8 pl-3 py-2 border border-purple-200 rounded focus:outline-none focus:ring-1 focus:ring-purple-600"
            />
          </div>
        </div>
        <button className="hover:bg-purple-600 hover:text-white border border-purple-600 text-purple-600 rounded-xl px-3 py-2 mt-4 w-full cursor-pointer transition active:bg-purple-800">
          Sign Up
        </button>
      </form>
    </Modal>
  );
}
