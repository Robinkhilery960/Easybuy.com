import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { server } from "../../server";
const initialState = {
  productLoading: true,
  shopProductsLoading: true,
  deleteShopProductLoading: true,
  allProductsLoading: true
  
};

export const createProduct = createAsyncThunk(
  "createProduct",
  async ({ name, description, category, tags, originalPrice, discountPrice, stock, shopId, images }) => {
    
    try {
      const response = await axios.post(
        `${server}/product/create-product`,
        { name, description, category, tags, originalPrice, discountPrice, stock, shopId, images } 
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

// get  shop products
export const loadShopProducts = createAsyncThunk(
  "loadShopProducts",
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
// get all shop's products
export const loadAllProducts = createAsyncThunk(
  "loadAllProducts",
  async (shopId) => {
    try {
      const response = await axios.get(
        `${server}/product/get-all-shops-products`
      );
      return response.data;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
)

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
      state.deleteShopProductLoading = false;
      state.message = action.payload.message;
      state.shopProductDeleteSuccess = true;
    });
    builder.addCase(deleteProduct.pending, (state, action) => {
      state.deleteShopProductLoading = true;
    });
    builder.addCase(deleteProduct.rejected, (state, action) => {
      state.deleteShopProductLoading = false;
      state.delelteProductError = action.payload;
    });

    //for shop  all product
    builder.addCase(loadShopProducts.fulfilled, (state, action) => {
      state.shopProductsLoading = false;
      state.shopProducts = action.payload.products;
      state.shopProductsSuccess = true;
    });
    builder.addCase(loadShopProducts.pending, (state, action) => {
      state.shopProductsLoading = true;
    });
    builder.addCase(loadShopProducts.rejected, (state, action) => {
      state.shopProductsLoading = false;
      state.allProductError = action.payload;
    });


    //for all shops  all product
    builder.addCase(loadAllProducts.fulfilled, (state, action) => {
      state.allProductsLoading = false;
      state.allProducts = action.payload.allProducts;
      state.allProductsSuccess = true;
    });
    builder.addCase(loadAllProducts.pending, (state, action) => {
      state.allProductsLoading = true;
    });
    builder.addCase(loadAllProducts.rejected, (state, action) => {
      state.allProductsLoading = false;
      state.allProductError = action.payload;
    });
  },
});

export default productSlice.reducer;
