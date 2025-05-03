import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { signIn, signOut } from "next-auth/react";

// Async thunks for authentication
export const loginUser = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (response.error) {
        return rejectWithValue(response.error);
      }

      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const loginWithGoogle = createAsyncThunk(
  "auth/loginWithGoogle",
  async (_, { rejectWithValue }) => {
    try {
      await signIn("google", { callbackUrl: "/" });
      return null; // This will redirect, so no need to return anything
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await signOut({ callbackUrl: "/" });
      return null;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const initialState = {
  user: null,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Google Login
      .addCase(loginWithGoogle.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginWithGoogle.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(loginWithGoogle.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Logout
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.isLoading = false;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { setUser, clearError } = authSlice.actions;
export const selectAuth = (state) => state.auth;

export default authSlice.reducer;
