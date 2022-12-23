import { PoiData } from '@app/core/types';

import { openChargeMapClient } from '../api/clients';


type Params = {
  latitude: number;
  longitude: number;
  distance: number;
}

export type GetPoiListRes = PoiData[];
export const getPoiList = ({ latitude, longitude, distance }: Params) => {

  return openChargeMapClient.get<GetPoiListRes>('/poi?key=123', {
    params: {
      compact: true,
      latitude,
      longitude,
      distance,
      verbose: false,
    },
  });
};


