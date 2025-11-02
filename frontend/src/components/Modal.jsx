import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";

export default function Modal({ isOpen, setIsOpen, header, footer, children }) {
  const navigate = useNavigate()

  document.body.style.overflow = isOpen ? "hidden":"visible";
  return createPortal(
    <>
      <div
        onClick={(e) => {
          setIsOpen(false)
          navigate("/")
        }}
        className={`absolute top-0 backdrop-blur-xs bg-gray-400/25 w-full h-full content-center px-4 ${
          isOpen ? "" : "hidden"
        }`}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="max-w-2xl bg-white mx-auto px-6 py-3 shadow-2xl rounded-lg"
        >
          {header}
          {children}
          {footer}
        </div>
      </div>
    </>,
    document.getElementById("portal")
  );
}
