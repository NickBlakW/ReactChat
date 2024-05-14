import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import GoogleLogin from './components/Google';
import FacebookLogin from './components/Facebook';

const LoginScreen: React.FC = () => {
  return (
    <View style={styles.theme}>
      <Text>Login </Text>
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
