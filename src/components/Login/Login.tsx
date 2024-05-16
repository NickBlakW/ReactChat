import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import GoogleLogin from './components/Google';
import FacebookLogin from './components/Facebook';

const LoginScreen: React.FC = () => {
  return (
    <View style={styles.theme}>
      <GoogleLogin />
      <FacebookLogin />
    </View>
  );
};

const styles = StyleSheet.create({
  theme: {
    backgroundColor: '#343',
    color: 'aliceblue',
  },
});

export default LoginScreen;
