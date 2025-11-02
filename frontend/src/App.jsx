import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./Pages/HomePage";
import { useState } from "react";
import QueryPage from "./Pages/QueryPage";
import SigninPage from "./Pages/SigninPage";
import Signup from "./Pages/Signup";
import Cart from "./Pages/Cart";

export default function App() {
  const location = useLocation();
  const path = location.state?.pathname;
  let element = "";
  if (path == "/") {
    element = <HomePage />;
  }
  console.log(path);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Navbar setIsOpen={setIsOpen} />
      <Routes>
        <Route path="/" element={<HomePage isOpen={isOpen} />} />
        <Route
          path="/query"
          element={
            <>
              <QueryPage isOpen={isOpen} setIsOpen={setIsOpen} />
              {element}
            </>
          }
        />
        <Route
          path="/signin"
          element={
            <>
              <SigninPage isOpen={isOpen} setIsOpen={setIsOpen} />
              <HomePage />
            </>
          }
        />
        <Route
          path="/signup"
          element={
            <>
              <Signup isOpen={isOpen} setIsOpen={setIsOpen} />
              <HomePage />
            </>
          }
        />
        <Route
          path="/cart"
          element={
            <>
              <Cart isOpen={isOpen} setIsOpen={setIsOpen} />
              <HomePage />
            </>
          }
        />
      </Routes>
      <Footer />
    </>
  );
}
