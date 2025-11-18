import { useState } from "react";
import AdminNav from "./AdminNav";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function AddProduct() {
  const [productDetails, setProductDetails] = useState({
    pname: "",
    price: "",
    category: "",
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/addproduct", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productDetails),
      });
      const data = await res.json();
      if (!data.ok) {
        return toast.error(data.message || "Some error occurred");
      }
      toast.success(data.message || "Product Added Successfully");
      setProductDetails({
        pname: "",
        price: "",
        category: "",
      });
    } catch (error) {
      console.log("some error occured");
    }
  };

  const handleChange = (e) => {
    setProductDetails({
      ...productDetails,
      [e.target.id]: e.target.value,
    });
  };

  return (
    <div className="flex min-h-screen -mb-14">
      <AdminNav />
      <div className="flex-1 p-10">
        <h1 className="text-2xl text-gray-700 font-bold mb-4">
          Add Products 🛍️
        </h1>
        <button
          onClick={(e) => navigate("/admin/products")}
          className="bg-gray-300 active:bg-gray-400 px-4 py-1 rounded cursor-pointer mb-4"
        >
          Back
        </button>
        <div className="shadow-lg px-4 py-6 rounded max-w-3xl mx-auto">
          <form className="space-y-6">
            <div>
              <label htmlFor="pname">Product Name</label>
              <input
                id="pname"
                type="text"
                value={productDetails.pname}
                onChange={handleChange}
                className="block w-full shadow-inner shadow-gray-200 mt-2 py-1.5 px-2 rounded border border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:bg-gray-50"
              />
            </div>
            <div>
              <label htmlFor="price">Price ₹</label>
              <input
                id="price"
                type="number"
                value={productDetails.price}
                onChange={handleChange}
                min="0"
                className="block w-full shadow-inner shadow-gray-200 mt-2 py-1.5 px-2 rounded border border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:bg-gray-50"
              />
            </div>
            <div>
              <label htmlFor="category">Category</label>
              <select
                id="category"
                value={productDetails.category}
                onChange={handleChange}
                className="block w-full shadow-inner shadow-gray-200 mt-2 py-1.5 px-2 rounded border border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:bg-gray-50"
              >
                <option value="" hidden>
                  --Select--
                </option>
                <option value="cafe">Cafe</option>
                <option value="electronics">Electronics</option>
                <option value="toys">Toys</option>
                <option value="mobile">Mobile</option>
                <option value="fresh">Fresh</option>
                <option value="home">Home</option>
                <option value="beauty">Beauty</option>
              </select>
            </div>
            <label htmlFor="pimage">Product Image</label>
            <div className="w-full shadow-inner shadow-gray-200 mt-2 py-1.5 px-2 rounded border border-gray-300">
              <input
                type="file"
                id="pimage"
                accept="image/*"
                className="file:cursor-pointer file:border file:border-gray-400 file:bg-gray-200 file:px-1 file:mr-2 active:file:bg-gray-300"
              />
            </div>
            <button
              onClick={handleSubmit}
              className="px-5 py-1.5 bg-red-600 rounded text-white cursor-pointer active:bg-red-800"
            >
              Add Product
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
