import { Link, useNavigate } from "react-router-dom";
import AdminNav from "./AdminNav";
import capsicum from "../assets/capsicum.png";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";

export default function AdminProduct() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen -mb-14">
      <AdminNav />
      <div className="flex-1 p-10">
        <h1 className="text-2xl text-gray-700 font-bold mb-4">
          Manage Products 🛒
        </h1>
        <button
          onClick={(e) => navigate("/admin/addproducts")}
          className="bg-green-600 text-white px-2 py-1 rounded cursor-pointer active:bg-green-700"
        >
          Add Products
        </button>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-5">
          {[1, 2, 3, 4, 5].map((e,i) => {
            return (
              <div key={i} className="shadow rounded-xl hover:shadow-lg border border-gray-100 p-4">
                <img
                  src={capsicum}
                  alt=""
                  className="w-full h-50 rounded-md border border-gray-300"
                />
                <div className="p-2 space-y-1">
                  <p className="text-xl font-semibold text-gray-700">
                    Capsicum
                  </p>
                  <p className="font-semibold text-sm text-gray-600">
                    Category: Fresh
                  </p>
                  <p className="font-bold text-green-600">₹ 19</p>
                  <p className="font-semibold text-blue-600">In Stock</p>
                </div>
                <div className="flex justify-between text-lg">
                  <FaEdit
                    className="text-blue-700 cursor-pointer"
                    onClick={(e) => navigate("/admin/editproduct")}
                  />
                  <RiDeleteBin5Line className="text-red-600 cursor-pointer" />
                </div>
              </div>
            );
          })}

          <div className="shadow rounded-xl hover:shadow-lg border border-gray-100 p-4">
            <img
              src={capsicum}
              alt=""
              className="w-full h-50 rounded-md border border-gray-300"
            />
            <div className="p-2 space-y-1">
              <p className="text-xl font-semibold text-gray-700">Capsicum</p>
              <p className="font-semibold text-sm text-gray-600">
                Category: Fresh
              </p>
              <p className="font-bold text-green-600">₹ 19</p>
              <p className="font-semibold text-blue-600">In Stock</p>
            </div>
            <div className="flex justify-between text-lg">
              <FaEdit
                className="text-blue-700 cursor-pointer"
                onClick={(e) => navigate("/admin/editproduct")}
              />
              <RiDeleteBin5Line className="text-red-600 cursor-pointer" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
