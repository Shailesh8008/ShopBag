import { useState } from "react";
import Modal from "../components/Modal";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

export default function SigninPage({ isOpen, setIsOpen }) {
  const navigate = useNavigate();

  const [isPass, setIsPass] = useState(false);
  const [form, setForm] = useState({
    email: "",
    pass: "",
  });
  const [error, setError] = useState({ email: false, pass: false });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.email || !form.pass) {
      return setError({
        email: form.email ? false : true,
        pass: form.pass ? false : true,
      });
    }

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!data.ok) {
        return toast.error(data.message);
      }
      toast.success(data.message);
      navigate("/");
    } catch (error) {}
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });

    setError({
      ...error,
      [e.target.id]: false,
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      header={<h1 className="font-semibold text-center text-xl">Sign In</h1>}
      footer={
        <div className="text-center">
          <p>
            Don't have an account?{" "}
            <Link to={"/signup"} className="text-blue-700 hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      }
    >
      <form className="mb-2 mt-4 w-full space-y-2.5" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email" className="text-lg">
            Email or Mobile number
            {error.email ? (
              <span className="text-red-600 ml-2 text-sm">Required *</span>
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
          <label htmlFor="pass" className="text-lg">
            Password
            {error.pass ? (
              <span className="text-red-600 ml-2 text-sm">Required *</span>
            ) : (
              ""
            )}
          </label>
          <div className="relative">
            <input
              id="pass"
              type={isPass ? "password" : "text"}
              value={form.pass}
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
        <button className="hover:bg-purple-600 hover:text-white border border-purple-600 text-purple-600 rounded-xl px-3 py-2 w-full cursor-pointer transition active:bg-purple-800">
          Sign In
        </button>
      </form>
    </Modal>
  );
}
