import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserDTO } from '../../services/Types';

/**
 * Auth State interface
 */
interface AuthState {
  isAuthenticated: boolean;
  user: UserDTO | null;
}

/**
 * Initial state for auth
 */
const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
};

/**
 * Auth slice
 */
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    /**
     * Set the authenticated user
     */
    setUser: (state, action: PayloadAction<UserDTO>) => {
      state.isAuthenticated = true;
      state.user = action.payload; // 从 action.payload 获取用户信息
    },
    /**
     * Clear the authenticated user
     */
    clearUser: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;
