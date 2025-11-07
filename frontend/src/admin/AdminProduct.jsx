import { useNavigate } from "react-router-dom";
import AdminNav from "./AdminNav";

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
      </div>
    </div>
  );
}
