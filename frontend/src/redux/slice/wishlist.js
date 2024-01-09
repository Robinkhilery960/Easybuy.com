import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  wishlist: localStorage.getItem("wishlistItems")
    ? JSON.parse(localStorage.getItem("wishlistItems"))
    : [],
};

const wishlistSlice = createSlice({ 
    name: "wishlist",
     initialState,
    reducers:{
        addToWishlist:(state, action)=>{
            const item = action.payload
            const isItemExist= state.wishlist.find((i)=>i._id===item._id)
            if(isItemExist){
                state.wishlist=state.wishlist.map((i)=>i._id===item._id?item:i)
            }else{
                state.wishlist=[...state.wishlist, item]
            }
            localStorage.setItem("wishlistItems",JSON.stringify(state.wishlist))
        },
        removeFromWishlist:(state, action)=>{
            const itemId=action.payload
            state.wishlist=state.wishlist.filter((i)=>i._id!==itemId)
            localStorage.setItem("wishlistItems",JSON.stringify(state.wishlist))
        }
    }
    });


    export const  {addToWishlist, removeFromWishlist}= wishlistSlice.actions
    export default wishlistSlice.reducer
