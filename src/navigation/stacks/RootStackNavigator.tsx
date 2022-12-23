import { VFC } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import { ChargerModal } from '@containers/index';

import { RootNavigatorParamsList } from '../types';
import { ModalRoutes, RootNavigatorRoutes } from '../routes';

import { TabStackNavigator } from './TabStackNavigator';


const { Navigator, Screen } = createNativeStackNavigator<RootNavigatorParamsList>();

export const RootStackNavigator: VFC = () => {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={ RootNavigatorRoutes.TAB_STACK }
    >
      <Screen
        name={ RootNavigatorRoutes.TAB_STACK }
        component={ TabStackNavigator }
      />
      <Screen
        name={ ModalRoutes.CHARGER }
        component={ ChargerModal }
        options={{
          presentation: 'modal',
        }}
      />
    </Navigator>
  );
};
