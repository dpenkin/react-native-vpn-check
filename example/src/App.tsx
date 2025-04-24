import { useState, useEffect } from 'react';

import {
  StyleSheet,
  View,
  Text,
  NativeEventEmitter,
  Alert,
} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { isVPNActive, VPNStatusChanged } from 'react-native-vpn-check';
import { SplashScreen as CustomSplashScreen } from './SplashScreen';

export default function App() {
  const [isActive, setIsActive] = useState<boolean>(false);
  const [showCustomSplashScreen, setShowCustomSplashScreen] = useState(false);

  const getStatusVPN = async () => {
    const isStatus = await isVPNActive();
    if (isStatus) {
      setIsActive(true);
      Alert.alert('Status', 'VPN is enabled!');
    }
  };

  useEffect(() => {
    getStatusVPN();
  }, []);

  useEffect(() => {
    const eventEmitter = new NativeEventEmitter(VPNStatusChanged);

    const subscription = eventEmitter.addListener(
      'vpnStatusChanged',
      (event: any) => {
        setIsActive(event.status);
      }
    );

    return () => {
      setIsActive(false);
      subscription.remove();
    };
  }, []);

  useEffect(() => {
    if (isActive) {
      setShowCustomSplashScreen(true);
      setTimeout(() => {
        setShowCustomSplashScreen(false);
      }, 6000);
    }
  }, [isActive]);

  useEffect(() => {
    setTimeout(() => {
      SplashScreen?.hide();
    }, 3000);
  }, []);

  if (showCustomSplashScreen) {
    return <CustomSplashScreen />;
  }

  return (
    <View style={styles.container}>
      {<Text>Result: {isActive ? 'isActive VPN' : 'Not VPN'}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
