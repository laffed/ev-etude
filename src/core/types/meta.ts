import type { AppDispatch } from '../store/storeConfiguration';

import type { ApplicationState } from './application';


export enum ThunkStatus {
  IDLE = 'IDLE',
  PENDING = 'PENDING',
  RESOLVED = 'RESOLVED',
  REJECTED = 'REJECTED'
}

export type SliceMeta = {
  sliceMeta: {
    status: ThunkStatus;
    error: string | null;
  }
}

type ThunkConfig = {
  state: ApplicationState;
  dispatch: AppDispatch;
}
export type RejectWith<T> = ThunkConfig & {
  rejectValue: T
}


