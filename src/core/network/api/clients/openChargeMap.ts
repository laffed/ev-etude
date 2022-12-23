import { Http } from '../creator';


export const openChargeMapClient = new Http({
  baseURL: 'https://api.openchargemap.io/v3',
  withCredentials: false,
});
