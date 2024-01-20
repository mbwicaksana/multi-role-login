import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  user: null,
  isLoading: false,
  error: null,
};

const handleError = (error) => {
  if (error.response) {
    return error.response.data.message;
  }
  return "Something went wrong.";
};

export const createSession = createAsyncThunk(
  "user/createSession",
  async (user, { rejectWithValue }) => {
    try {
      const response = await axios.post("http://localhost:5000/login", {
        email: user.email,
        password: user.password,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(handleError(error));
    }
  }
);

export const recentSession = createAsyncThunk(
  "user/recentSession",
  async ({ rejectWithValue }) => {
    try {
      const response = await axios.get("http://localhost:5000/myAccount");
      return response.data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(handleError(error));
      }
    }
  }
);

export const deleteSession = createAsyncThunk(
  "user/deleteSession",
  async ({ rejectWithValue }) => {
    try {
      await axios.delete("http://localhost:5000/logout");
      return null; // No payload needed
    } catch (error) {
      return rejectWithValue(handleError(error));
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createSession.pending, (state) => {
        state.isLoading = true;
        state.error = null; // Clear any previous errors
      })
      .addCase(createSession.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(createSession.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(recentSession.pending, (state) => {
        state.isLoading = true;
        state.error = null; // Clear any previous errors
      })
      .addCase(recentSession.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(recentSession.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(deleteSession.fulfilled, (state) => {
        state.user = null;
      })
      .addCase(deleteSession.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { reset } = userSlice.actions;
export default userSlice.reducer;
