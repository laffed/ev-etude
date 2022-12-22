import {
  useCallback, useState, VFC
} from 'react';
import {
  Pressable,
  StyleProp, StyleSheet, View, ViewStyle
} from 'react-native';
import MapView, { Region, Marker } from 'react-native-maps';
import { FontAwesome } from '@expo/vector-icons';
import { useSelector } from 'react-redux';

import { useAppDispatch, useLocationPermision } from '@app/util/hooks';
import { Colors } from '@app/styles';
import { selectSurroundingChargePoints } from '@app/core/selectors';
import { poiAsyncActions } from '@app/core/store/poi';



type Props = {
  containerStyles?: StyleProp<ViewStyle>;
  mapStyles?: StyleProp<ViewStyle>;
}
export const Map: VFC<Props> = ({ containerStyles, mapStyles }) => {
  const dispatch = useAppDispatch();
  const chargePoints = useSelector(selectSurroundingChargePoints);
  const { hasPerm, renderRequester, getLocation } = useLocationPermision();
  const [region, setRegion] = useState<undefined | Region>(undefined);
  const composedContainer = StyleSheet.compose<ViewStyle>(
    styles.container,
    containerStyles
  );

  const composedMap = StyleSheet.compose<ViewStyle>(
    styles.map,
    mapStyles
  );

  const onSetRegion = useCallback(async () => {
    const location = await getLocation();
    const { latitude, longitude } = location.coords;
    setRegion({
      latitude,
      longitude,
      latitudeDelta: 0.5,
      longitudeDelta: 0.5,
    });

    await dispatch(poiAsyncActions.fetchGetChargePois({
      latitude,
      longitude,
    }));
  }, [getLocation, dispatch]);

  const onArrowPress = useCallback(() => {
    void onSetRegion();
  }, [onSetRegion]);

  if (!hasPerm) {
    return (
      <View style={ composedMap }>
        {renderRequester()}
      </View>
    );
  }

  return (
    <View style={ composedContainer }>
      <MapView
        region={ region }
        style={ composedMap }
      >
        {chargePoints.map(({ ID, AddressInfo }) => (
          <Marker
            key={ ID }
            coordinate={{
              latitude: AddressInfo.Latitude,
              longitude: AddressInfo.Longitude,
            }}
            title={ AddressInfo.Title }
          />
        ))}
      </MapView>
      <Pressable
        style={ styles.arrow }
        onPress={ onArrowPress }
      >
        <FontAwesome
          name="location-arrow"
          size={ 30 }
          color={ Colors.RED5 }
        />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrow: {
    position: 'absolute',
    left: 10,
    top: 10,
  },
});
