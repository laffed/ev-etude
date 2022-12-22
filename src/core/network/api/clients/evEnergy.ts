import { Http } from '../creator';


export const evEnergyClient = new Http({
  baseURL: 'https://example.ev.energy',
  withCredentials: false,
});
