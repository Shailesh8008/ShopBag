import { FaPlus, FaMinus } from "react-icons/fa";
import { MdDeleteSweep } from "react-icons/md";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  cartDecreaseQt,
  cartIncreaseQt,
  cartRemoveItem,
  saveCart,
} from "../../store/slices/CartSlice";
import store from "../../store";
const backendUrl = import.meta.env.VITE_BACKEND_URL

export default function CartItems({ pid, pname, img, price, qt }) {
  const dispatch = useDispatch();
  const handleDispatch = (callback) => {
    dispatch(callback({ pid }));
    const state = store.getState().cart;
    dispatch(saveCart({ cartData: state }));
  };

  return (
    <li className="flex gap-2 items-center font-semibold py-2">
      <Link>
        <img
          className="w-20 h-12 object-contain"
          src={`${backendUrl}/uploads/${img}`}
          alt=""
        />
      </Link>
      <h2 className="flex-1">{pname}</h2>

      <p className="text-green-600">${price}</p>
      <div className="flex gap-2">
        <button
          className="bg-purple-500/70 rounded p-1.5 active:bg-purple-500 flex justify-center items-center text-sm cursor-pointer"
          onClick={() => handleDispatch(cartDecreaseQt)}
        >
          <FaMinus />
        </button>
        <p>{qt}</p>
        <button
          className="bg-purple-500/70 rounded p-1.5 active:bg-purple-500 flex justify-center items-center text-sm cursor-pointer"
          onClick={() => handleDispatch(cartIncreaseQt)}
        >
          <FaPlus />
        </button>
        <button
          className="text-2xl ml-1 hover:text-red-600 cursor-pointer"
          onClick={() => handleDispatch(cartRemoveItem)}
        >
          <MdDeleteSweep />
        </button>
      </div>
    </li>
  );
}
