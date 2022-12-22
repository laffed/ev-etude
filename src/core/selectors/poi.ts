import { createSelector } from '@reduxjs/toolkit';

import { ApplicationState } from '../types';



export const selectPoi = (state: ApplicationState) => state.poi;

export const selectSurroundingChargePoints = createSelector(
  selectPoi,
  (poi) => poi.points
);
