import Category from "../components/Category";
import Home from "../components/Home";
import Products from "../components/Products";

export default function HomePage({ isOpen }) {
  return (
    <div>
      <Home />
      <Category />
      <Products />
    </div>
  );
}
