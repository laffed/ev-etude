import { useCallback, VFC } from 'react';
import {
  ActivityIndicator
} from 'react-native';
import { useSelector } from 'react-redux';

import { ChargerDetails, SafeScreen } from '@app/components';
import { selectSelectedCharger } from '@app/core/selectors';
import { ModalRoutes, RootStackScreenProp } from '@app/navigation';


export const ChargerModal: VFC<RootStackScreenProp<ModalRoutes.CHARGER>> = ({ navigation }) => {
  const selectedPoi = useSelector(selectSelectedCharger);

  const onAfterPress = useCallback(() => {
    navigation.pop();
  }, [navigation]);

  return (
    <SafeScreen>
      {selectedPoi === null ? (
        <ActivityIndicator size={ 25 } />
      ) : (
        <ChargerDetails
          onPressFinish={ onAfterPress }
          poi={ selectedPoi }
        />
      ) }
    </SafeScreen>
  );
};

