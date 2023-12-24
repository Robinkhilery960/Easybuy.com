import {configureStore } from  "@reduxjs/toolkit"
import userSlice from "./slice/user"
import shopSlice from "./slice/shop"
import productSlice from "./slice/product"
import eventSlice from "./slice/event"
import couponCodeSlice from "./slice/couponCode"
const Store= configureStore({
    reducer:{
        user:userSlice,
        shop:shopSlice,
        product:productSlice,
        event:eventSlice,
        couponCode:couponCodeSlice
    }
})

export default Store