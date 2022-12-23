import { PoiState } from './poi';


export type ApplicationState = {
  _persist?: {
    rehydrated?: boolean;
  }
  poi: PoiState;
}
