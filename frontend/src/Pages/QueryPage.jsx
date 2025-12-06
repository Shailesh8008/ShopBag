import { useNavigate } from "react-router-dom";
import Modal from "../components/Modal";
import { useState } from "react";
import toast from "react-hot-toast";
const backendUrl = import.meta.env.VITE_BACKEND_URL

export default function QueryPage({ isOpen, setIsOpen }) {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    query: "",
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${backendUrl}/api/submitquery`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!data.ok) {
        return toast.error(data.message);
      }
      toast.success(data.message);
    } catch (error) {
      toast.error("Internal server error");
    }
    setFormData({ username: "", email: "", query: "" });
    navigate(-1);
    setIsOpen(false);
  };

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.id]: e.target.value });

  return (
    <Modal
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      header={
        <h1 className="text-center text-lg font-semibold">Query Form📝</h1>
      }
      footer={""}
    >
      <form className="mb-2 mt-4 w-full space-y-2.5" onSubmit={handleSubmit}>
        <input
          id="username"
          type="text"
          value={formData.username}
          onChange={handleChange}
          placeholder="Name"
          className="w-full px-3 py-2 border border-purple-200 rounded focus:outline-none focus:ring-1 focus:ring-purple-600"
        />
        <input
          id="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="E-mail"
          className="w-full px-3 py-2 border border-purple-200 rounded focus:outline-none focus:ring-1 focus:ring-purple-600"
        />
        <textarea
          id="query"
          value={formData.query}
          onChange={handleChange}
          placeholder="Type Your Query"
          className="w-full px-3 py-2 border border-purple-200 rounded focus:outline-none focus:ring-1 focus:ring-purple-600"
          rows="3"
        ></textarea>
        <button className="hover:bg-purple-600 hover:text-white border border-purple-600 text-purple-600 rounded-xl px-3 py-2 w-full cursor-pointer transition active:bg-purple-700 active:text-white font-semibold">
          Submit
        </button>
      </form>
    </Modal>
  );
}
