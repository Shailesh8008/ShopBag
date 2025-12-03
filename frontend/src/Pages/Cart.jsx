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

  const handleCheckout = async () => {
    const amount = cartState.reduce(
      (acc, curr) => acc + curr.price * curr.qt,
      0
    );
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount,
          currency: "INR",
          receipt: "receipt#1",
        }),
      });
      const data = await res.json();
      if (!data) {
        return toast.error(data.message);
      }
      const options = {
        key: "rzp_test_Rn0muST803pgLU",
        amount: data.data.amount,
        currency: data.data.currency,
        name: "Shopbag",
        description: "Testing payment",
        order_id: data.data.id,
        handler: async function (res) {
          const token = localStorage.getItem("token");
          const userId = localStorage.getItem("user");
          try {
            const response = await fetch("/api/verifypayment", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({
                amount,
                userId,
                orderId: res.razorpay_order_id,
                paymentId: res.razorpay_payment_id,
                signature: res.razorpay_signature,
              }),
            });
            const data1 = await response.json();
            if (!data1.ok) {
              return toast.error(data1.message);
            }
            return toast.success(data1.message);
          } catch (error) {
            return toast.error("Something went wrong");
          }
        },
      };
      const razorpayWindow = window.Razorpay(options);
      razorpayWindow.open();
    } catch (error) {
      return toast.error("Something went wrong");
    }
  };

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
        <button
          className="bg-purple-500 rounded-xl py-1 px-2 cursor-pointer mt-2 text-white hover:bg-purple-600 active:bg-purple-700 w-full"
          onClick={handleCheckout}
        >
          Checkout
        </button>
      </div>
    </Modal>
  );
}
