/* istanbul ignore file */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
  PoiData,
  PoiState
} from '@core/types';

import { fetchGetChargePois, fetchPostSelectCharger } from './poi.thunk';


export const poiInitialState: PoiState= {
  points: [],
  selectedPoi: null,
  chargingStatus: 'idle',
};

export const poiSlice = createSlice({
  name: 'poi',
  initialState: poiInitialState,
  reducers: {
    setSelectedPoi: (state, { payload }: PayloadAction<PoiData>) => {
      state.selectedPoi = payload;
    },
    setChargingStatus: (state, { payload }: PayloadAction<PoiState['chargingStatus']>) => {
      state.chargingStatus = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchGetChargePois.fulfilled, (state, { payload }) => {
      state.points = payload;
    });

    builder.addCase(fetchPostSelectCharger.fulfilled, (state) => {
      state.chargingStatus = 'charging';
    });

    builder.addCase(fetchPostSelectCharger.rejected, (state) => {
      state.chargingStatus = 'error';
    });

  },
});

export const poiActions = poiSlice.actions;
export default poiSlice.reducer;
