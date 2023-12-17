import {configureStore } from  "@reduxjs/toolkit"
import userSlice from "./slice/user"
import shopSlice from "./slice/shop"
const Store= configureStore({
    reducer:{
        user:userSlice,
        shop:shopSlice
    }
})

export default Store