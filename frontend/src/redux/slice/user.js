import {createSlice,createAsyncThunk} from "@reduxjs/toolkit"
import axios from "axios"
import { server } from "../../server";
const initialState={ 
    isLoading:true,
    isError:false, 
}

export const loadUser= createAsyncThunk("loadUser", async()=>{
    try {
        const response = await axios.get(`${server}/user/getuser`, {
            withCredentials: true,
          }); 
          return response.data
    } catch (error) {
        console.log(error.response.data.message)
        return error.response.data.message
    }
    
})
export const updateUser= createAsyncThunk("updateUser", async(newForm)=>{ 
    const response = await axios.put(`${server}/user/updateuser`,newForm, {
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
        })

        // update user
        builder.addCase(updateUser.fulfilled, (state, action)=>{
            state.isLoading=false;  
            state.user=action.payload.user 
            state.isError=false;  
        })
        builder.addCase(updateUser.pending, (state, action)=>{
            state.isLoading=true; 
        })
        builder.addCase(updateUser.rejected, (state, action)=>{
            state.isLoading=false; 
            state.isError=true 
        })
    }
})


export default userSlice.reducer


