import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const baseUrl = process.env.REACT_APP_SOCIAL_MEDIA_BASE_URL;

export const getScrappedKeywordOrLinkData = createAsyncThunk(
  'socialMediaApp/getScrappedKeywordOrLinkData',
  async (data) => {
    const queryParams = new URLSearchParams(data).toString();
    const url = `${baseUrl}/scraped_link_or_keyword_data/?${queryParams}`;
    const response = await axios.get(url);

    return response.data ?? [];
  }
);

export const getFilteredScrappedData = createAsyncThunk(
  'socialMediaApp/getFilteredScrappedData',
  async (data) => {
    try {
      const apiUrl = `${baseUrl}/filtered_scraped_data/`;
      const response = await axios.post(apiUrl, data);

      return response.data ?? [];
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }
);

const socialMediaAdapter = createEntityAdapter();

export const socialMediaSelectors = socialMediaAdapter.getSelectors(
  (state) => state.socialMediaApp.socialMediaScraping
);

const socialMediaSlice = createSlice({
  name: 'socialMediaApp',
  initialState: socialMediaAdapter.getInitialState({
    isGetScrappedDataLoading: false,
    selectedRadioValue: '',
    scrappedData: [],
    analyticsData: [],
  }),

  reducers: {
    setRadioValue: (state, action) => {
      state.selectedRadioValue = action.payload;
    },
  },

  extraReducers: {
    [getScrappedKeywordOrLinkData.pending]: (state) => {
      state.isGetScrappedDataLoading = true;
    },
    [getScrappedKeywordOrLinkData.fulfilled]: (state, action) => {
      state.isGetScrappedDataLoading = false;
      // first empty the filtered data
      state.scrappedData = [];
      state.analyticsData = [];

      // now set the link or keyword data to store
      socialMediaAdapter.setAll(state, action.payload);
    },
    [getScrappedKeywordOrLinkData.rejected]: (state) => {
      state.isGetScrappedDataLoading = false;
      state.error = 'Something went wrong';
    },

    [getFilteredScrappedData.pending]: (state) => {
      state.isGetScrappedDataLoading = true;
    },
    [getFilteredScrappedData.fulfilled]: (state, action) => {
      state.isGetScrappedDataLoading = false;
      // first empty the link or keyword data
      socialMediaAdapter.setAll(state, []);

      // now set the filtered data in store
      state.scrappedData = action.payload.data;
      state.analyticsData = action.payload.analytics_data;
    },
    [getFilteredScrappedData.rejected]: (state) => {
      state.isGetScrappedDataLoading = false;
      state.error = 'Something went wrong';
    },
  },
});

export const { setRadioValue } = socialMediaSlice.actions;

export const selectGetScrappedDataLoading = (state) =>
  state.socialMediaApp?.socialMediaScraping?.isGetScrappedDataLoading;

export const selectScrappedData = (state) =>
  state.socialMediaApp?.socialMediaScraping?.scrappedData;

export const selectAnalyticsData = (state) =>
  state.socialMediaApp?.socialMediaScraping?.analyticsData;

export const selectRadioValue = (state) =>
  state.socialMediaApp?.socialMediaScraping?.selectedRadioValue;

export default socialMediaSlice.reducer;
