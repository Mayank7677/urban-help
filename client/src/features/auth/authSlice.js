import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../configs/api";
import { act } from "react";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, thunkAPI) => {
    try {
      const res = await axiosInstance.post("/auth/login", {
        email,
        password,
      });

      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        err.response.data.message || "Login Failed"
      );
    }
  }
);

export const checkAuth = createAsyncThunk(
  "auth/checkAuth",
  async (_, thunkAPI) => {
    try {
      const res = await axiosInstance.get("/auth/checkAuth"); // token added via Axios interceptor
      return res.data.user; // return user object only
    } catch (err) {
      return thunkAPI.rejectWithValue("Session expired or invalid");
    }
  }
);

export const registerUser = createAsyncThunk(
  "auth/registerThunk",
  async ({ name, email, password, city, state, role }, thunkAPI) => {
    try {
      const res = await axiosInstance.post("/auth/register", {
        name,
        email,
        password,
        city,
        state,
        role,
      });

      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Register failed"
      );
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: localStorage.getItem("token") || "",
    loading: false,
    error: "",
  },
  reducers: {
    logout: (state) => {
      (state.user = null), (state.token = "");
      localStorage.removeItem("token");
    },
  },

  extraReducers: (builder) => {
    builder

      // Register Cases
      .addCase(registerUser.pending, (state) => {
        (state.loading = true), (state.error = "");
      })

      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.loading = false;
        localStorage.setItem("token", action.payload.token);
      })

      .addCase(registerUser.rejected, (state, action) => {
        (state.loading = false), (state.error = action.payload);
      })

      // Login Cases
      .addCase(loginUser.pending, (state) => {
        (state.loading = true), (state.error = "");
      })

      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.loading = false;
        state.token = action.payload.token;
        localStorage.setItem("token", action.payload.token);
      })

      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Check Auth Cases
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.user = action.payload;
      })

      .addCase(checkAuth.rejected, (state) => {
        state.user = null;
        state.token = "";
        localStorage.removeItem("token");
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
