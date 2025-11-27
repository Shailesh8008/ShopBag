import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const findItemIndex = (state, action) =>
  state.findIndex((el) => el.pid == action.payload.pid);

export const saveCart = createAsyncThunk("cart/save", async (cartData) => {
  try {
    const res = await fetch("/api/savecart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cartData),
    });
    const data = await res.json();
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
  },
});

export default slice.reducer;
export const { cartAddItem, cartRemoveItem, cartIncreaseQt, cartDecreaseQt } =
  slice.actions;
