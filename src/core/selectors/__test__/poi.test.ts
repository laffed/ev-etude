import { ApplicationState } from '@app/core/types';

import {
  selectChargingStatus, selectPoi, selectSelectedCharger, selectSurroundingChargePoints
} from '../poi';


describe('poi selectors', () => {
  const initialState: Readonly<ApplicationState> = {
    poi: {
      chargingStatus: 'idle',
      points: [],
      selectedPoi: null,
    },
  };

  it('root poi selector', () => {
    expect.assertions(1);
    const selected = selectPoi(initialState);
    expect(selected).toStrictEqual(initialState.poi);
  });

  it('chargingStatus selector', () => {
    expect.assertions(1);
    const selected = selectChargingStatus(initialState);
    expect(selected).toStrictEqual(initialState.poi.chargingStatus);
  });

  it('points selector', () => {
    expect.assertions(1);
    const selected = selectSurroundingChargePoints(initialState);
    expect(selected).toStrictEqual(initialState.poi.points);
  });

  it('selectedPoi selector', () => {
    expect.assertions(1);
    const selected = selectSelectedCharger(initialState);
    expect(selected).toStrictEqual(initialState.poi.selectedPoi);
  });
});
