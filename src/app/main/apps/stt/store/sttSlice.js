import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const baseUrl = process.env.REACT_APP_STT_BASE_URL;

export const getSttData = createAsyncThunk('sttApp/stt/getSttData', async () => {
  const response = await axios.get(`${baseUrl}/get_stt_data`);

  return response?.data?.all_data ?? [];
});

export const getFilteredSTTData = createAsyncThunk(
  'sttApp/stt/getFilteredSTTData',
  async (filters) => {
    const response = await axios.post(`${baseUrl}/index/`, {
      filters,
    });

    return response?.data.sttData ?? [];
  }
);

const sttAdapter = createEntityAdapter();
export const sttSelectors = sttAdapter.getSelectors((state) => state.sttApp.sttData);

const sttSlice = createSlice({
  name: 'sttApp/stt',
  initialState: sttAdapter.getInitialState({
    isSttDataLoading: false,

    filters: {},
  }),

  reducers: {
    setSTTFilters: (state, action) => {
      state.filters = action.payload;
    },
  },

  extraReducers: {
    [getSttData.pending]: (state) => {
      state.isSttDataLoading = true;
    },
    [getSttData.fulfilled]: (state, action) => {
      state.isSttDataLoading = false;
      sttAdapter.setAll(state, action.payload);
    },
    [getSttData.rejected]: (state) => {
      state.isSttDataLoading = false;
      state.error = 'Something went wrong';
    },

    [getFilteredSTTData.pending]: (state) => {
      state.isTickersLoading = true;
    },
    [getFilteredSTTData.fulfilled]: (state, action) => {
      state.isTickersLoading = false;
      sttAdapter.setAll(state, action.payload);
    },
    [getFilteredSTTData.rejected]: (state) => {
      state.isTickersLoading = false;
      state.error = 'Something went wrong';
    },
  },
});

export const selectSTTFilters = ({ sttApp }) => sttApp.sttData.filters;

export const { setSTTFilters } = sttSlice.actions;

export default sttSlice.reducer;
