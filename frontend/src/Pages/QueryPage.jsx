import { useNavigate } from "react-router-dom";
import Modal from "../components/Modal";

export default function QueryPage({isOpen, setIsOpen}) {
  const navigate = useNavigate()
  return (
    <Modal
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      header={
        <h1 className="text-center text-lg font-semibold">Query Form📝</h1>
      }
      footer={""}
    >
      <form
        className="mb-2 mt-4 w-full space-y-2.5"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <input
          type="text"
          placeholder="Name"
          className="w-full px-3 py-2 border border-purple-200 rounded focus:outline-none focus:ring-1 focus:ring-purple-600"
        />
        <input
          type="email"
          placeholder="E-mail"
          className="w-full px-3 py-2 border border-purple-200 rounded focus:outline-none focus:ring-1 focus:ring-purple-600"
        />
        <textarea
          name=""
          id=""
          placeholder="Type Your Query"
          className="w-full px-3 py-2 border border-purple-200 rounded focus:outline-none focus:ring-1 focus:ring-purple-600"
          rows="3"
        ></textarea>
        <button
          onClick={(e) => {
            setIsOpen(false)
            navigate(-1)
          }}
          className="hover:bg-purple-600 hover:text-white border border-purple-600 text-purple-600 rounded-xl px-3 py-2 w-full cursor-pointer transition active:bg-purple-800"
        >
          Submit
        </button>
      </form>
    </Modal>
  );
}
