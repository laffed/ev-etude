import { useMemo, VFC } from 'react';
import {
  StyleSheet, View, Text, TouchableOpacity
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useSelector } from 'react-redux';

import { PoiData } from '@app/core/types';
import { selectChargingStatus } from '@app/core/selectors';
import { Colors, Typographies } from '@app/styles';
import { useAppDispatch } from '@app/util/hooks';
import { poiActions, poiAsyncActions } from '@app/core/store';


type Props = {
  poi: PoiData;
  onPressFinish?: () => void
}
export const ChargerDetails: VFC<Props> = ({
  poi,
  onPressFinish,
}) => {
  const dispatch = useAppDispatch();
  const chargingStatus = useSelector(selectChargingStatus);

  const status = useMemo(() => {
    const actionReset = () => {
      dispatch(poiActions.setChargingStatus('idle'));
      onPressFinish?.();
    };
    switch (chargingStatus) {
      case 'charging':
        return {
          color: Colors.BLUE,
          title: 'Charging',
          actionTitle: 'Stop Charging',
          action: actionReset,
        };
      case 'error':
        return {
          color: Colors.RED5,
          title: 'Something went wrong',
          actionTitle: 'Reset',
          action: actionReset,
        };
      case 'idle':
      default:
        return {
          color: Colors.BLACK,
          title: 'Ready to charge',
          actionTitle: 'Start Charging',
          action: () => {
            void dispatch(poiAsyncActions.fetchPostSelectCharger());
            onPressFinish?.();
          },
        };
    }
  }, [chargingStatus, dispatch, onPressFinish]);

  return (
    <View style={ styles.container }>
      <View style={ styles.body }>
        <View style={ styles.row }>
          <Text style={ styles.title }>
            {poi.AddressInfo.Title}
          </Text>
          <FontAwesome5
            name="plug"
            size={ 24 }
            color={ status.color }
          />
        </View>

        <View style={ styles.space } />
        <Text style={ styles.description }>
          {poi.AddressInfo.AddressLine1}
        </Text>
        <Text style={ styles.description }>
          {`${poi.AddressInfo.Town}, ${poi.AddressInfo.StateOrProvince}`}
        </Text>
        <View style={ styles.space } />
        <Text>
          {`Charging status:    ${status.title}`}
        </Text>
      </View>
      <TouchableOpacity
        style={ styles.button }
        onPress={ status.action }
      >
        <Text>
          {status.actionTitle}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 30,
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  body: {
    width: '100%',
    marginBottom: 20,
  },
  space: {
    marginVertical: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    marginVertical: 10,
    width: 200,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: Colors.BLUE,
    borderWidth: 1,
    borderRadius: 10,
  },
  title: {
    ...Typographies.HEADER_1,
    marginVertical: 10,
  },
  description: {
    ...Typographies.PARAGRAPH_1,
  },
});
