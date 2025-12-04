import { useEffect, useState } from "react";
import Category from "./Category";
import { useLocation } from "react-router-dom";
import ProductCard from "./ProductCard";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

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
      <section
        className={"py-3 bg-gradient-to-r from-purple-100 via-white to-white"}
      >
        <h2 className="text-xl font-semibold justify-self-center mb-5">
          Products
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 px-3 sm:px-8 gap-5">
          <ProductCard products={filteredProducts} />
        </div>
      </section>
    </>
  );
}
