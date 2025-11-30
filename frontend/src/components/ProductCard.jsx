import { useDispatch, useSelector } from "react-redux";
import { cartAddItem, saveCart } from "../../store/slices/CartSlice";
import store from "../../store";

export default function ProductCard({ products }) {
  const dispatch = useDispatch();

  const handleAddItem = (el) => {
    const products = {
      pid: el["_id"],
      pname: el.pname,
      price: el.price,
      pimage: el.pimage,
    };
    const userId = localStorage.getItem("user");
    dispatch(cartAddItem(products));
    const state = store.getState().cart;
    dispatch(saveCart({ userId, cartData: state }));
  };

  return (
    <>
      {products.map((el) => {
        return (
          <div
            key={el["_id"]}
            className="max-w-[16rem] bg-gray-100 px-4 py-4 rounded-md hover:shadow-lg transition-shadow"
          >
            <div className="mb-2">
              <img
                src={`/uploads/${el.pimage}`}
                alt={el.pimage}
                className="w-full h-40 object-contain rounded-md border border-gray-300 bg-white"
              />
            </div>
            <p className="font-semibold text-lg">{el.pname}</p>
            <p className="font-semibold text-purple-600 ml-0.5">$ {el.price}</p>
            <p className={"font-semibold mb-1"}>{el.category}</p>
            <p className="text-sm text-gray-600 mb-3">
              {!el.desc
                ? `Get this ${el.pname} at just rupee ${el.price}`
                : el.desc}
            </p>
            <div className="text-center">
              <button
                className="border-2 border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white font-semibold rounded-md py-1.5 px-3 active:bg-purple-800 active:border-purple-800 transition-all cursor-pointer"
                onClick={() => handleAddItem(el)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        );
      })}
    </>
  );
}
