import { useDispatch } from "react-redux";
import Modal from "./Modal";
import { clearUser } from "../../store/slices/AuthSlice";
import { clearCart } from "../../store/slices/CartSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Logout({ isOpen, setIsOpen }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/logout", {
        method: "DELETE",
        credentials: "include",
      });
      const data = await res.json();
      if (!data.ok) return toast(data.message || "Failed");
      dispatch(clearUser());
      dispatch(clearCart());
      toast.success(data.message);
      navigate("/");
      return setIsOpen(false);
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      header={
        <h1 className="font-semibold text-center text-xl">Confirm Logout ?</h1>
      }
    >
      <div className="flex justify-between w-full sm:px-3 mt-8 mb-2">
        <button
          className="bg-red-500 rounded-lg py-1 px-2 cursor-pointer mt-2 text-white hover:bg-red-600 active:bg-red-700"
          onClick={() => {
            navigate("/");
            setIsOpen(false);
          }}
        >
          Cancel
        </button>
        <button
          className="bg-blue-500 rounded-lg py-1 px-2 cursor-pointer mt-2 text-white hover:bg-blue-600 active:bg-blue-700"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </Modal>
  );
}
