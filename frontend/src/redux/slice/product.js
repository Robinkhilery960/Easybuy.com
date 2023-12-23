import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { server } from "../../server";
const initialState = {
  productLoading: true,
  allProductLoading: true,
    deleteProductLoading: true,
};

export const createProduct = createAsyncThunk(
  "createProduct",
  async (newForm) => {
    const config = { headers: { "Content-Type": "multipart/form-data" } };
    try {
      const response = await axios.post(
        `${server}/product/create-product`,
        newForm,
        config
      );
      return response.data;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
);
// delete product action
export const deleteProduct = createAsyncThunk("deleteProduct", async (id) => {
  try {
    const response = await axios.delete(
      `${server}/product/delete-product/${id}`,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
});

export const loadAllProducts = createAsyncThunk(
  "loadAllProducts",
  async (shopId) => {
    try {
      const response = await axios.get(
        `${server}/product/get-all-products/${shopId}`
      );
      return response.data;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
);

const productSlice = createSlice({
  name: "product",
  initialState,
  extraReducers: (builder) => {
    // for single product
    builder.addCase(createProduct.fulfilled, (state, action) => {
      state.productLoading = false;
      state.product = action.payload.product;
      state.ProductSuccess = true;
    });
    builder.addCase(createProduct.pending, (state, action) => {
      state.productLoading = true;
    });
    builder.addCase(createProduct.rejected, (state, action) => {
      state.productLoading = false;
      state.ProductError = action.payload;
    });

    // delete a product from shop
    builder.addCase(deleteProduct.fulfilled, (state, action) => {
      state.deleteProductLoading = false;
      state.message = action.payload.message;
      state.productDeleteSuccess = true;
    });
    builder.addCase(deleteProduct.pending, (state, action) => {
      state.deleteProductLoading = true;
    });
    builder.addCase(deleteProduct.rejected, (state, action) => {
      state.deleteProductLoading = false;
      state.delelteProductError = action.payload;
    });

    //for all product
    builder.addCase(loadAllProducts.fulfilled, (state, action) => {
      state.allProductLoading = false;
      state.products = action.payload.products;
      state.allProductSuccess = true;
    });
    builder.addCase(loadAllProducts.pending, (state, action) => {
      state.allProductLoading = true;
    });
    builder.addCase(loadAllProducts.rejected, (state, action) => {
      state.allProductLoading = false;
      state.allProductError = action.payload;
    });
  },
});

export default productSlice.reducer;
