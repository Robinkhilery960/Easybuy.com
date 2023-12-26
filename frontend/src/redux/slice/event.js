import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { server } from "../../server";

const initialState = {
  eventLoading: true,
  deleteEventLoading: true,
  allEventsLoading: true,
  allShopsEventsLoading:true
};

export const createEvent = createAsyncThunk("createEvent", async (newForm) => {
  const config = { headers: { "Content-Type": "multipart/form-data" } };
  try {
    const response = await axios.post(
      `${server}/event/create-event`,
      newForm,
      config
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
});

export const deleteEvent = createAsyncThunk("deleteEvent", async (id) => {
  try {
    const response = await axios.delete(`${server}/event/delete-event/${id}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
});

// load all events 

export const loadAllEvents = createAsyncThunk(
  "loadAllEvents",
  async (shopId) => {
    try {
      const response = await axios.get(
        `${server}/event/get-all-events/${shopId}`
      );
      return response.data;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
);

// get all shop's products
export const loadAllShopsEvents = createAsyncThunk(
  "loadAllShopsEvents",
  async (shopId) => {
    try {
      const response = await axios.get(
        `${server}/event/get-all-shops-events`
      );
      return response.data;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
)

const eventSlice = createSlice({
  name: "event",
  initialState,
  extraReducers: (builder) => {
    // for single product
    builder.addCase(createEvent.fulfilled, (state, action) => {
      state.eventLoading = false;
      state.event = action.payload.event;
      state.eventSuccess = true;
    });
    builder.addCase(createEvent.pending, (state, action) => {
      state.eventLoading = true;
    });
    builder.addCase(createEvent.rejected, (state, action) => {
      state.eventLoading = false;
      state.eventError = action.payload;
    });

    // delete a event from shop
    builder.addCase(deleteEvent.fulfilled, (state, action) => {
      state.deleteEventLoading = false;
      state.message = action.payload.message;
      state.eventDeleteSuccess = true;
    });
    builder.addCase(deleteEvent.pending, (state, action) => {
      state.deleteEventLoading = true;
    });
    builder.addCase(deleteEvent.rejected, (state, action) => {
      state.deleteEventLoading = false;
      state.delelteProductError = action.payload;
    });

    //for all events
    builder.addCase(loadAllEvents.fulfilled, (state, action) => {
      state.allEventsLoading = false;
      state.events = action.payload.events;
      state.allEventsSuccess = true;
    });
    builder.addCase(loadAllEvents.pending, (state, action) => {
      state.allEventsLoading = true;
    });
    builder.addCase(loadAllEvents.rejected, (state, action) => {
      state.allEventsLoading = false;
      state.allEventsError = action.payload;
    });

    //for all shops  all events
    builder.addCase(loadAllShopsEvents.fulfilled, (state, action) => {
      state.allShopsEventsLoading = false;
      state.allEvents = action.payload.totalEvents;
      state.allEventsSuccess = true;
    });
    builder.addCase(loadAllShopsEvents.pending, (state, action) => {
      state.allShopsEventsLoading = true;
    });
    builder.addCase(loadAllShopsEvents.rejected, (state, action) => {
      state.allShopsEventsLoading = false;
      state.allEventsError = action.payload;
    });
  },
});

export default eventSlice.reducer;
