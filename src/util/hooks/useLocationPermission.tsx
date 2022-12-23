import {
  PermissionStatus, useForegroundPermissions, getCurrentPositionAsync
} from 'expo-location';
import {
  useEffect, useCallback
} from 'react';
import {
  Text, Pressable, StyleSheet, Alert
} from 'react-native';

import { Colors, Typographies } from '@app/styles';

import { useToast } from './useToast';


const locationAlert = () => { Alert.alert(
  'Location Permssion Required',
  'Grant this app location permissions in your device settings'
); };

export const useLocationPermision = () => {
  const [permission, requestPermission] = useForegroundPermissions();
  const { showToast } = useToast();

  const requestLocation = useCallback(async () => {
    const reqStatus = await requestPermission();
    if (reqStatus.status === PermissionStatus.DENIED) {
      showToast({
        type: 'error',
        text: 'This app requires Location Permissons',
      });

      if (!reqStatus.canAskAgain) {
        locationAlert();
      }
    }

    return reqStatus;
  }, [showToast, requestPermission]);

  const renderRequester = useCallback(() => {
    const onPress = () => void requestLocation();

    return (
      <Pressable
        style={ styles.button }
        onPress={ onPress }
      >
        <Text style={ styles.text }>Allow Location</Text>
      </Pressable>
    );
  }, [requestLocation]);

  const getLocation = useCallback(async () => {
    const perm = await requestLocation();
    if (!Boolean(perm.granted)) {
      locationAlert();
    }

    return await getCurrentPositionAsync();

  }, [requestLocation]);

  useEffect(() => {
    if (
      permission === null ||
      permission.status === PermissionStatus.UNDETERMINED
    ) {
      void requestLocation();
    }
  }, [permission, requestLocation]);

  return {
    requestLocation,
    hasPerm: permission?.status === PermissionStatus.GRANTED,
    renderRequester,
    getLocation,
  };
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 10,
    backgroundColor: Colors.BLUE,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    width: 170,
  },
  text: {
    ...Typographies.HEADER_1,
  },
});
