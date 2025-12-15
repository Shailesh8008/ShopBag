import { useEffect, useState } from "react";
import Category from "./Category";
import ProductCard from "./ProductCard";
import {
  ShimmerButton,
  ShimmerPostList,
  ShimmerSectionHeader,
  ShimmerText,
  ShimmerThumbnail,
  ShimmerTitle,
} from "react-shimmer-effects";
const backendUrl = import.meta.env.VITE_BACKEND_URL;

export default function Products() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const getProducts = async () => {
    try {
      const res = await fetch(`${backendUrl}/api/getproducts`);
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
      <section
        className={"py-3 bg-gradient-to-r from-purple-100 via-white to-white"}
      >
        <h2 className="text-xl font-semibold justify-self-center mb-5">
          Products
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 px-3 sm:px-8 gap-5">
          {products.length !== 0 ? (
            <ProductCard products={filteredProducts} />
          ) : (
            [1, 2, 3, 4, 5].map((el) => (
              <div
                key={el}
                className="max-w-[16rem] bg-white shadow-lg px-4 py-4 rounded-md"
              >
                <ShimmerThumbnail height={160} className="rounded-md mb-10" />
                <ShimmerThumbnail
                  height={15}
                  width={28}
                  className="rounded-lg mb-0"
                />
                <ShimmerThumbnail
                  height={15}
                  width={28}
                  className="rounded-lg mb-0"
                />
                <ShimmerThumbnail
                  height={15}
                  width={28}
                  className="rounded-lg mb-0"
                />
                <div className="mt-2">
                  <ShimmerText line={2} gap={10} className="mb-0" />
                </div>
                <div className="mt-4">
                  <ShimmerThumbnail
                    height={40}
                    width={112}
                    className="rounded-md m-0"
                    center
                  />
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </>
  );
}
