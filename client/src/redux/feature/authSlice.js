import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const USER_KEY = 'user';

const initialState = {
  isLogin: false,
  isLoading: false,
  user: JSON.parse(localStorage.getItem(USER_KEY)) || null,
};

export const login = createAsyncThunk('auth/login', async (userData) => {
  try {
    const response = await axios.post(
      'http://localhost:3001/api/login',
      userData
    );

    if (response.status === 200) {
      localStorage.setItem(
        USER_KEY,
        JSON.stringify({ username: userData.username })
      );
      return { user: { username: userData.username } };
    } else {
      throw new Error('Login failed');
    }
  } catch (error) {
    throw error;
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.isLogin = false;
      state.user = null;
      localStorage.removeItem(USER_KEY);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLogin = true;
        state.user = action.payload.user;
      })
      .addCase(login.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
