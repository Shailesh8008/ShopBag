import { configureStore } from "@reduxjs/toolkit";
import CartSlice from "../store/slices/CartSlice";

const store = configureStore({ reducer: { cart: CartSlice } });
export default store;
