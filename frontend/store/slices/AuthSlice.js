import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const authenticateUser = createAsyncThunk("auth/user", async () => {
  try {
    const res = await fetch("/api/auth/user", { credentials: "include" });
    const data = await res.json();
    if (!data.ok) {
      return { user: null };
    }
    return { user: data.userId };
  } catch (error) {
    console.log("Internal server error");
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState: { user: null },
  reducers: {
    setUser(state, action) {
      state.user = action.payload.user;
    },
    clearUser(state, action) {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(authenticateUser.fulfilled, (state, action) => {
      state.user = action.payload.user;
    });
  },
});

export default authSlice.reducer;
export const { setUser, clearUser } = authSlice.actions;
