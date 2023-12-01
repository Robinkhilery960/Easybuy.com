import {createSlice,createAsyncThunk} from "@reduxjs/toolkit"
import axios from "axios"
import { server } from "../../server";
const initialState={
    isAuthenticated:false,
    isLoading:false,
    isError:false,
    user:null
}

export const loadUser= createAsyncThunk("loadUser", async()=>{
     const response = await axios.get(`${server}/user/getuser`, {
        withCredentials: true,
      }); 
      return response.data
})

const userSlice=createSlice({
    name:"user",
    initialState,
    extraReducers:(builder)=>{
        builder.addCase(loadUser.fulfilled, (state, action)=>{
            state.isLoading=false;
            state.user=action.payload.user
            state.isAuthenticated=true
        })
        builder.addCase(loadUser.pending, (state, action)=>{
            state.isLoading=true; 
        })
        builder.addCase(loadUser.rejected, (state, action)=>{
            state.isLoading=false; 
            state.isError=true; 
            console.log("Error", action.payload)
        })
    }
})


export default userSlice.reducer


