import { configureStore } from '@reduxjs/toolkit';
import authSlice from './feature/authSlice';

export default configureStore({
  reducer: {
    auth: authSlice,
  },
});
