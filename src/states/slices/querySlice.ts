import { QueryProps } from '@/features/restaurants/search-restaurants.service';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type QueryState = QueryProps;

const initialState: QueryState = {
  q: undefined,
  page: 1,
  limit: 20,
};

export const querySlice = createSlice({
  name: 'query',
  initialState,
  reducers: {
    querySearch: (state, action: PayloadAction<QueryState>) => {
      state.q = action.payload.q;
      state.page = action.payload.page;
      state.limit = action.payload.limit;
    },
  },
});

export const { querySearch } = querySlice.actions;
export default querySlice.reducer;
