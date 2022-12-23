import { evEnergyClient } from '../api/clients';


export type PostSelectChargerPayload = {
	user: number;
	car_id: number;
	charger_id: number;
}
export const postSelectCharger = (payload: PostSelectChargerPayload) => {
  return evEnergyClient.post<PostSelectChargerPayload>('/chargingsession', payload);
};
