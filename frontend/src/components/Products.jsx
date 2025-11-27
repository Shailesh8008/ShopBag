import { useEffect, useState } from "react";
import Category from "./Category";
import { useDispatch } from "react-redux";
import { cartAddItem } from "../../store/slices/CartSlice";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const dispatch = useDispatch();

  const getProducts = async () => {
    try {
      const res = await fetch("/api/getproducts");
      const data = await res.json();
      if (!data.ok) {
        return setProducts([]);
      }
      setProducts(data.data.filter((e) => e.status == "In Stock"));
      setFilteredProducts([...products]);
    } catch (error) {
      console.log("Internal server error");
    }
  };
  useEffect(() => {
    getProducts();
  }, []);
  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  return (
    <>
      <Category products={products} setFilteredProducts={setFilteredProducts} />
      <section className="bg-gradient-to-r py-3 from-purple-100 via-white to-white">
        <h2 className="text-xl font-semibold justify-self-center mb-5">
          Products
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 px-3 sm:px-8 gap-5">
          {filteredProducts.map((el) => {
            return (
              <div
                key={el["_id"]}
                className="max-w-[16rem] bg-gray-100 px-4 py-4 rounded-md hover:shadow-lg transition-shadow"
              >
                <div className="mb-2">
                  <img
                    src={`/uploads/${el.pimage}`}
                    alt={el.pimage}
                    className="w-full h-40 object-contain rounded-md border border-gray-300"
                  />
                </div>
                <p className="font-semibold text-lg">{el.pname}</p>
                <p className="font-semibold text-purple-600 ml-0.5">
                  $ {el.price}
                </p>
                <p className={"font-semibold mb-1"}>{el.category}</p>
                <p className="text-sm text-gray-600 mb-3">
                  {!el.desc
                    ? `Get this ${el.pname} at just rupee ${el.price}`
                    : el.desc}
                </p>
                <div className="text-center">
                  <button
                    className="border-2 border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white font-semibold rounded-md py-1.5 px-3 active:bg-purple-800 active:border-purple-800 transition-all cursor-pointer"
                    onClick={() =>
                      dispatch(
                        cartAddItem({
                          pid: el["_id"],
                          pname: el.pname,
                          price: el.price,
                          pimage: el.pimage,
                        })
                      )
                    }
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
