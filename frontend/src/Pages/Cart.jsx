import { useState } from "react";
import { v4 } from "uuid";
import productImg from "../assets/productsImg.jpg";
import CartItems from "../components/CartItems";
import Modal from "../components/Modal";

export default function Cart({ isOpen, setIsOpen }) {
  

  return (
    <Modal
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      header={<h1 className="font-semibold text-center text-xl mb-5">Cart</h1>}
      footer={""}
    >
      <ul className="divide-y-1 divide-gray-200">
        <CartItems
          pname={"Self-care Kit"}
          img={productImg}
          price={25}
          quant={quant}
          setQuant={setQuant}
          pid={v4()}
        />
        <CartItems
          pname={"Self-care Kit"}
          img={productImg}
          price={25}
          quant={quant}
          setQuant={setQuant}
          pid={v4()}
        />
      </ul>
    </Modal>
  );
}
