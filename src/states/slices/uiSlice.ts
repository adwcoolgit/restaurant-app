import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type AuthDialog = 'REGISTER' | 'LOG_IN' | undefined;

interface UIState {
  toastMessage: string;
  authDialog: AuthDialog;
  menu: boolean;
  search: boolean;
  searching: boolean;
  querySearch: string;
  username: string;
  isFullImage: boolean;
}

const initialState: UIState = {
  toastMessage: '',
  authDialog: undefined,
  menu: false,
  search: false,
  searching: false,
  querySearch: '',
  username: '',
  isFullImage: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setToast: (state, action: PayloadAction<string>) => {
      state.toastMessage = action.payload;
    },
    clearToast: (state) => {
      state.toastMessage = '';
    },
    setDialog: (state, action: PayloadAction<AuthDialog>) => {
      state.authDialog = action.payload;
    },
    isVisibleMenu: (state, action: PayloadAction<boolean>) => {
      state.menu = action.payload;
    },
    isVisibleSearch: (state, action: PayloadAction<boolean>) => {
      state.search = action.payload;
    },
    isSearching: (state, action: PayloadAction<boolean>) => {
      state.searching = action.payload;
    },
    searchUsers: (state, action: PayloadAction<string>) => {
      state.querySearch = action.payload;
    },
    findUserName: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
    clearAll: (state) => {
      state.username = '';
    },
    fullImage: (state, action: PayloadAction<boolean>) => {
      state.isFullImage = action.payload;
    },
  },
});

export const {
  setToast,
  clearToast,
  setDialog,
  isVisibleMenu,
  isVisibleSearch,
  isSearching,
  searchUsers,
  findUserName,
  clearAll,
  fullImage,
} = uiSlice.actions;
export default uiSlice.reducer;
