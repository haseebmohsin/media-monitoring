import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import tickersApiService from 'src/services/tickersApiService';

// export const getNotifications = createAsyncThunk('notificationPanel/getData', async () => {
//   const response = await axios.get('/api/notifications');
//   const data = await response.data;

//   return data;
// });

export const getNotifications = createAsyncThunk(
  'tickersApp/tickers/getNotificationsForWordsList',
  async (data) => {
    const response = await tickersApiService.post('/notifications/', {
      data,
    });

    return response.notification_data ?? [];
  }
);

export const updateNotifications = createAsyncThunk(
  'tickersApp/tickers/getNotificationsForWordsList',
  async (data) => {
    const response = await tickersApiService.post('/notifications/', {
      data,
    });

    return response.notification_data ?? [];
  }
);

export const dismissAll = createAsyncThunk(
  'notificationPanel/dismissAll',
  async (notificationIds) => {
    const response = await tickersApiService.post('/list_clearer/', {
      notificationIds,
    });

    await response.data;

    return true;
  }
);

// export const dismissAll = createAsyncThunk('notificationPanel/dismissAll', async () => {
//   const response = await axios.delete('/api/notifications');
//   await response.data;

//   return true;
// });

export const dismissItem = createAsyncThunk('notificationPanel/dismissItem', async (id) => {
  const response = await axios.delete(`/api/notifications/${id}`);
  await response.data;

  return id;
});

export const addNotification = createAsyncThunk(
  'notificationPanel/addNotification',
  async (item) => {
    const response = await axios.post(`/api/notifications`, { ...item });
    const data = await response.data;

    return data;
  }
);

const notificationsAdapter = createEntityAdapter({});

const initialState = notificationsAdapter.upsertMany(notificationsAdapter.getInitialState(), []);

export const { selectAll: selectNotifications, selectById: selectNotificationsById } =
  notificationsAdapter.getSelectors((state) => state.notificationPanel.data);

const dataSlice = createSlice({
  name: 'notificationPanel/data',
  initialState,
  reducers: {},
  extraReducers: {
    [dismissItem.fulfilled]: (state, action) =>
      notificationsAdapter.removeOne(state, action.payload),
    [dismissAll.fulfilled]: (state, action) => notificationsAdapter.removeAll(state),

    [getNotifications.fulfilled]: (state, action) =>
      notificationsAdapter.addMany(state, action.payload),

    [addNotification.fulfilled]: (state, action) =>
      notificationsAdapter.addOne(state, action.payload),

    [updateNotifications.fulfilled]: (state, action) =>
      notificationsAdapter.setAll(state, action.payload),
  },
});

export default dataSlice.reducer;
