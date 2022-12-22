/* istanbul ignore file */

import { createSlice } from '@reduxjs/toolkit';

import {
  PoiState
} from '@core/types';

import { fetchGetChargePois } from './poi.thunk';


export const poiInitialState: PoiState= {
  points: [],
};

export const poiSlice = createSlice({
  name: 'poi',
  initialState: poiInitialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder.addCase(fetchGetChargePois.fulfilled, (state, { payload }) => {
      state.points = payload;
    });
  },
});

export const poiActions = poiSlice.actions;
export default poiSlice.reducer;
