import { useDispatch, useSelector } from "react-redux";
import CartItems from "../components/CartItems";
import Modal from "../components/Modal";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchCart, saveCart } from "../../store/slices/CartSlice";
import toast from "react-hot-toast";

export default function Cart({ isOpen, setIsOpen }) {
  const navigate = useNavigate();
  const cartState = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("user");
    if (!token) {
      toast.error("Please login first");
      navigate("/");
      return;
    }
    if (userId) dispatch(fetchCart(userId));
  }, []);

  return (
    <Modal
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      header={
        <h1 className="font-bold text-center text-2xl mb-5 text-purple-500">
          Your Cart 🛒
        </h1>
      }
      height={"cart"}
    >
      <ul className="divide-y-1 divide-gray-200">
        {cartState.map((el, i) => {
          return (
            <div key={i}>
              <CartItems
                pid={el.pid}
                pname={el.pname}
                img={el.pimage}
                price={el.price * el.qt}
                qt={el.qt}
              />
            </div>
          );
        })}
      </ul>
      <div className="text-end font-semibold mt-4 text-lg mr-2">
        <p>
          Total:{" "}
          <span className="text-green-600 font-bold">
            ₹{cartState.reduce((acc, curr) => acc + curr.price * curr.qt, 0)}
          </span>
        </p>
      </div>
    </Modal>
  );
}
