import { useDispatch, useSelector } from "react-redux";
import CartItems from "../components/CartItems";
import Modal from "../components/Modal";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchCart } from "../../store/slices/CartSlice";
import toast from "react-hot-toast";
const RazorpayID = import.meta.env.VITE_RAZORPAY_ID;
const backendUrl = import.meta.env.VITE_BACKEND_URL;

export default function Cart({ isOpen, setIsOpen }) {
  const [userExists, setUserExists] = useState(false);
  const [wait, setWait] = useState(false);
  const navigate = useNavigate();
  const cartState = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCart())
      .unwrap()
      .then(() => setUserExists(true))
      .catch((err) => {
        if (err.error) {
          setUserExists(false);
        }
      });
  }, []);

  const handleCheckout = async () => {
    if (wait) return;
    if (!userExists) {
      toast("Please login first", { icon: " ℹ️" });
      return navigate("/signin");
    }
    setWait(true);
    try {
      const amount = cartState.reduce(
        (acc, curr) => acc + curr.price * curr.qt,
        0
      );
      const receipt = "receipt#" + Date.now();
      const res = await fetch(`${backendUrl}/api/checkout`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount,
          currency: "INR",
          receipt,
        }),
      });
      const data = await res.json();
      if (!data.ok) {
        setWait(false);
        return toast.error(data.message);
      }
      const options = {
        key: RazorpayID,
        amount: data.data.amount,
        currency: data.data.currency,
        name: "Shopbag",
        order_id: data.data.id,
        prefill: {
          name: "",
          email: data.email,
        },
        handler: async function (res) {
          try {
            const response = await fetch(`${backendUrl}/api/verifypayment`, {
              method: "POST",
              credentials: "include",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                amount,
                orderId: res.razorpay_order_id,
                paymentId: res.razorpay_payment_id,
                signature: res.razorpay_signature,
              }),
            });
            const data1 = await response.json();
            if (!data1.ok) {
              setWait(false);
              return toast.error(data1.message);
            }
            setWait(false);
            return toast.success(data1.message);
          } catch (error) {
            setWait(false);
            return toast.error("Something went wrong");
          }
        },
      };
      const razorpayWindow = window.Razorpay(options);
      razorpayWindow.open();
      setWait(false);
    } catch (error) {
      setWait(false);
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
        {wait ? (
          <button className="bg-purple-500 rounded-xl py-1 px-2 cursor-not-allowed mt-2 w-full text-gray-300 opacity-50 border">
            Checkout
          </button>
        ) : (
          <button
            className="bg-purple-500 rounded-xl py-1 px-2 cursor-pointer mt-2 text-white hover:bg-purple-600 active:bg-purple-700 w-full"
            onClick={handleCheckout}
          >
            Checkout
          </button>
        )}
      </div>
    </Modal>
  );
}
