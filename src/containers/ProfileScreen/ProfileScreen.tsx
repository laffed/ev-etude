import { useCallback, VFC } from 'react';
import { useSelector } from 'react-redux';
import {
  Button, Text, View
} from 'react-native';

import { TabStackScreenProp, TabRoutes } from '@navigation/index';
import { ChargerDetails, SafeScreen } from '@app/components';
import { selectSelectedCharger } from '@app/core/selectors';



export const ProfileScreen: VFC<TabStackScreenProp<TabRoutes.PROFILE>> = ({ navigation }) => {
  const selectedCharger = useSelector(selectSelectedCharger);

  const onNavToMap = useCallback(() => {
    navigation.navigate(TabRoutes.HOME);
  }, [navigation]);

  return (
    <SafeScreen>
      {selectedCharger === null ? (
        <View>
          <Text>Select a Charger to Begin</Text>
          <Button
            title='Find a Charger'
            onPress={ onNavToMap }
          />
        </View>
      ): (
        <ChargerDetails poi={ selectedCharger } />
      )}
    </SafeScreen>
  );
};
