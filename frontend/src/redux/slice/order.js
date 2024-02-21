import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { server } from "../../server";
const initialState = {
  orderLoading: true,
  shopOrdersLoading: true,
  userOrdersLoading: true,
  allOrdersLoading: true,
};

// get  shop orders
export const loadShopOrders = createAsyncThunk(
  "loadShopOrders",
  async (shopId) => {
    try {
      const response = await axios.get(
        `${server}/order/get-all-orders/${shopId}`
      );
      return response.data;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
);

// get all user orders
export const loadUserOrders = createAsyncThunk(
  "loadUserOrders",
  async (userId) => {
    try {
      const response = await axios.get(
        `${server}/order/get-all-user-orders/${userId}`
      );
      return response.data;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
);
// get all shop's products
// export const loadAllProducts = createAsyncThunk(
//   "loadAllProducts",
//   async (shopId) => {
//     try {
//       const response = await axios.get(
//         `${server}/product/get-all-shops-products`
//       );
//       return response.data;
//     } catch (error) {
//       console.log(error);
//       return error;
//     }
//   }
// )

const orderSlice = createSlice({
  name: "order",
  initialState,
  extraReducers: (builder) => {
    //for shop  all orders
    builder.addCase(loadShopOrders.fulfilled, (state, action) => {
      state.shopOrdersLoading = false;
      state.shopOrders = action.payload.orders;
      state.shopOrdersSuccess = true;
    });
    builder.addCase(loadShopOrders.pending, (state, action) => {
      state.shopOrdersLoading = true;
    });
    builder.addCase(loadShopOrders.rejected, (state, action) => {
      state.shopOrdersLoading = false;
      state.allOrdersError = action.payload;
    });

    // get all user orders
    builder.addCase(loadUserOrders.fulfilled, (state, action) => {
      state.userOrdersLoading = false;
      state.userOrders = action.payload.orders;
      state.userOrdersSuccess = true;
    });
    builder.addCase(loadUserOrders.pending, (state, action) => {
      state.userOrdersLoading = true;
    });
    builder.addCase(loadUserOrders.rejected, (state, action) => {
      state.userOrdersLoading = false;
      state.allOrdersError = action.payload;
    });

    //for all shops  all product
    // builder.addCase(loadAllProducts.fulfilled, (state, action) => {
    //   state.allProductsLoading = false;
    //   state.allProducts = action.payload.allProducts;
    //   state.allProductsSuccess = true;
    // });
    // builder.addCase(loadAllProducts.pending, (state, action) => {
    //   state.allProductsLoading = true;
    // });
    // builder.addCase(loadAllProducts.rejected, (state, action) => {
    //   state.allProductsLoading = false;
    //   state.allProductError = action.payload;
    // });
  },
});

export default orderSlice.reducer;
