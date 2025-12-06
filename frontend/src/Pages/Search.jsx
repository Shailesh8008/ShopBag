import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
const backendUrl = import.meta.env.VITE_BACKEND_URL;

export default function Search() {
  const [products, setProducts] = useState([]);
  const [searchParams] = useSearchParams();
  const searchInput = searchParams.get("query") || "";

  const getProducts = async (search) => {
    try {
      const res = await fetch(`${backendUrl}/api/search?query=${search}`);
      const data = await res.json();
      if (!data.ok) return;
      return setProducts(data.data);
    } catch (error) {
      console.log("Internal server error");
    }
  };

  useEffect(() => {
    if (searchInput) getProducts(searchInput);
    else getProducts("");
  }, [searchInput]);

  return (
    <div className="min-h-screen">
      {products.length != 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 px-3 sm:px-8 gap-5 mt-5">
          <ProductCard products={products} />
        </div>
      ) : (
        <p>No Products</p>
      )}
    </div>
  );
}
