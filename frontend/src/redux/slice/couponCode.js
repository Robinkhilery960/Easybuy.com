import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { server } from "../../server";
const initialState = {
  couponCodeLoading: true, 
};

export const createCouponCode = createAsyncThunk(
  "createCouponCode",
  async (newForm) => { 
  
    try {
      console.log( newForm.get("name"))

      const response = await axios.post(
        `${server}/couponCode/create-couponCode`,
        newForm, 
      );
      return response.data;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
);
// delete product action
export const deleteCouponCode = createAsyncThunk("deleteCouponCode", async (id) => {
  try {
    const response = await axios.delete(
      `${server}/couponCode/delete-couponCode/${id}`,
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

export const loadAllCouponCodes = createAsyncThunk(
  "loadAllCouponCodes",
  async (shopId) => {
    try {
      const response = await axios.get(
        `${server}/couponCode/get-all-couponCodes/${shopId}`
      );
      return response.data;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
);

const couponCodeSlice = createSlice({
  name: "couponCode",
  initialState,
  extraReducers: (builder) => {
    // for single product
    builder.addCase(createCouponCode.fulfilled, (state, action) => {
      state.couponCodeLoading = false;
      state.couponCode = action.payload.couponCode;
      state.couponCodeSuccess = true;
    });
    builder.addCase(createCouponCode.pending, (state, action) => {
      state.couponCodeLoading = true;
    });
    builder.addCase(createCouponCode.rejected, (state, action) => {
      state.couponCodeLoading = false;
      state.couponCodeError = action.payload;
    });

    // delete a product from shop
    builder.addCase(deleteCouponCode.fulfilled, (state, action) => {
      state.deleteCouponCodeLoading = false;
      state.message = action.payload.message;
      state.couponCodeDeleteSuccess = true;
    });
    builder.addCase(deleteCouponCode.pending, (state, action) => {
      state.deleteCouponCodeLoading = true;
    });
    builder.addCase(deleteCouponCode.rejected, (state, action) => {
      state.deleteCouponCodeLoading = false;
      state.delelteCouponCodeError = action.payload;
    });

    //for all product
    builder.addCase(loadAllCouponCodes.fulfilled, (state, action) => {
      state.allCouponCodesLoading = false;
      state.couponCodes = action.payload.couponCodes;
      state.allcouponCodesSuccess = true;
    });
    builder.addCase(loadAllCouponCodes.pending, (state, action) => {
      state.allCouponCodesLoading = true;
    });
    builder.addCase(loadAllCouponCodes.rejected, (state, action) => {
      state.allCouponCodesLoading = false;
      state.allcouponCodesError = action.payload;
    });
  },
});

export default couponCodeSlice.reducer;
