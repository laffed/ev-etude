import {
  useCallback, useEffect, VFC
} from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  SimpleLineIcons
  , Octicons
} from '@expo/vector-icons';
import { useSelector } from 'react-redux';

import { HomeScreen, ProfileScreen } from '@containers/index';
import { useToast } from '@app/util/hooks';
import { selectChargingStatus } from '@app/core/selectors';



import { RootStackScreenProp, TabNavigatorParamsList } from '../types';
import { RootNavigatorRoutes, TabRoutes } from '../routes';


const { Navigator, Screen } = createBottomTabNavigator<TabNavigatorParamsList>();

export const TabStackNavigator: VFC<RootStackScreenProp<RootNavigatorRoutes.TAB_STACK>> = () => {
  const chargingStatus = useSelector(selectChargingStatus);
  const { showToast } = useToast();

  const onStatusChange = useCallback((status: typeof chargingStatus) => {
    if (status === 'charging') {
      showToast({
        text: 'Charging started!',
      });
    }
  }, [showToast]);

  useEffect(() => {
    onStatusChange(chargingStatus);
  }, [chargingStatus, onStatusChange]);


  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
        tabBarShowLabel: false,
      }}
    >
      <Screen
        name={ TabRoutes.HOME }
        component={ HomeScreen }
        options={{
          tabBarIcon: ({ color }) => (
            <SimpleLineIcons
              name="globe"
              size={ 24 }
              color={ color }
            />
          ),
        }}
      />
      <Screen
        name={ TabRoutes.PROFILE }
        component={ ProfileScreen }
        options={{
          tabBarIcon: ({ color }) => (
            <Octicons
              name="plug"
              size={ 24 }
              color={ color }
            />
          ),
        }}
      />
    </Navigator>
  );
};
