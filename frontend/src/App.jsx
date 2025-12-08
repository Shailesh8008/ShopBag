import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./Pages/HomePage";
import { useState } from "react";
import QueryPage from "./Pages/QueryPage";
import SigninPage from "./Pages/SigninPage";
import Signup from "./Pages/Signup";
import Cart from "./Pages/Cart";
import AdminDash from "./admin/AdminDash";
import AdminProduct from "./admin/AdminProduct";
import AdminQuery from "./admin/AdminQuery";
import AddProduct from "./admin/AddProduct";
import EditProduct from "./admin/EditProduct";
import QueryReply from "./admin/QueryReply";
import Search from "./Pages/Search";
import AdminRoute from "./components/AdminRoute";
import Logout from "./components/Logout";
import BackgroundElement from "./components/BackgroundElement";

export default function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Navbar setIsOpen={setIsOpen} isOpen={isOpen} />
      <Routes>
        <Route path="/" element={<HomePage isOpen={isOpen} />} />
        <Route
          path="/query"
          element={
            <>
              <QueryPage isOpen={isOpen} setIsOpen={setIsOpen} />
              <BackgroundElement />
            </>
          }
        />
        <Route
          path="/signin"
          element={
            <>
              <SigninPage isOpen={isOpen} setIsOpen={setIsOpen} />
              <BackgroundElement />
            </>
          }
        />
        <Route
          path="/signup"
          element={
            <>
              <Signup isOpen={isOpen} setIsOpen={setIsOpen} />
              <BackgroundElement />
            </>
          }
        />
        <Route
          path="/cart"
          element={
            <>
              <Cart isOpen={isOpen} setIsOpen={setIsOpen} />
              <BackgroundElement />
            </>
          }
        />
        <Route
          path="/admin/dashboard"
          element={
            <AdminRoute>
              <AdminDash />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/products"
          element={
            <AdminRoute>
              <AdminProduct />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/query"
          element={
            <AdminRoute>
              <AdminQuery />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/addproducts"
          element={
            <AdminRoute>
              <AddProduct />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/editproduct/:id"
          element={
            <AdminRoute>
              <EditProduct />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/queryreply/:id"
          element={
            <AdminRoute>
              <QueryReply />
            </AdminRoute>
          }
        />
        <Route path="/search" element={<Search />} />
        <Route
          path="/logout"
          element={
            <>
              <Logout isOpen={isOpen} setIsOpen={setIsOpen} />
              <BackgroundElement />
            </>
          }
        />
      </Routes>
      <Footer setIsOpen={setIsOpen} />
    </>
  );
}
