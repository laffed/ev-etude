import type { BarState } from './bar';
import { PoiState } from './poi';


export type ApplicationState = {
  _persist?: {
    rehydrated?: boolean;
  }
  bar: BarState;
  poi: PoiState;
}
