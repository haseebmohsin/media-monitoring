import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import frApiService from 'src/services/frApiService';

export const makeClusters = createAsyncThunk('faceTrakkApp/makeClusters', async (formData) => {
  const response = await frApiService({
    method: 'POST',
    path: 'api/training/makeClusters',
    data: formData,
  });

  return response?.clusters ?? [];
});

export const getClusters = createAsyncThunk('faceTrakkApp/getClusters', async () => {
  const response = await frApiService({ path: 'api/training/getClusters' });

  return response?.clusters ?? [];
});

export const startTraining = createAsyncThunk('faceTrakkApp/startTraining', async () => {
  const response = await frApiService({
    method: 'POST',
    path: 'api/training/startTraining',
    data: {},
  });

  if (response) return response;
  return false;
});

export const getThumbnails = createAsyncThunk('faceTrakkApp/getThumbnails', async () => {
  const response = await frApiService({ path: `api/facedash/getThumbnails` });

  return response?.data ?? [];
});

export const liveVideo = createAsyncThunk('faceTrakkApp/liveVideo', async (formData) => {
  const response = await frApiService({
    method: 'POST',
    path: 'api/facedash/liveVideo',
    data: formData,
  });

  return response?.data ?? [];
});

export const getLiveStreamData = createAsyncThunk(
  'faceTrakkApp/getLiveStreamData',
  async (selectedChannel) => {
    const response = await frApiService({
      method: 'POST',
      path: 'api/facedash/getLiveStreamData',
      data: { selectedChannel },
    });

    console.log(response);

    return response?.data ?? [];
  }
);

export const addPersonName = createAsyncThunk('faceTrakkApp/addPersonName', async (name) => {
  const response = await frApiService({
    method: 'POST',
    path: 'api/person/addPersonName',
    data: name,
  });

  return response.data;
});

export const getAllPersonNames = createAsyncThunk('faceTrakkApp/getAllPersonNames', async () => {
  const response = await frApiService({ path: 'api/person/getAllPersonNames' });

  return response?.personNames ?? [];
});

export const createAdditionalTrainingDatasets = createAsyncThunk(
  'faceTrakkApp/createAdditionalTrainingDatasets',
  async (data) => {
    const response = await frApiService({
      method: 'POST',
      path: 'api/training/createAdditionalTrainingDatasets',
      data,
    });

    return response ?? false;
  }
);

export const moveToNewCluster = createAsyncThunk('faceTrakkApp/moveToNewCluster', async (data) => {
  const response = await frApiService({
    method: 'POST',
    path: 'api/training/moveToNewCluster',
    data,
  });

  return response ?? false;
});

const faceTrakkAdapter = createEntityAdapter({
  selectId: (entity) => entity._id,
});

export const faceTrakkSelectors = faceTrakkAdapter.getSelectors(
  (state) => state.faceTrakkApp?.faceTrakk
);

const faceTrakkSlice = createSlice({
  name: 'faceTrakkApp/faceTrakk',
  initialState: faceTrakkAdapter.getInitialState({
    makeClustersLoading: false,
    getClustersLoading: false,
    clustersData: [],

    loading: false,

    getPersonNamesLoading: false,
    personNames: [],

    selectedItemIds: [],
  }),

  reducers: {
    setClusterSelectedItemIds: (state, action) => {
      state.selectedItemIds = action.payload;
    },
  },

  extraReducers: {
    [makeClusters.pending]: (state) => {
      state.makeClustersLoading = true;
    },
    [makeClusters.fulfilled]: (state, action) => {
      state.makeClustersLoading = false;
      state.clustersData = action.payload;
    },
    [makeClusters.rejected]: (state) => {
      state.makeClustersLoading = false;
    },

    [getClusters.pending]: (state) => {
      state.getClustersLoading = true;
    },
    [getClusters.fulfilled]: (state, action) => {
      state.getClustersLoading = false;
      state.clustersData = action.payload;
    },
    [getClusters.rejected]: (state) => {
      state.getClustersLoading = false;
    },

    [liveVideo.pending]: (state) => {
      state.loading = true;
    },
    [liveVideo.fulfilled]: (state, action) => {
      state.loading = false;
      faceTrakkAdapter.setAll(state, action.payload);
    },
    [liveVideo.rejected]: (state) => {
      state.loading = false;
    },

    [getThumbnails.pending]: (state) => {
      state.loading = true;
    },
    [getThumbnails.fulfilled]: (state, action) => {
      state.loading = false;
      faceTrakkAdapter.setAll(state, action.payload);
    },
    [getThumbnails.rejected]: (state) => {
      state.loading = false;
    },

    [addPersonName.fulfilled]: (state, action) => {
      state.personNames = action.payload;
    },

    [getAllPersonNames.pending]: (state) => {
      state.getPersonNamesLoading = true;
    },
    [getAllPersonNames.fulfilled]: (state, action) => {
      state.getPersonNamesLoading = false;
      state.personNames = action.payload;
    },
    [getAllPersonNames.rejected]: (state) => {
      state.getPersonNamesLoading = false;
    },
  },
});

export const { setClusterSelectedItemIds } = faceTrakkSlice.actions;
export const selectSelectedItemIds = (state) => state.faceTrakkApp?.faceTrakk?.selectedItemIds;

export const selectGetClustersLoading = (state) =>
  state.faceTrakkApp?.faceTrakk?.getClustersLoading;

export const selectMakeClustersLoading = (state) =>
  state.faceTrakkApp?.faceTrakk?.makeClustersLoading;

export const selectClustersData = (state) => state.faceTrakkApp?.faceTrakk?.clustersData;

export const selectFaceTrakkLoading = (state) => state.faceTrakkApp?.faceTrakk?.loading;

export const selectGetPersonNamesLoading = (state) =>
  state.faceTrakkApp?.faceTrakk?.getPersonNamesLoading;

export const selectPersonNames = (state) => state.faceTrakkApp?.faceTrakk?.personNames;

export default faceTrakkSlice.reducer;
