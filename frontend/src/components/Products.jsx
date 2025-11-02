import productImg from "../assets/productsImg.jpg";

export default function Products() {
  return (
    <section className="bg-gradient-to-r py-3 from-purple-100 via-white to-white">
      <h2 className="text-xl font-semibold justify-self-center mb-5">
        Products
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 px-3 sm:px-8 gap-5">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((el) => {
          return (
            <div
              key={el}
              className="max-w-[16rem] bg-gray-100 px-3 py-3 rounded-md hover:shadow-lg transition-shadow"
            >
              <div className="mb-2">
                <img src={productImg} alt="" className="rounded" />
              </div>
              <p className="font-semibold">Title</p>
              <p className=" font-semibold text-purple-600 mb-1 ml-0.5">
                $ 12
              </p>
              <p className="text-sm text-gray-600 mb-3">
                {"type desription here"}........
              </p>
              <div className="text-center">
                <button className="bg-purple-600 text-white rounded py-0.5 px-2 active:bg-purple-700 transition-all cursor-pointer">
                  Add to Cart
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
