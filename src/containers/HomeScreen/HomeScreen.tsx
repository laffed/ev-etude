import { useCallback, VFC } from 'react';

import {
  TabStackScreenProp, TabRoutes, ModalRoutes
} from '@navigation/index';
import { SafeScreen } from '@app/components';
import { useAppDispatch } from '@app/util/hooks';
import { poiActions } from '@app/core/store';
import { PoiData } from '@app/core/types';

import { Map } from './Map';


export const HomeScreen: VFC<TabStackScreenProp<TabRoutes.HOME>> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const onSelectPoi = useCallback((poi: PoiData) => {
    dispatch(poiActions.setChargingStatus('idle'));
    dispatch(poiActions.setSelectedPoi(poi));
    navigation.push(ModalRoutes.CHARGER);
  }, [dispatch, navigation]);

  return (
    <SafeScreen>
      <Map onSelectPoi={ onSelectPoi } />
    </SafeScreen>
  );
};
