import {createSlice,createAsyncThunk} from "@reduxjs/toolkit"
import axios from "axios"
import { server } from "../../server";
const initialState={ 
    productLoading:true, 
}

export const createProduct= createAsyncThunk("createProduct", async(newForm)=>{
    const config = { headers: { "Content-Type": "multipart/form-data" } } 
    console.log("i cam cealled from create proct in slce ")
     const response = await axios.post(`${server}/product/create-product`, newForm, config) ; 
      return response.data
})

const productSlice=createSlice({
    name:"product",
    initialState,
    extraReducers:(builder)=>{
        builder.addCase(createProduct.fulfilled, (state, action)=>{
            state.productLoading=false;
            state.product=action.payload.product
            state.ProductSuccess=true
        })
        builder.addCase(createProduct.pending, (state, action)=>{
            state.productLoading=true; 
        })
        builder.addCase(createProduct.rejected, (state, action)=>{
            state.productLoading=false; 
            state.ProductError= action.payload;  
        })
    }
})


export default productSlice.reducer


