import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const findItemIndex = (state, action) =>
  state.findIndex((el) => el.pid == action.payload.pid);

export const saveCart = createAsyncThunk("cart/save", async (cartData) => {
  try {
    const token = localStorage.getItem("token");
    const res = await fetch("/api/savecart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(cartData),
    });
    return cartData.cartData;
  } catch (error) {
    console.log("Internal server error");
  }
});
export const fetchCart = createAsyncThunk("cart/fetch", async (userId) => {
  try {
    const token = localStorage.getItem("token");
    const res = await fetch(`/api/fetchcart/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    return data.data?.CartItems || [];
  } catch (error) {
    console.log("Internal server error");
  }
});

const slice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    cartAddItem(state, action) {
      const itemIndex = findItemIndex(state, action);
      if (itemIndex !== -1) state[itemIndex].qt += 1;
      else state.push({ ...action.payload, qt: 1 });
    },
    cartRemoveItem(state, action) {
      const itemIndex = findItemIndex(state, action);
      state.splice(itemIndex, 1);
    },
    cartIncreaseQt(state, action) {
      const itemIndex = findItemIndex(state, action);
      state[itemIndex].qt += 1;
    },
    cartDecreaseQt(state, action) {
      const itemIndex = findItemIndex(state, action);
      if (state[itemIndex].qt == 1) state.splice(itemIndex, 1);
      else state[itemIndex].qt -= 1;
    },
    clearCart(state, action) {
      state.length = 0;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCart.fulfilled, (state, action) => {
      return action.payload;
    });
    builder.addCase(saveCart.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export default slice.reducer;
export const {
  cartAddItem,
  cartRemoveItem,
  cartIncreaseQt,
  cartDecreaseQt,
  clearCart,
} = slice.actions;
