import {configureStore } from  "@reduxjs/toolkit"
import userSlice from "./slice/user"
import shopSlice from "./slice/shop"
import productSlice from "./slice/product"
const Store= configureStore({
    reducer:{
        user:userSlice,
        shop:shopSlice,
        product:productSlice
    }
})

export default Store