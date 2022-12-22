/* istanbul ignore file */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
  PoiData,
  PoiState
} from '@core/types';

import { fetchGetChargePois } from './poi.thunk';


export const poiInitialState: PoiState= {
  points: [],
  selectedPoi: null,
};

export const poiSlice = createSlice({
  name: 'poi',
  initialState: poiInitialState,
  reducers: {
    setSelectedPoi: (state, { payload }: PayloadAction<PoiData>) => {
      state.selectedPoi = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchGetChargePois.fulfilled, (state, { payload }) => {
      state.points = payload;
    });
  },
});

export const poiActions = poiSlice.actions;
export default poiSlice.reducer;
