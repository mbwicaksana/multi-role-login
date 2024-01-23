import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  user: null,
  isLoading: false,
  isError: false,
  message: "",
};

const handleError = (error) => {
  if (error.response) {
    return error.response.data.msg;
  }
  return "Something went wrong.";
};

export const createSession = createAsyncThunk(
  "user/createSession",
  async (user, thunkAPI) => {
    try {
      const response = await axios.post("http://localhost:5000/login", {
        email: user.email,
        password: user.password,
      });
      return response.data;
    } catch (error) {
      if (error.response) {
        const message = error.response.data.msg;
        return thunkAPI.rejectWithValue(message);
      }
    }
  }
);

export const recentSession = createAsyncThunk(
  "user/recentSession",
  async (thunkAPI) => {
    try {
      const response = await axios.get("http://localhost:5000/myAccount");
      return response.data;
    } catch (error) {
      if (error.response) {
        return thunkAPI.rejectWithValue(handleError(error));
      }
    }
  }
);

export const deleteSession = createAsyncThunk(
  "user/deleteSession",
  async (thunkAPI) => {
    try {
      await axios.delete("http://localhost:5000/logout");
      return null; // No payload needed
    } catch (error) {
      return thunkAPI.rejectWithValue(handleError(error));
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
      })
      .addCase(createSession.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(createSession.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(recentSession.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(recentSession.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(recentSession.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
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
