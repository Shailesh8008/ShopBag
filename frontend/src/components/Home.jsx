import fast_deliver from "../assets/fast-deliver.jpg";
import fast_delivery from "../assets/fast_delivery.jpg";

export default function Home({ isOpen }) {
  return (
    <section className={isOpen ? "overflow-hidden" : ""}>
      <div className="border border-gray-300 bg-gradient-to-r from-purple-100 via-white to-white mx-5 mt-10 mb-8 sm:mx-8 px-5 space-x-0 lg:space-x-18 lg:px-8 py-6 lg:py-12 rounded-lg lg:flex max-w-7xl">
        <div className="self-center space-y-4">
          <h1 className="text-4xl sm:text-5xl font-semibold">
            Fast Delivery 🚀
          </h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere
            adipisci nostrum unde in blanditiis voluptatum suscipit distinctio
            quibusdam deleniti corporis!
          </p>
          <div className="text-center lg:text-start">
            <button className="py-1 px-2 rounded-full cursor-pointer outline outline-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white transition-all">
              Shop Now
            </button>
          </div>
        </div>
        <div className="max-w-lg rounded-lg overflow-hidden border border-gray-200 self-center mt-5 lg:mt-0 justify-self-center">
          <img src={fast_deliver} alt="" className="scale-105" />
        </div>
      </div>
    </section>
  );
}
