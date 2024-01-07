import { createSlice } from "@reduxjs/toolkit";

const initialState={
    cart:localStorage.getItem("cartItems")?JSON.parse(localStorage.getItem("cartItems")):[]
}

const cartSlice=createSlice({
    name:"cart", 
    initialState,
    reducers:{
        addTocart:(state, action)=>{
            console.log(action .payload)
            const item=action.payload
            console.log(item)
            const isItemExist=state.cart.find((i)=>i._id===item._id)
            if (isItemExist) {
                state.cart = state.cart.map((i) => i._id === isItemExist._id ? item : i);
              } else {
                state.cart = [...state.cart, item];
              }
            
            localStorage.setItem('cartItems', JSON.stringify(state.cart)); 
        },
        removeFromCart:(state, action)=>{
            const itemId=action.payload
            state.cart=state.cart.filter((item)=>item._id!==itemId)
        }
    }
})

export const {addTocart, removeFromCart}= cartSlice.actions
export default cartSlice.reducer