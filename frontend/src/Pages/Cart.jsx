import productImg from "../assets/react.svg";
import CartItems from "../components/CartItems";
import Modal from "../components/Modal";

export default function Cart({ isOpen, setIsOpen }) {
  return (
    <Modal
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      header={<h1 className="font-semibold text-center text-xl mb-5">Cart</h1>}
      footer={""} height={"cart"}
    >
      <ul className="divide-y-1 divide-gray-200">
        {[1,2,3,4,5,6,7,8,9].map((e)=>{
          return (<CartItems pname={"Self-care Kit"} img={productImg} price={25} />)
        })}
      </ul>
    </Modal>
  );
}
