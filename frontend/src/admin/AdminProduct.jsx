import { Link, useNavigate } from "react-router-dom";
import AdminNav from "./AdminNav";
import capsicum from "../assets/capsicum.png";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useEffect, useState } from "react";

export default function AdminProduct() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const getProducts = async () => {
    try {
      const res = await fetch("/api/getproducts");
      const data = await res.json();
      if (!data.ok) {
        return setProducts([]);
      }
      return setProducts(data.data);
    } catch (error) {
      console.log("Internal server error");
    }
  };
  console.log(products);
  useEffect(() => {
    getProducts();
  }, []);

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
          {products.map((e) => {
            return (
              <div
                key={e["_id"]}
                className="shadow rounded-xl hover:shadow-lg border border-gray-100 p-4"
              >
                <img
                  src={capsicum}
                  alt=""
                  className="w-full h-50 rounded-md border border-gray-300"
                />
                <div className="p-2 space-y-1">
                  <p className="text-xl font-semibold text-gray-700">
                    {e.pname}
                  </p>
                  <p className="font-semibold text-sm text-gray-600">
                    Category: {e.category}
                  </p>
                  <p className="font-bold text-green-600">₹ {e.price}</p>
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
        </div>
      </div>
    </div>
  );
}
