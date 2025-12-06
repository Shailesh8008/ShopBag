import { useEffect, useState } from "react";
import AdminNav from "./AdminNav";
import { FcComboChart } from "react-icons/fc";
const backendUrl = import.meta.env.VITE_BACKEND_URL

export default function AdminDash() {
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    try {
      const res = await fetch(`${backendUrl}/api/getproducts`);
      const data = await res.json();
      if (!data.ok) {
        toast.error(data.message);
        return setProducts([]);
      }
      return setProducts(data.data);
    } catch (error) {
      console.log("Internal server error");
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="flex min-h-screen -mb-14">
      <AdminNav />
      <div className="flex-1 p-10">
        <div className="flex gap-2 mb-4 flex-wrap">
          <h1 className="text-2xl text-gray-700 font-bold">Admin Dashboard</h1>
          <FcComboChart className="text-3xl" />
        </div>
        <div className="shadow-lg p-4 rounded space-y-2">
          <p className="text-gray-600 font-semibold">Total Products</p>
          <p className="text-green-500 font-bold text-xl">{products.length}</p>
        </div>
      </div>
    </div>
  );
}
