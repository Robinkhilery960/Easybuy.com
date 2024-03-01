import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { server } from "../../server";
const initialState = {
  isShopLoading: true,
};

// load a a shop  
export const loadShop = createAsyncThunk("loadShop", async () => {
  const response = await axios.get(`${server}/shop/getshop`, {
    withCredentials: true,
  });
  return response.data;
});

// load all shops 
export const loadAllShops = createAsyncThunk("loadAllShops", async () => {
  try {
    const response = await axios.get(`${server}/shop/getAllShops`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

const shopSlice = createSlice({
  name: "shop",
  initialState,
  extraReducers: (builder) => {
    //load a single shop
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
      console.log("Error", action);
    });

    //load all shops
    builder.addCase(loadAllShops.fulfilled, (state, action) => {
      state.isShopLoading = false;
      state.allShops = action.payload.allShops; 
    });
    builder.addCase(loadAllShops.pending, (state, action) => {
      state.isShopLoading = true;
    });
    builder.addCase(loadAllShops.rejected, (state, action) => {
      state.isShopLoading = false;
      state.isShopError = true; 
      console.log("Error", action.payload);
    });
  },
});

export default shopSlice.reducer;
