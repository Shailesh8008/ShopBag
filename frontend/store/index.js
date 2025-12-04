import { configureStore } from "@reduxjs/toolkit";
import CartSlice from "../store/slices/CartSlice";
import AuthSlice from "../store/slices/AuthSlice";

const store = configureStore({ reducer: { cart: CartSlice, auth: AuthSlice } });
export default store;
