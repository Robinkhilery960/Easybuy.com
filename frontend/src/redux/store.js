import {configureStore } from  "@reduxjs/toolkit"
import userSlice from "./slice/user"
const Store= configureStore({
    reducer:{
        user:userSlice
    }
})

export default Store