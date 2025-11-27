import { FaPlus, FaMinus } from "react-icons/fa";
import { MdDeleteSweep } from "react-icons/md";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  cartDecreaseQt,
  cartIncreaseQt,
  cartRemoveItem,
} from "../../store/slices/CartSlice";

export default function CartItems({ pid, pname, img, price, qt }) {
  const dispatch = useDispatch();

  return (
    <li className="flex gap-2 items-center font-semibold py-2">
      <Link>
        <img
          className="w-20 h-12 object-contain"
          src={`/uploads/${img}`}
          alt=""
        />
      </Link>
      <h2 className="flex-1">{pname}</h2>

      <p className="text-green-600">${price}</p>
      <div className="flex gap-2">
        <button
          className="bg-purple-500/70 rounded p-1.5 active:bg-purple-500 flex justify-center items-center text-sm cursor-pointer"
          onClick={() => dispatch(cartDecreaseQt({ pid }))}
        >
          <FaMinus />
        </button>
        <p>{qt}</p>
        <button
          className="bg-purple-500/70 rounded p-1.5 active:bg-purple-500 flex justify-center items-center text-sm cursor-pointer"
          onClick={() => dispatch(cartIncreaseQt({ pid }))}
        >
          <FaPlus />
        </button>
        <button
          className="text-2xl ml-1 hover:text-red-600 cursor-pointer"
          onClick={() => dispatch(cartRemoveItem({ pid }))}
        >
          <MdDeleteSweep />
        </button>
      </div>
    </li>
  );
}
