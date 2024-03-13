import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { server } from "../../server";
const initialState = {
  isLoading: true,
  isError: false,
};

export const loadUser = createAsyncThunk("loadUser", async () => {
  try {
    const response = await axios.get(`${server}/user/getuser`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

export const updateUser = createAsyncThunk("updateUser", async ({name, email,password, phoneNumber, avatar}) => {
  try {
    const response = await axios.put(`${server}/user/updateuser`, {name, email,password, phoneNumber, avatar}, {
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

export const updateUserAddress = createAsyncThunk(
  "updateUserAddress",
  async ({
    country,
    state,
    city,
    address1,
    address2,
    zipCode,
    addressType,
  }) => {
    try {
      const response = await axios.put(
        `${server}/user/update-user-address`,
        { country, state, city, address1, address2, zipCode, addressType },
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

export const deleteUserAddress = createAsyncThunk(
  "deleteUserAddress",
  async (id) => {
    try {
      const response = await axios.delete(
        `${server}/user/delete-user-address/${id}`,
        {
          withCredentials: true,
        }
      );

      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

// get all users
export const loadAllUsers = createAsyncThunk("loadAllUsers", async () => {
  try {
    const response = await axios.get(`${server}/user/getAllUsers`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearErrors: (state, action) => {
      state.isError = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload.user;
      state.isAuthenticated = true;
    });
    builder.addCase(loadUser.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(loadUser.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = action.error.message;
    });

    // update user
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload.user;
      state.isError = false;
    });
    builder.addCase(updateUser.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(updateUser.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = action.error.message;
    });

    // update user address
    builder.addCase(updateUserAddress.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload.user;
      state.isError = false;
    });
    builder.addCase(updateUserAddress.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(updateUserAddress.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = action.error.message;
      console.log("error", action);
    });

    // delete user address
    builder.addCase(deleteUserAddress.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload.user;
      state.isError = false;
    });
    builder.addCase(deleteUserAddress.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(deleteUserAddress.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = action.error.message;
    });

    // get all users
    builder.addCase(loadAllUsers.fulfilled, (state, action) => {
      state.isLoading = false;
      state.allUsers = action.payload.allUsers;
      state.isError = false;
    });
    builder.addCase(loadAllUsers.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(loadAllUsers.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = action.error.message;
    });
  },
});

export const { clearErrors } = userSlice.actions;

export default userSlice.reducer;
