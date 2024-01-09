import {configureStore } from  "@reduxjs/toolkit"
import userSlice from "./slice/user"
import shopSlice from "./slice/shop"
import productSlice from "./slice/product"
import eventSlice from "./slice/event"
import couponCodeSlice from "./slice/couponCode"
import cartSlice from "./slice/cart"
import wishlistSlice from "./slice/wishlist"
const Store= configureStore({
    reducer:{
        user:userSlice,
        shop:shopSlice,
        product:productSlice,
        event:eventSlice,
        couponCode:couponCodeSlice,
        cart:cartSlice,
        wishlist:wishlistSlice,
    }
})

export default Store