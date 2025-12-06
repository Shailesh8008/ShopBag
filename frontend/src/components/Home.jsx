import { Link } from "react-router-dom";
import fast_deliver from "../assets/fast-deliver.jpg";

export default function Home({ isOpen }) {
  return (
    <section className={isOpen ? "overflow-hidden" : ""}>
      <div className="border border-gray-300 bg-gradient-to-r from-purple-100 via-white to-white mx-4 mt-10 mb-8 sm:mx-8 px-5 space-x-0 lg:space-x-18 lg:px-8 py-6 lg:py-12 rounded-lg lg:flex max-w-7xl">
        <div className="self-center space-y-4">
          <h1 className="text-4xl sm:text-5xl font-semibold">
            Fast Delivery 🚀
          </h1>
          <p>
            Get what you love delivered fast — premium products, seamless
            shopping, and speed that never slows down. Enjoy a hassle-free
            experience where every order arrives right on time. Your convenience
            is our priority!
          </p>
          <div className="text-center lg:text-start">
            <Link
              to={"/search"}
              className="py-1 px-2 rounded-full cursor-pointer outline outline-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white transition-all"
            >
              Shop Now
            </Link>
          </div>
        </div>
        <div className="max-w-lg rounded-lg overflow-hidden border border-gray-200 self-center mt-5 lg:mt-0 justify-self-center">
          <img src={fast_deliver} alt="" className="scale-105" />
        </div>
      </div>
    </section>
  );
}
