import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import tickersApiService from 'src/services/tickersApiService';

export const getKeywordsCloud = createAsyncThunk(
  'tickersApp/keywordsCloud/getKeywordsCloud',
  async (selectedChannelType) => {
    let response;

    if (selectedChannelType === 'localChannels') {
      response = await tickersApiService.get('/keywords_cloud_local');
    } else if (selectedChannelType === 'foreignChannels') {
      response = await tickersApiService.get('/keywords_cloud_foreign');
    }

    return response?.keywords_cloud ?? [];
  }
);

export const getFilteredKeywordsCloud = createAsyncThunk(
  'tickersApp/keywordsCloud/getFilteredKeywordsCloud',
  async (keywordsCloudFilters) => {
    const response = await tickersApiService.post('/keywords_cloud_local_offline/', {
      keywordsCloudFilters,
    });

    return response?.keywords_cloud_offline ?? [];
  }
);

const keywordsCloudAdapter = createEntityAdapter();

export const keywordsCloudSelectors = keywordsCloudAdapter.getSelectors(
  (state) => state.tickersApp.keywordsCloud
);

const keywordsCloudSlice = createSlice({
  name: 'tickersApp/keywordsCloud',
  initialState: keywordsCloudAdapter.getInitialState({
    keywordsCloudFilters: {},
    isKeywordsCloudLoading: false,
    keywordsCloudData: [],

    // selectedKeywordsCloud: [],
  }),

  reducers: {
    setKeywordsCloudFilters: (state, action) => {
      state.keywordsCloudFilters = action.payload;
    },

    // setSelectedKeywordsCloud: (state, action) => {
    //   state.selectedKeywordsCloud = action.payload;
    // },
  },

  extraReducers: {
    [getKeywordsCloud.pending]: (state) => {
      state.isKeywordsCloudLoading = true;
    },
    [getKeywordsCloud.fulfilled]: (state, action) => {
      state.isKeywordsCloudLoading = false;
      state.keywordsCloudData = action.payload;
    },
    [getKeywordsCloud.rejected]: (state) => {
      state.isKeywordsCloudLoading = false;
      state.error = 'Something went wrong';
    },

    [getFilteredKeywordsCloud.pending]: (state) => {
      state.isKeywordsCloudLoading = true;
    },
    [getFilteredKeywordsCloud.fulfilled]: (state, action) => {
      state.isKeywordsCloudLoading = false;
      state.keywordsCloudData = action.payload;
    },
    [getFilteredKeywordsCloud.rejected]: (state) => {
      state.isKeywordsCloudLoading = false;
      state.error = 'Something went wrong';
    },
  },
});

export const selectKeywordsCloudFilters = ({ tickersApp }) =>
  tickersApp.keywordsCloud.keywordsCloudFilters;

export const selectIsKeywordsCloudLoading = ({ tickersApp }) =>
  tickersApp.keywordsCloud.isKeywordsCloudLoading;

export const selectKeywordsCloudData = ({ tickersApp }) =>
  tickersApp.keywordsCloud.keywordsCloudData;

export const { setKeywordsCloudFilters, clearKeywordsCloud } = keywordsCloudSlice.actions;

export default keywordsCloudSlice.reducer;
