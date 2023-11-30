import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import tickersApiService from 'src/services/tickersApiService';

export const getTickers = createAsyncThunk(
  'tickersApp/tickers/getTickers',
  async (selectedChannel) => {
    const response = await tickersApiService.get(`${selectedChannel}`);
    return response?.tickers ?? [];
  }
);

export const getFilteredTickers = createAsyncThunk(
  'tickersApp/tickers/getFilteredTickers',
  async (filters) => {
    const response = await tickersApiService.post('/index/', {
      filters,
    });

    return response?.tickers ?? [];
  }
);

const tickersAdapter = createEntityAdapter();
export const tickersSelectors = tickersAdapter.getSelectors((state) => state.tickersApp.tickers);

const tickersSlice = createSlice({
  name: 'tickersApp/tickers',
  initialState: tickersAdapter.getInitialState({
    filters: {},
    isTickersLoading: false,
    selectedTickers: [],
    notificationsForWordsList: [],
  }),

  reducers: {
    setFilters: (state, action) => {
      state.filters = action.payload;
    },

    setSelectedTicker: (state, action) => {
      state.selectedTickers = action.payload;
    },

    clearTickers: (state) => {
      tickersAdapter.setAll(state, []);
    },
  },

  extraReducers: {
    [getTickers.pending]: (state) => {
      state.isTickersLoading = true;
    },
    [getTickers.fulfilled]: (state, action) => {
      state.isTickersLoading = false;
      tickersAdapter.setAll(state, action.payload);
    },
    [getTickers.rejected]: (state) => {
      state.isTickersLoading = false;
      state.error = 'Something went wrong';
    },

    [getFilteredTickers.pending]: (state) => {
      state.isTickersLoading = true;
    },
    [getFilteredTickers.fulfilled]: (state, action) => {
      state.isTickersLoading = false;
      tickersAdapter.setAll(state, action.payload);
    },
    [getFilteredTickers.rejected]: (state) => {
      state.isTickersLoading = false;
      state.error = 'Something went wrong';
    },
  },
});

export const selectFilters = ({ tickersApp }) => tickersApp.tickers.filters;

export const { setFilters, setSelectedTicker, clearTickers } = tickersSlice.actions;

export default tickersSlice.reducer;
