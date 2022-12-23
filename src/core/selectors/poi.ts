import { createSelector } from '@reduxjs/toolkit';

import { ApplicationState } from '../types';



export const selectPoi = (state: ApplicationState) => state.poi;

export const selectSurroundingChargePoints = createSelector(
  selectPoi,
  (poi) => poi.points
);

export const selectSelectedCharger = createSelector(
  selectPoi,
  (poi) => poi.selectedPoi
);

export const selectChargingStatus = createSelector(
  selectPoi,
  (poi) => poi.chargingStatus
);
