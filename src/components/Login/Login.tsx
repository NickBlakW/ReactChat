import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import GoogleLogin from './components/Google';

type LoginProps = NativeStackScreenProps<StackNavigation, 'LOGIN'>;

const LoginScreen: React.FC<LoginProps> = () => {
  return (
    <View style={styles.theme}>
      <Text>Login </Text>
      <GoogleLogin />
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
