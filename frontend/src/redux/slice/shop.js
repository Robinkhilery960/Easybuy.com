import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { server } from "../../server";
const initialState = {
  isShopLoading: true,
};

export const loadShop = createAsyncThunk("loadShop", async () => {
  const response = await axios.get(`${server}/shop/getshop`, {
    withCredentials: true,
  });
  return response.data;
});

const shopSlice = createSlice({
  name: "shop",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(loadShop.fulfilled, (state, action) => {
      state.isShopLoading = false;
      state.shop = action.payload.shop;
      state.isShopAuthenticated = true;
    });
    builder.addCase(loadShop.pending, (state, action) => {
      state.isShopLoading = true;
    });
    builder.addCase(loadShop.rejected, (state, action) => {
      state.isShopLoading = false;
      state.isShopError = true;
      console.log("Error", action.payload);
    });
  },
});

export default shopSlice.reducer;
