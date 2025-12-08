import { useLocation } from "react-router-dom";
import Search from "../Pages/Search";
import HomePage from "../Pages/HomePage";

export default function BackgroundElement() {
  const location = useLocation();
  const path = location.state?.pathname;
  if (path.includes("/search")) return <Search />;
  return <HomePage />;
}
