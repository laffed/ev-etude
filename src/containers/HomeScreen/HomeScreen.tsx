import { VFC } from 'react';

// import { useAppDispatch } from '@hooks/index';
import { TabStackScreenProp, TabRoutes } from '@navigation/index';
import { SafeScreen } from '@app/components';

import { Map } from './Map';


export const HomeScreen: VFC<TabStackScreenProp<TabRoutes.HOME>> = () => {

  return (
    <SafeScreen>
      <Map />
    </SafeScreen>
  );
};
