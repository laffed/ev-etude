/* istanbul ignore file */

import { createAsyncThunk } from '@reduxjs/toolkit';

import { RejectWith } from '@core/types';
import {
  getPoiList, GetPoiListRes, postSelectCharger
} from '@network/endpoints';
import { selectSelectedCharger } from '@app/core/selectors';


export const fetchGetChargePois = createAsyncThunk<
  GetPoiListRes,
  {latitude: number; longitude: number, distance: number},
  RejectWith<string>
>(
  'poi/getChargePoints',
  async (payload, { rejectWithValue }) => {
    try {
      const res = await getPoiList(payload);

      return res.data;
    } catch (err) {

      return rejectWithValue('Rejected buzz test');
    }
  }
);

export const fetchPostSelectCharger = createAsyncThunk<
  undefined,
  undefined,
  RejectWith<string>
>(
  'poi/postSelectCharger',
  async (_, { rejectWithValue, getState }) => {
    try {
      const selectedCharger = selectSelectedCharger(getState());
      if (selectedCharger === null) {
        rejectWithValue('Could not find selected charger');

        return undefined;
      }

      const DUMMY_PAYLOAD = {
        user: 1,
        car_id: 42,
        charger_id: selectedCharger.ID, // TODO verify if this is the correct id (or Connections[number].id)
      };

      await postSelectCharger(DUMMY_PAYLOAD);

      return undefined;
    } catch (err) {

      rejectWithValue('Unknown error');

      return undefined;
    }
  }
);
