import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const getUsers = createAsyncThunk('adminPanelApp/getUsers', async () => {
  try {
    const response = await axios.get('http://127.0.0.1:5001/api/users');
    console.log(response.data);
    return response.data ?? [];
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
});

const usersAdapter = createEntityAdapter({
  selectId: (entity) => entity._id,
});

export const usersSelectors = usersAdapter.getSelectors((state) => state.adminPanelApp?.users);

const adminPanelSlice = createSlice({
  name: 'adminPanelApp',
  initialState: usersAdapter.getInitialState({
    isGetUsersLoading: false,
  }),

  reducers: {},

  extraReducers: {
    [getUsers.pending]: (state) => {
      state.isGetUsersLoading = true;
    },
    [getUsers.fulfilled]: (state, action) => {
      state.isGetUsersLoading = false;
      usersAdapter.setAll(state, action.payload);
    },
    [getUsers.rejected]: (state) => {
      state.isGetUsersLoading = false;
    },
  },
});

export const selectGetUsersLoading = (state) => state.adminPanelApp?.users?.isGetUsersLoading;

export default adminPanelSlice.reducer;
