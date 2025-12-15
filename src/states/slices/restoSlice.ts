import { RestoPayload } from '@/features/restaurants/type';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type RestoState = RestoPayload;

const initialState: RestoState = {
  category: undefined,
  location: undefined,
  priceMax: undefined,
  priceMin: undefined,
  range: undefined,
  rating: undefined,
};

export const restoSlice = createSlice({
  name: 'resto',
  initialState,
  reducers: {
    QuerySearch: (state, action: PayloadAction<RestoState>) => {
      state.category = action.payload.category;
      state.location = action.payload.location;
      state.priceMax = action.payload.priceMax;
      state.priceMin = action.payload.priceMin;
      state.range = action.payload.range;
      state.rating = action.payload.rating;
    },
    ClearSearch: (state) => {
      state.category = undefined;
      state.location = undefined;
      state.priceMax = undefined;
      state.priceMin = undefined;
      state.range = undefined;
      state.rating = undefined;
    },
  },
});

export const { QuerySearch, ClearSearch } = restoSlice.actions;
export default restoSlice.reducer;
