import {
  useCallback, useState, VFC
} from 'react';
import {
  Pressable,
  StyleProp, StyleSheet, View, ViewStyle
} from 'react-native';
import MapView, { Region } from 'react-native-maps';
import { FontAwesome } from '@expo/vector-icons';

import { useLocationPermision } from '@app/util/hooks';
import { Colors } from '@app/styles';


type Props = {
  containerStyles?: StyleProp<ViewStyle>;
  mapStyles?: StyleProp<ViewStyle>;
}
export const Map: VFC<Props> = ({ containerStyles, mapStyles }) => {
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

    setRegion({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.5,
      longitudeDelta: 0.5,
    });

  }, [getLocation]);

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
      />
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
