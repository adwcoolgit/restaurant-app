import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {} from '@reduxjs/toolkit';

interface AuthState {
  isLogin: boolean;
  isRegister: boolean;
  blnRememberMe: boolean;
}

const initialState: AuthState = {
  isLogin: false,
  isRegister: false,
  blnRememberMe: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    IsLogin: (state, action: PayloadAction<boolean>) => {
      state.isLogin = action.payload;
    },
    IsRegister: (state, action: PayloadAction<boolean>) => {
      state.isRegister = action.payload;
    },
    isRememberMe: (state, action: PayloadAction<boolean>) => {
      state.blnRememberMe = action.payload;
    },
  },
});

export const { IsLogin, IsRegister, isRememberMe } = authSlice.actions;
export default authSlice.reducer;
