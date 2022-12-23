import {
  useCallback, useState, VFC
} from 'react';
import {
  Button,
  StyleProp, StyleSheet, Text, TouchableOpacity, View, ViewStyle
} from 'react-native';
import MapView, {
  Region, Marker, Callout
} from 'react-native-maps';
import { useSelector } from 'react-redux';
import Slider from '@react-native-community/slider';

import { useAppDispatch, useLocationPermision } from '@app/util/hooks';
import { Colors } from '@app/styles';
import { selectSurroundingChargePoints } from '@app/core/selectors';
import { poiAsyncActions } from '@app/core/store/poi';
import { PoiData } from '@app/core/types';


type Props = {
  containerStyles?: StyleProp<ViewStyle>;
  mapStyles?: StyleProp<ViewStyle>;
  onSelectPoi: (poi: PoiData) => void;
}
export const Map: VFC<Props> = ({ containerStyles, mapStyles, onSelectPoi }) => {
  const dispatch = useAppDispatch();
  const [searchRadius, setSearchRadius] = useState(3);
  const chargePoints = useSelector(selectSurroundingChargePoints);
  const { hasPerm, renderRequester, getLocation } = useLocationPermision();
  const [region, setRegion] = useState<undefined | Region>(undefined);

  const onSearchRadiusSlide = useCallback((rad: number) => {
    setSearchRadius(rad);
  }, []);

  const composedContainer = StyleSheet.compose<ViewStyle>(
    styles.container,
    containerStyles
  );

  const composedMap = StyleSheet.compose<ViewStyle>(
    styles.map,
    mapStyles
  );

  const findChargers = useCallback(async () => {
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
      distance: searchRadius,
    }));
  }, [searchRadius, getLocation, dispatch]);

  const onPressFind = useCallback(() => {
    void findChargers();
  }, [findChargers]);

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
        {chargePoints.map((poi) => {

          const onSelect = () => {
            onSelectPoi(poi);
          };

          return (
            <Marker
              key={ poi.ID }
              coordinate={{
                latitude: poi.AddressInfo.Latitude,
                longitude: poi.AddressInfo.Longitude,
              }}
              title={ poi.AddressInfo.Title }
            >
              <Callout>
                <Text>
                  {poi.AddressInfo.Title}
                </Text>
                <Button
                  title='Select'
                  onPress={ onSelect }
                />
              </Callout>
            </Marker>
          );
        })}
      </MapView>
      <View style={ styles.col }>
        <Slider
          style={{
            width: 200,
            height: 40,
          }}
          value={ searchRadius }
          onValueChange={ onSearchRadiusSlide }
          step={ 1 }
          minimumValue={ 1 }
          maximumValue={ 20 }
        />
        <Text>
          {' '}
          {`Search Radius: ${searchRadius} mi`}
          {' '}
        </Text>
        <TouchableOpacity
          onPress={ onPressFind }
          style={ styles.button }
        >
          <Text>
            Find Chargers
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  col: {
    justifyContent: 'center',
    alignItems: 'center',
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
});
