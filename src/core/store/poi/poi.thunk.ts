/* istanbul ignore file */

import { createAsyncThunk } from '@reduxjs/toolkit';

import { RejectWith } from '@core/types';
import {
  getPoiList, GetPoiListRes
} from '@network/endpoints';


export const fetchGetChargePois = createAsyncThunk<
  GetPoiListRes,
  {latitude: number; longitude: number},
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
