import { StyleSheet, View, Text, Image } from 'react-native';

export const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.iconWrapper}>
        <Image style={styles.logo} source={require('./logo.png')} />
      </View>
      <Text style={styles.text}>Не забудьте отключить VPN</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 76,
    height: 76,
  },
  text: {
    position: 'absolute',
    bottom: 120,
  },
});
